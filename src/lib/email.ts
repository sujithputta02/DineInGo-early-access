import { Resend } from 'resend';
import nodemailer from 'nodemailer';

// Initialize Resend client
const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Send email with Resend (primary) and Gmail SMTP fallback
 * Strategy: Try Resend first for best deliverability, fallback to Gmail SMTP if Resend fails
 */
export async function sendEmail(to: string, subject: string, html: string): Promise<void> {
    // Try Resend first (primary method - best deliverability)
    if (process.env.RESEND_API_KEY) {
        try {
            console.log('📧 Attempting to send via Resend...');
            
            const { data, error } = await resend.emails.send({
                from: process.env.RESEND_FROM || 'DineInGo 🦖 <onboarding@resend.dev>',
                to: [to],
                subject,
                html,
            });

            if (error) {
                console.error('⚠️ Resend error:', error);
                throw new Error(`Resend failed: ${error.message}`);
            }

            console.log('✅ Email sent via Resend:', {
                id: data?.id,
                to
            });
            return; // Success! Exit function
        } catch (resendError: any) {
            console.error('❌ Resend failed, trying Gmail SMTP fallback...', {
                message: resendError?.message,
                name: resendError?.name
            });
            // Continue to fallback
        }
    } else {
        console.log('⚠️ No Resend API key, using Gmail SMTP...');
    }

    // Fallback to Gmail SMTP
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
        throw new Error('Both Resend and Gmail SMTP failed to send email');
    }
}
