// File: /api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server';

// MailerLite Configuration
const MAILERLITE_API_KEY = process.env.MAILERLITE_API_KEY;
const MAILERLITE_GROUP_ID = process.env.MAILERLITE_GROUP_ID;

// Email Service Configuration (Resend)
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const FROM_EMAIL = process.env.FROM_EMAIL; // Your verified domain email
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  countryCode: string;
  message: string;
  preferredContact: string;
  emailSubscription: boolean;
}

// Rate limiting (simple in-memory store)
const rateLimitStore = new Map();
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
const RATE_LIMIT_MAX_REQUESTS = 5;

function checkRateLimit(identifier: string): boolean {
  const now = Date.now();
  const userRequests = rateLimitStore.get(identifier) || [];
  
  // Clean old requests
  const validRequests = userRequests.filter((time: number) => now - time < RATE_LIMIT_WINDOW);
  
  if (validRequests.length >= RATE_LIMIT_MAX_REQUESTS) {
    return false;
  }
  
  validRequests.push(now);
  rateLimitStore.set(identifier, validRequests);
  return true;
}

async function addToMailerLite(email: string, name: string, phone: string, countryCode: string) {
  console.log('Adding to MailerLite...', { email, name, phone, countryCode });
  if (!MAILERLITE_API_KEY || !MAILERLITE_GROUP_ID) {
    throw new Error('MailerLite configuration missing');
  }

  const subscriberData = {
    email: email,
    fields: {
      name: name,
      phone: `${countryCode} ${phone}`,
      country_code: countryCode,
      source: 'Contact Form - Altaf Developments'
    },
    groups: [MAILERLITE_GROUP_ID]
  };

  const response = await fetch('https://connect.mailerlite.com/api/subscribers', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${MAILERLITE_API_KEY}`,
      'Accept': 'application/json'
    },
    body: JSON.stringify(subscriberData)
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(`MailerLite API error: ${response.status} - ${errorData.message || 'Unknown error'}`);
  }

  return await response.json();
}

async function sendNotificationEmail(formData: ContactFormData) {
  if (!RESEND_API_KEY || !FROM_EMAIL || !ADMIN_EMAIL) {
    throw new Error('Resend configuration missing. Please check RESEND_API_KEY, FROM_EMAIL, and ADMIN_EMAIL environment variables.');
  }

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
      <div style="background: linear-gradient(135deg, #8c2e47 0%, #a53860 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0;">
        <h2 style="margin: 0; font-size: 24px;">New Contact Form Submission</h2>
        <p style="margin: 5px 0 0 0; opacity: 0.9;">Altaf Developments Website</p>
      </div>
      
      <div style="background: #f9f9f9; padding: 25px; border-radius: 0 0 8px 8px;">
        <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <h3 style="margin-top: 0; color: #8c2e47; border-bottom: 2px solid #8c2e47; padding-bottom: 10px;">Contact Details</h3>
          <div style="display: grid; gap: 12px;">
            <p style="margin: 0;"><strong style="color: #8c2e47;">Name:</strong> ${formData.name}</p>
            <p style="margin: 0;"><strong style="color: #8c2e47;">Email:</strong> <a href="mailto:${formData.email}" style="color: #333; text-decoration: none;">${formData.email}</a></p>
            <p style="margin: 0;"><strong style="color: #8c2e47;">Phone:</strong> <a href="tel:${formData.countryCode}${formData.phone}" style="color: #333; text-decoration: none;">${formData.countryCode} ${formData.phone}</a></p>
            <p style="margin: 0;"><strong style="color: #8c2e47;">Preferred Contact:</strong> ${formData.preferredContact.charAt(0).toUpperCase() + formData.preferredContact.slice(1)}</p>
            <p style="margin: 0;"><strong style="color: #8c2e47;">Email Subscription:</strong> <span style="color: ${formData.emailSubscription ? '#28a745' : '#dc3545'}; font-weight: bold;">${formData.emailSubscription ? 'Yes ✓' : 'No ✗'}</span></p>
          </div>
        </div>
        
        <div style="background: white; padding: 20px; border-left: 4px solid #8c2e47; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <h3 style="margin-top: 0; color: #8c2e47;">Message</h3>
          <div style="background: #f8f9fa; padding: 15px; border-radius: 6px; border: 1px solid #e9ecef;">
            <p style="line-height: 1.6; margin: 0; white-space: pre-wrap;">${formData.message}</p>
          </div>
        </div>
        
        <div style="text-align: center; margin-top: 25px; padding-top: 20px; border-top: 1px solid #ddd;">
          <p style="margin: 0; color: #666; font-size: 12px;">This email was sent from the Altaf Developments contact form</p>
          <p style="margin: 5px 0 0 0; color: #666; font-size: 12px;">Time: ${new Date().toLocaleString('en-US', { 
            timeZone: 'Asia/Karachi',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
          })} (PKT)</p>
        </div>
      </div>
    </div>
  `;

  const textContent = `
New Contact Form Submission - Altaf Developments

CONTACT DETAILS:
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.countryCode} ${formData.phone}
Preferred Contact: ${formData.preferredContact}
Email Subscription: ${formData.emailSubscription ? 'Yes' : 'No'}

MESSAGE:
${formData.message}

---
Time: ${new Date().toLocaleString('en-US', { 
  timeZone: 'Asia/Karachi',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit'
})} (PKT)

This email was sent from the Altaf Developments contact form.
  `;

  const emailData = {
    from: `Altaf Developments Website <${FROM_EMAIL}>`,
    to: [ADMIN_EMAIL],
    reply_to: formData.email,
    subject: `🏢 New Contact Form Submission - ${formData.name}`,
    text: textContent,
    html: htmlContent
  };

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${RESEND_API_KEY}`
    },
    body: JSON.stringify(emailData)
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(`Resend API error: ${response.status} - ${errorData.message || 'Unknown error'}`);
  }

  const result = await response.json();
  console.log('Notification email sent successfully via Resend');
  return result;
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const clientIP = request.headers.get('x-forwarded-for') || 
                    request.headers.get('x-real-ip') || 
                    'unknown';

    // Check rate limit
    if (!checkRateLimit(clientIP)) {
      return NextResponse.json(
        { success: false, error: 'Too many requests. Please wait before trying again.', code: 'RATE_LIMIT_EXCEEDED' },
        { status: 429 }
      );
    }

    const formData: ContactFormData = await request.json();

    // Validation
    if (!formData.name?.trim() || !formData.email?.trim() || !formData.phone?.trim() || !formData.message?.trim()) {
      return NextResponse.json(
        { success: false, error: 'All required fields must be filled.', code: 'VALIDATION_ERROR' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return NextResponse.json(
        { success: false, error: 'Please enter a valid email address.', code: 'VALIDATION_ERROR' },
        { status: 400 }
      );
    }

    let mailerliteResult = null;
    let emailSent = false;

    // Add to MailerLite if user subscribed
    if (formData.emailSubscription) {
      try {
        mailerliteResult = await addToMailerLite(
          formData.email,
          formData.name,
          formData.phone,
          formData.countryCode
        );
        console.log('Successfully added to MailerLite:', mailerliteResult);
      } catch (error) {
        console.error('MailerLite subscription error:', error);
        // Continue with the process even if MailerLite fails
      }
    }

    // Send notification email to admin via Resend
    try {
      await sendNotificationEmail(formData);
      emailSent = true;
      console.log('Admin notification email sent successfully via Resend');
    } catch (error) {
      console.error('Failed to send notification email:', error);
      // Continue with the process but log the error
    }

    // Success response
    let successMessage = 'Thank you for your message! Our luxury property consultant will contact you within 24 hours.';
    
    if (formData.emailSubscription) {
      if (mailerliteResult) {
        successMessage += ' You have been subscribed to our newsletter for the latest property updates and blog posts.';
      } else {
        successMessage += ' There was an issue with the newsletter subscription, but your message has been received.';
      }
    }

    return NextResponse.json({
      success: true,
      message: successMessage,
      messageId: `MSG_${Date.now()}`,
      details: {
        emailSent,
        subscribed: formData.emailSubscription && !!mailerliteResult,
        timestamp: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Contact form error:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Something went wrong. Please try again later.',
        code: 'SERVER_ERROR'
      },
      { status: 500 }
    );
  }
}