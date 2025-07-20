// // app/api/contact/route.ts
// import { NextRequest, NextResponse } from 'next/server';
// import nodemailer from 'nodemailer';

// // Types
// interface ContactFormData {
//   name: string;
//   email: string;
//   phone: string;
//   countryCode: string;
//   message: string;
//   preferredContact: string;
//   emailSubscription: boolean;
// }

// interface EmailConfig {
//   service?: string;
//   host?: string;
//   port?: number;
//   secure?: boolean;
//   auth: {
//     user: string;
//     pass: string;
//   };
// }

// // Email configuration for Zoho Mail
// const createEmailConfig = (): EmailConfig => {
//   return {
//     host: 'smtp.zoho.com',
//     port: 587,
//     secure: false,
//     auth: {
//       user: process.env.EMAIL_USER!, // Your custom domain email (e.g., contact@yourdomain.com)
//       pass: process.env.EMAIL_PASSWORD!, // Your Zoho email password
//     },
//   };
// };

// // Email template
// const createEmailTemplate = (data: ContactFormData): string => {
//   const contactModeEmojis = {
//     whatsapp: '📱',
//     call: '📞',
//     email: '📧',
//   };

//   const contactModeLabels = {
//     whatsapp: 'WhatsApp',
//     call: 'Phone Call',
//     email: 'Email',
//   };

//   return `
//     <!DOCTYPE html>
//     <html>
//     <head>
//       <meta charset="utf-8">
//       <meta name="viewport" content="width=device-width, initial-scale=1.0">
//       <title>New Contact Form Submission</title>
//       <style>
//         body {
//           font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
//           line-height: 1.6;
//           color: #333;
//           max-width: 600px;
//           margin: 0 auto;
//           padding: 20px;
//           background-color: #f5f5f5;
//         }
//         .container {
//           background-color: white;
//           padding: 30px;
//           border-radius: 10px;
//           box-shadow: 0 2px 10px rgba(0,0,0,0.1);
//         }
//         .header {
//           background: linear-gradient(135deg, rgb(140,46,71) 0%, rgb(180,66,91) 100%);
//           color: white;
//           padding: 20px;
//           border-radius: 8px;
//           margin-bottom: 30px;
//           text-align: center;
//         }
//         .header h1 {
//           margin: 0;
//           font-size: 24px;
//           font-weight: 600;
//         }
//         .field-group {
//           margin-bottom: 20px;
//           padding: 15px;
//           background-color: #f8f9fa;
//           border-radius: 8px;
//           border-left: 4px solid rgb(140,46,71);
//         }
//         .field-label {
//           font-weight: 600;
//           color: rgb(140,46,71);
//           margin-bottom: 5px;
//           text-transform: uppercase;
//           font-size: 12px;
//           letter-spacing: 0.5px;
//         }
//         .field-value {
//           font-size: 16px;
//           color: #333;
//           word-wrap: break-word;
//         }
//         .message-box {
//           background-color: #fff;
//           border: 1px solid #ddd;
//           border-radius: 8px;
//           padding: 20px;
//           margin-top: 10px;
//           font-style: italic;
//         }
//         .contact-preference {
//           display: inline-flex;
//           align-items: center;
//           background-color: rgb(140,46,71);
//           color: white;
//           padding: 8px 15px;
//           border-radius: 20px;
//           font-weight: 500;
//           margin-top: 5px;
//         }
//         .phone-number {
//           font-family: 'Courier New', monospace;
//           background-color: #e9ecef;
//           padding: 5px 10px;
//           border-radius: 4px;
//           font-weight: 600;
//         }
//         .subscription-badge {
//           display: inline-flex;
//           align-items: center;
//           background-color: #28a745;
//           color: white;
//           padding: 5px 12px;
//           border-radius: 15px;
//           font-size: 14px;
//           font-weight: 500;
//           margin-top: 5px;
//         }
//         .subscription-badge.declined {
//           background-color: #6c757d;
//         }
//         .footer {
//           margin-top: 30px;
//           padding: 20px;
//           background-color: #f8f9fa;
//           border-radius: 8px;
//           text-align: center;
//           font-size: 12px;
//           color: #666;
//         }
//         .timestamp {
//           color: #888;
//           font-size: 11px;
//           margin-top: 10px;
//         }
//         .marketing-note {
//           background-color: #fff3cd;
//           border: 1px solid #ffeaa7;
//           border-radius: 8px;
//           padding: 15px;
//           margin-top: 20px;
//           font-size: 13px;
//           color: #856404;
//         }
//       </style>
//     </head>
//     <body>
//       <div class="container">
//         <div class="header">
//           <h1>🏠 New Property Inquiry</h1>
//           <p style="margin: 10px 0 0 0; opacity: 0.9;">Luxury Property Contact Form</p>
//         </div>

//         <div class="field-group">
//           <div class="field-label">👤 Client Name</div>
//           <div class="field-value">${data.name}</div>
//         </div>

//         <div class="field-group">
//           <div class="field-label">📧 Email Address</div>
//           <div class="field-value">
//             <a href="mailto:${data.email}" style="color: rgb(140,46,71); text-decoration: none;">
//               ${data.email}
//             </a>
//           </div>
//         </div>

//         <div class="field-group">
//           <div class="field-label">📞 Phone Number</div>
//           <div class="field-value">
//             <span class="phone-number">
//               <a href="tel:${data.countryCode}${data.phone}" style="color: #333; text-decoration: none;">
//                 ${data.countryCode} ${data.phone}
//               </a>
//             </span>
//           </div>
//         </div>

//         <div class="field-group">
//           <div class="field-label">💬 Preferred Contact Method</div>
//           <div class="field-value">
//             <span class="contact-preference">
//               ${contactModeEmojis[data.preferredContact as keyof typeof contactModeEmojis]} 
//               ${contactModeLabels[data.preferredContact as keyof typeof contactModeLabels]}
//             </span>
//           </div>
//         </div>

//         <div class="field-group">
//           <div class="field-label">📬 Email Marketing Subscription</div>
//           <div class="field-value">
//             <span class="subscription-badge ${!data.emailSubscription ? 'declined' : ''}">
//               ${data.emailSubscription ? '✅ Subscribed to offers and blog posts' : '❌ Declined email marketing'}
//             </span>
//           </div>
//         </div>

//         <div class="field-group">
//           <div class="field-label">💭 Message</div>
//           <div class="field-value">
//             <div class="message-box">
//               ${data.message.replace(/\n/g, '<br>')}
//             </div>
//           </div>
//         </div>

//         ${data.emailSubscription ? `
//         <div class="marketing-note">
//           <strong>📧 Marketing Note:</strong> This client has opted in to receive marketing emails. 
//           Add them to your newsletter/offers mailing list.
//         </div>
//         ` : ''}

//         <div class="footer">
//           <p><strong>Action Required:</strong> Please respond to this inquiry within 24 hours for optimal client experience.</p>
//           <div class="timestamp">
//             📅 Received: ${new Date().toLocaleDateString('en-US', {
//               weekday: 'long',
//               year: 'numeric',
//               month: 'long',
//               day: 'numeric',
//               hour: '2-digit',
//               minute: '2-digit',
//               timeZoneName: 'short'
//             })}
//           </div>
//         </div>
//       </div>
//     </body>
//     </html>
//   `;
// };

// // Validation function
// const validateFormData = (data: any): data is ContactFormData => {
//   const requiredFields = ['name', 'email', 'phone', 'countryCode', 'message', 'preferredContact'];
  
//   for (const field of requiredFields) {
//     if (!data[field] || typeof data[field] !== 'string' || data[field].trim() === '') {
//       return false;
//     }
//   }

//   // Email validation
//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   if (!emailRegex.test(data.email)) {
//     return false;
//   }

//   // Phone validation (basic)
//   const phoneRegex = /^[0-9+\-\s()]{7,20}$/;
//   if (!phoneRegex.test(data.phone)) {
//     return false;
//   }

//   // Preferred contact validation
//   const validContactMethods = ['whatsapp', 'call', 'email'];
//   if (!validContactMethods.includes(data.preferredContact)) {
//     return false;
//   }

//   // Email subscription validation (should be boolean)
//   if (typeof data.emailSubscription !== 'boolean') {
//     return false;
//   }

//   return true;
// };

// // Rate limiting (simple in-memory store)
// const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

// const checkRateLimit = (ip: string): boolean => {
//   const now = Date.now();
//   const windowMs = 15 * 60 * 1000; // 15 minutes
//   const maxRequests = 5; // Max 5 requests per 15 minutes

//   const record = rateLimitStore.get(ip);
  
//   if (!record || now > record.resetTime) {
//     rateLimitStore.set(ip, { count: 1, resetTime: now + windowMs });
//     return true;
//   }

//   if (record.count >= maxRequests) {
//     return false;
//   }

//   record.count++;
//   return true;
// };

// // Function to handle email subscription (you can integrate with your email service)
// const handleEmailSubscription = async (email: string, name: string): Promise<void> => {
//   if (!email || !name) return;
  
//   // TODO: Integrate with your email marketing service
//   // Examples:
//   // - Mailchimp API
//   // - SendGrid Marketing Campaigns
//   // - ConvertKit
//   // - Campaign Monitor
  
//   console.log(`Adding ${name} (${email}) to email marketing list`);
  
//   // Example implementation:
//   // await addToMailingList({
//   //   email,
//   //   firstName: name.split(' ')[0],
//   //   lastName: name.split(' ').slice(1).join(' '),
//   //   source: 'contact_form',
//   //   timestamp: new Date().toISOString()
//   // });
// };

// // Main API handler
// export async function POST(request: NextRequest) {
//   try {
//     // Get client IP for rate limiting
//     const clientIP = request.headers.get('x-forwarded-for') || 
//                      request.headers.get('x-real-ip') || 
//                      'unknown';

//     // Check rate limiting
//     if (!checkRateLimit(clientIP)) {
//       return NextResponse.json(
//         { 
//           success: false, 
//           error: 'Too many requests. Please try again later.',
//           code: 'RATE_LIMIT_EXCEEDED'
//         },
//         { status: 429 }
//       );
//     }

//     // Parse and validate request body
//     const body = await request.json();
    
//     if (!validateFormData(body)) {
//       return NextResponse.json(
//         { 
//           success: false, 
//           error: 'Invalid form data. Please check all required fields.',
//           code: 'VALIDATION_ERROR'
//         },
//         { status: 400 }
//       );
//     }

//     const formData: ContactFormData = body;

//     // Check environment variables
//     const businessEmail = process.env.BUSINESS_EMAIL;
//     if (!businessEmail) {
//       console.error('BUSINESS_EMAIL environment variable is not set');
//       return NextResponse.json(
//         { 
//           success: false, 
//           error: 'Server configuration error. Please try again later.',
//           code: 'CONFIG_ERROR'
//         },
//         { status: 500 }
//       );
//     }

//     // Handle email subscription if opted in
//     if (formData.emailSubscription) {
//       try {
//         await handleEmailSubscription(formData.email, formData.name);
//       } catch (error) {
//         console.error('Email subscription error:', error);
//         // Don't fail the entire request if subscription fails
//       }
//     }

//     // Create email transporter
//     const emailConfig = createEmailConfig();
//     const transporter = nodemailer.createTransport(emailConfig);

//     // Verify transporter connection
//     await transporter.verify();

//     // Email options
//     const mailOptions = {
//       from: `"${formData.name}" <${process.env.EMAIL_USER}>`,
//       to: businessEmail,
//       replyTo: formData.email,
//       subject: `🏠 New Property Inquiry from ${formData.name}${formData.emailSubscription ? ' (Marketing Opt-in)' : ''}`,
//       html: createEmailTemplate(formData),
//       text: `
//         New Property Inquiry
        
//         Name: ${formData.name}
//         Email: ${formData.email}
//         Phone: ${formData.countryCode} ${formData.phone}
//         Preferred Contact: ${formData.preferredContact}
//         Email Marketing: ${formData.emailSubscription ? 'Yes - Add to mailing list' : 'No'}
        
//         Message:
//         ${formData.message}
        
//         Received: ${new Date().toLocaleString()}
//       `,
//     };

//     // Send email
//     const info = await transporter.sendMail(mailOptions);
    
//     console.log('Email sent successfully:', info.messageId);

//     // Prepare success message based on subscription status
//     let successMessage = 'Your inquiry has been sent successfully! We\'ll contact you within 24 hours.';
//     if (formData.emailSubscription) {
//       successMessage += ' You\'ve also been subscribed to our latest offers and blog posts.';
//     }

//     return NextResponse.json({
//       success: true,
//       message: successMessage,
//       messageId: info.messageId,
//     });

//   } catch (error) {
//     console.error('Contact form error:', error);
    
//     // Handle specific error types
//     if (error instanceof SyntaxError) {
//       return NextResponse.json(
//         { 
//           success: false, 
//           error: 'Invalid request format.',
//           code: 'INVALID_JSON'
//         },
//         { status: 400 }
//       );
//     }

//     if (error && typeof error === 'object' && 'code' in error) {
//       const nodeError = error as { code: string };
      
//       if (nodeError.code === 'EAUTH') {
//         return NextResponse.json(
//           { 
//             success: false, 
//             error: 'Email authentication failed. Please try again later.',
//             code: 'EMAIL_AUTH_ERROR'
//           },
//           { status: 500 }
//         );
//       }
      
//       if (nodeError.code === 'ECONNECTION') {
//         return NextResponse.json(
//           { 
//             success: false, 
//             error: 'Unable to connect to email server. Please try again later.',
//             code: 'EMAIL_CONNECTION_ERROR'
//           },
//           { status: 500 }
//         );
//       }
//     }

//     return NextResponse.json(
//       { 
//         success: false, 
//         error: 'Something went wrong. Please try again later.',
//         code: 'INTERNAL_ERROR'
//       },
//       { status: 500 }
//     );
//   }
// }

// // Handle other HTTP methods
// export async function GET() {
//   return NextResponse.json(
//     { 
//       success: false, 
//       error: 'Method not allowed. Use POST to submit contact form.',
//       code: 'METHOD_NOT_ALLOWED'
//     },
//     { status: 405 }
//   );
// }

// export async function PUT() {
//   return NextResponse.json(
//     { 
//       success: false, 
//       error: 'Method not allowed. Use POST to submit contact form.',
//       code: 'METHOD_NOT_ALLOWED'
//     },
//     { status: 405 }
//   );
// }

// export async function DELETE() {
//   return NextResponse.json(
//     { 
//       success: false, 
//       error: 'Method not allowed. Use POST to submit contact form.',
//       code: 'METHOD_NOT_ALLOWED'
//     },
//     { status: 405 }
//   );
// }

// // OPTIONS handler for CORS (if needed)
// export async function OPTIONS() {
//   return new NextResponse(null, {
//     status: 200,
//     headers: {
//       'Access-Control-Allow-Origin': '*',
//       'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
//       'Access-Control-Allow-Headers': 'Content-Type',
//     },
//   });
// }