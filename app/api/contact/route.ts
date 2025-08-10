/**
 * @fileoverview Contact form API route
 * @author Epoch Development Team
 */

import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, company, projectType, budget, timeline, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Format the email content (plain text)
    const emailContent = `
      New Contact Form Submission
      
      =============================
      CONTACT INFORMATION
      =============================
      Name: ${name}
      Email: ${email}
      Company: ${company || 'Not provided'}
      
      =============================
      PROJECT DETAILS
      =============================
      Project Type: ${projectType || 'Not specified'}
      Budget Range: ${budget || 'Not specified'}
      Timeline: ${timeline || 'Not specified'}
      
      =============================
      MESSAGE
      =============================
      ${message}
      
      =============================
      
      This email was sent from the Epoch website contact form.
      Timestamp: ${new Date().toISOString()}
    `;

    // Professional HTML email template
    const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { 
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif; 
              line-height: 1.6; 
              color: #1a1a1a; 
              background: #f8fafc;
            }
            .email-container { max-width: 640px; margin: 40px auto; background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08); }
            
            .header { 
              background: linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%); 
              padding: 48px 40px 40px; 
              color: white; 
              position: relative;
            }
            .header::before {
              content: '';
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="0.5" fill="rgba(255,255,255,0.1)"/><circle cx="75" cy="75" r="0.3" fill="rgba(255,255,255,0.08)"/><circle cx="50" cy="10" r="0.4" fill="rgba(255,255,255,0.06)"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>') repeat;
            }
            .logo { 
              font-size: 32px; 
              font-weight: 700; 
              margin-bottom: 8px; 
              position: relative; 
              z-index: 1;
              background: linear-gradient(90deg, #ffffff 0%, #e2e8f0 100%);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              background-clip: text;
            }
            .tagline { 
              font-size: 16px; 
              opacity: 0.9; 
              position: relative; 
              z-index: 1; 
              font-weight: 300;
            }
            
            .content { padding: 40px; }
            .lead-text { 
              font-size: 18px; 
              color: #374151; 
              margin-bottom: 32px; 
              font-weight: 400;
            }
            
            .info-grid { display: grid; gap: 24px; margin-bottom: 32px; }
            .info-section { 
              background: #f8fafc; 
              border-radius: 12px; 
              padding: 24px; 
              border-left: 4px solid #3b82f6;
            }
            .section-title { 
              font-size: 14px; 
              font-weight: 600; 
              color: #3b82f6; 
              text-transform: uppercase; 
              letter-spacing: 0.5px; 
              margin-bottom: 16px;
            }
            
            .field { margin-bottom: 12px; }
            .field:last-child { margin-bottom: 0; }
            .field-label { 
              font-size: 13px; 
              font-weight: 500; 
              color: #6b7280; 
              margin-bottom: 4px;
            }
            .field-value { 
              font-size: 15px; 
              color: #111827; 
              font-weight: 400;
            }
            .field-value a { 
              color: #3b82f6; 
              text-decoration: none; 
              font-weight: 500;
            }
            .field-value a:hover { text-decoration: underline; }
            
            .project-badges { display: flex; flex-wrap: wrap; gap: 8px; }
            .badge { 
              display: inline-block; 
              padding: 6px 14px; 
              background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); 
              color: white; 
              border-radius: 20px; 
              font-size: 12px; 
              font-weight: 500;
              box-shadow: 0 2px 8px rgba(59, 130, 246, 0.2);
            }
            
            .message-section { 
              background: linear-gradient(135deg, #fafafa 0%, #f4f4f5 100%); 
              border-radius: 12px; 
              padding: 24px; 
              border: 1px solid #e5e7eb;
            }
            .message-content { 
              font-size: 15px; 
              line-height: 1.7; 
              color: #374151; 
              white-space: pre-wrap; 
              font-weight: 400;
            }
            
            .footer { 
              text-align: center; 
              padding: 32px 40px; 
              border-top: 1px solid #f3f4f6; 
              background: #fafafa;
            }
            .footer-text { 
              color: #6b7280; 
              font-size: 13px; 
              line-height: 1.5;
            }
            .timestamp { 
              color: #9ca3af; 
              font-size: 12px; 
              margin-top: 8px;
            }
            
            @media (max-width: 640px) {
              .email-container { margin: 20px; border-radius: 12px; }
              .header { padding: 32px 24px 24px; }
              .content { padding: 24px; }
              .logo { font-size: 28px; }
              .project-badges { flex-direction: column; align-items: flex-start; }
            }
          </style>
        </head>
        <body>
          <div class="email-container">
            <div class="header">
              <div class="logo">EPOCH</div>
              <div class="tagline">New Contact Form Submission</div>
            </div>
            
            <div class="content">
              <p class="lead-text">A potential client has submitted an inquiry through your website.</p>
              
              <div class="info-grid">
                <div class="info-section">
                  <div class="section-title">Contact Information</div>
                  <div class="field">
                    <div class="field-label">Full Name</div>
                    <div class="field-value">${name}</div>
                  </div>
                  <div class="field">
                    <div class="field-label">Email Address</div>
                    <div class="field-value"><a href="mailto:${email}">${email}</a></div>
                  </div>
                  ${company ? `
                  <div class="field">
                    <div class="field-label">Company</div>
                    <div class="field-value">${company}</div>
                  </div>
                  ` : ''}
                </div>
                
                ${(projectType || budget || timeline) ? `
                <div class="info-section">
                  <div class="section-title">Project Requirements</div>
                  <div class="project-badges">
                    ${projectType ? `<span class="badge">${projectType}</span>` : ''}
                    ${budget ? `<span class="badge">${budget}</span>` : ''}
                    ${timeline ? `<span class="badge">${timeline}</span>` : ''}
                  </div>
                </div>
                ` : ''}
                
                <div class="info-section">
                  <div class="section-title">Client Message</div>
                  <div class="message-section">
                    <div class="message-content">${message}</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="footer">
              <p class="footer-text">This message was sent from the contact form on epoch.sh</p>
              <p class="timestamp">${new Date().toLocaleString('en-US', { 
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                timeZoneName: 'short'
              })}</p>
            </div>
          </div>
        </body>
      </html>
    `;

    // Initialize Resend
    const resend = new Resend(process.env.RESEND_API_KEY);

    // Send email using your verified domain
    const emailResult = await resend.emails.send({
      from: 'Epoch <noreply@epoch.sh>',  // Using your verified domain
      to: 'operator@epoch.sh',
      subject: `New Contact Form Submission from ${name}`,
      text: emailContent,
      html: htmlContent,  // Adding HTML content for better formatting
      replyTo: email,
      headers: {
        'X-Entity-Ref-ID': `contact-form-${Date.now()}`,
      },
    });

    console.log('Email sent successfully:', emailResult);

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: 'Your message has been sent successfully!'
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to send message. Please try again.' },
      { status: 500 }
    );
  }
}