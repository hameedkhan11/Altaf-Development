// app/api/newsletter/route.ts
/*
eslint-disable @typescript-eslint/no-explicit-any
*/
import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";

// Rate limiting (simple in-memory store - use Redis in production)
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 5; // 5 requests per minute per IP

// MailerLite API configuration
const MAILERLITE_API_KEY = process.env.MAILERLITE_API_KEY;
const MAILERLITE_GROUP_ID = process.env.MAILERLITE_NEWSLETTER_GROUP_ID;
const MAILERLITE_API_URL = "https://connect.mailerlite.com/api";

interface MailerLiteSubscriber {
  email: string;
  groups?: string[];
  fields?: {
    [key: string]: string | number;
  };
  status?: "active" | "unsubscribed" | "unconfirmed";
}

interface MailerLiteResponse {
  data?: {
    id: string;
    email: string;
    status: string;
    groups: Array<{ id: string; name: string }>;
  };
  message?: string;
  errors?: {
    email?: string[];
    [key: string]: string[] | undefined;
  };
}

// Rate limiting function
function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const userRequests = rateLimitMap.get(ip) || [];
  
  // Filter out requests older than the window
  const recentRequests = userRequests.filter(
    (timestamp: number) => now - timestamp < RATE_LIMIT_WINDOW
  );
  
  if (recentRequests.length >= RATE_LIMIT_MAX_REQUESTS) {
    return true;
  }
  
  // Add current request timestamp
  recentRequests.push(now);
  rateLimitMap.set(ip, recentRequests);
  
  return false;
}

// Validate email format
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Subscribe to MailerLite
async function subscribeToMailerLite(email: string): Promise<{
  success: boolean;
  data?: any;
  error?: string;
  code?: string;
}> {
  if (!MAILERLITE_API_KEY) {
    console.error("MailerLite API key not configured");
    return {
      success: false,
      error: "Newsletter service is not configured",
      code: "CONFIG_ERROR"
    };
  }

  try {
    const subscriberData: MailerLiteSubscriber = {
      email,
      status: "active",
      fields: {
        source: "website_footer",
        signup_date: new Date().toISOString(),
      }
    };

    // Add to group if group ID is specified
    if (MAILERLITE_GROUP_ID) {
      subscriberData.groups = [MAILERLITE_GROUP_ID];
    }

    const response = await fetch(`${MAILERLITE_API_URL}/subscribers`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${MAILERLITE_API_KEY}`,
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify(subscriberData),
    });

    const responseData: MailerLiteResponse = await response.json();

    if (response.ok && responseData.data) {
      return {
        success: true,
        data: {
          subscriberId: responseData.data.id,
          email: responseData.data.email,
          status: responseData.data.status,
          groups: responseData.data.groups,
        }
      };
    } else if (response.status === 422) {
      // Handle validation errors (likely duplicate email)
      if (responseData.errors?.email?.includes("The email has already been taken.")) {
        return {
          success: false,
          error: "This email is already subscribed to our newsletter",
          code: "ALREADY_SUBSCRIBED"
        };
      } else {
        return {
          success: false,
          error: "Invalid email address",
          code: "INVALID_EMAIL"
        };
      }
    } else if (response.status === 429) {
      return {
        success: false,
        error: "Too many requests. Please try again later",
        code: "RATE_LIMIT_EXCEEDED"
      };
    } else {
      console.error("MailerLite API error:", response.status, responseData);
      return {
        success: false,
        error: "Newsletter service is temporarily unavailable",
        code: "MAILERLITE_ERROR"
      };
    }
  } catch (error) {
    console.error("MailerLite subscription error:", error);
    return {
      success: false,
      error: "Failed to connect to newsletter service",
      code: "CONNECTION_ERROR"
    };
  }
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const headersList = headers();
    const forwarded = (await headersList).get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0] : "unknown";

    // Check rate limiting
    if (isRateLimited(ip)) {
      return NextResponse.json(
        {
          success: false,
          error: "Too many requests. Please wait a few minutes before trying again.",
          code: "RATE_LIMIT_EXCEEDED"
        },
        { status: 429 }
      );
    }

    // Parse request body
    const body = await request.json();
    const { email } = body;

    // Validate input
    if (!email || typeof email !== "string") {
      return NextResponse.json(
        {
          success: false,
          error: "Email address is required",
          code: "VALIDATION_ERROR"
        },
        { status: 400 }
      );
    }

    // Validate email format
    if (!isValidEmail(email.trim())) {
      return NextResponse.json(
        {
          success: false,
          error: "Please enter a valid email address",
          code: "INVALID_EMAIL"
        },
        { status: 400 }
      );
    }

    // Subscribe to MailerLite
    const subscriptionResult = await subscribeToMailerLite(email.trim().toLowerCase());

    if (subscriptionResult.success) {
      return NextResponse.json({
        success: true,
        message: "Thank you! You've been successfully subscribed to our newsletter.",
        subscriberId: subscriptionResult.data?.subscriberId,
      });
    } else {
      const statusCode = subscriptionResult.code === "ALREADY_SUBSCRIBED" ? 200 : 400;
      
      return NextResponse.json(
        {
          success: false,
          error: subscriptionResult.error,
          code: subscriptionResult.code
        },
        { status: statusCode }
      );
    }
  } catch (error) {
    console.error("Newsletter API error:", error);
    
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error. Please try again later.",
        code: "INTERNAL_ERROR"
      },
      { status: 500 }
    );
  }
}

// Handle unsupported methods
export async function GET() {
  return NextResponse.json(
    { error: "Method not allowed" },
    { status: 405 }
  );
}