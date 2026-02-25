import nodemailer from 'nodemailer';

/**
 * Send email with Brevo (primary) and Gmail SMTP fallback
 * Strategy: Try Brevo first for best deliverability, fallback to Gmail SMTP if it fails
 */
export async function sendEmail(to: string, subject: string, html: string): Promise<void> {
    // Try Brevo first (primary method - best deliverability)
    const brevoApiKey = process.env.BREVO_API_KEY;
    
    if (brevoApiKey) {
        try {
            console.log('📧 Attempting to send via Brevo...');
            
            // Use Brevo's REST API directly (no package needed)
            const response = await fetch('https://api.brevo.com/v3/smtp/email', {
                method: 'POST',
                headers: {
                    'accept': 'application/json',
                    'api-key': brevoApiKey,
                    'content-type': 'application/json',
                },
                body: JSON.stringify({
                    sender: {
                        name: 'DineInGo 🦖',
                        email: process.env.BREVO_FROM || 'sec.dinelngo.team@gmail.com',
                    },
                    to: [{ email: to }],
                    subject,
                    htmlContent: html,
                }),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(`Brevo API error: ${JSON.stringify(error)}`);
            }

            const data = await response.json();
            console.log('✅ Email sent via Brevo:', {
                messageId: data.messageId,
                to
            });
            return; // Success! Exit function
        } catch (brevoError: any) {
            console.error('❌ Brevo failed, trying Gmail SMTP fallback...', {
                message: brevoError?.message,
                name: brevoError?.name
            });
            // Continue to fallback
        }
    } else {
        console.log('⚠️ No Brevo API key, using Gmail SMTP...');
    }

    // Fallback to Gmail SMTP
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        throw new Error('Both Brevo and Gmail SMTP failed - no Gmail credentials configured');
    }

    try {
        console.log('📧 Attempting to send via Gmail SMTP...');
        
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST || 'smtp.gmail.com',
            port: Number(process.env.EMAIL_PORT) || 587,
            secure: false,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
            tls: {
                rejectUnauthorized: true,
                minVersion: 'TLSv1.2'
            },
            pool: true,
            maxConnections: 5,
            maxMessages: 100,
            rateDelta: 1000,
            rateLimit: 5,
        });

        await transporter.verify();
        console.log('✅ Gmail SMTP connection verified');

        const info = await transporter.sendMail({
            from: process.env.EMAIL_FROM || '"DineInGo 🦖" <sec.dinelngo.team@gmail.com>',
            to,
            subject,
            html,
            headers: {
                'X-Priority': '3',
                'X-Mailer': 'DineInGo Early Access',
                'Importance': 'normal',
            },
            text: html.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim(),
        });

        console.log('✅ Email sent via Gmail SMTP:', {
            messageId: info.messageId,
            accepted: info.accepted,
            rejected: info.rejected
        });
    } catch (smtpError: any) {
        console.error('❌ Gmail SMTP also failed:', {
            message: smtpError?.message,
            code: smtpError?.code,
            response: smtpError?.response
        });
        throw new Error('Both Brevo and Gmail SMTP failed to send email');
    }
}
