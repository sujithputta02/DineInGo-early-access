import nodemailer from 'nodemailer';

/**
 * Send email with Brevo (primary) and Gmail SMTP fallback
 * Strategy: Try Brevo first for best deliverability, fallback to Gmail SMTP if it fails
 */
export async function sendEmail(to: string, subject: string, html: string): Promise<void> {
    const brevoApiKey = process.env.BREVO_API_KEY;
    
    // PRIORITY 1: Brevo (High Deliverability REST API)
    if (brevoApiKey && brevoApiKey.startsWith('xkeysib')) {
        try {
            console.log(`📧 [V1] Attempting Brevo REST API for: ${to}`);
            
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

            if (response.ok) {
                const data = await response.json();
                console.log('✅ [V1] Brevo Success:', { messageId: data.messageId });
                return; // Primary success
            } else {
                const error = await response.json();
                console.warn('⚠️ [V1] Brevo Limit or API Error:', error);
                // Fall through to Priority 2
            }
        } catch (brevoError: any) {
            console.error('❌ [V1] Brevo Connection Failed:', brevoError?.message || 'Unknown network error');
            // Fall through to Priority 2
        }
    } else {
        console.log('ℹ️ Brevo API Key missing or invalid - Skipping to Priority 2 (Gmail)');
    }

    // PRIORITY 2: Gmail SMTP Fallback
    console.log(`📧 [V2] Attempting Gmail SMTP Fallback for: ${to}`);
    
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        console.error('❌ CRITICAL: No Gmail credentials for fallback. Email aborted.');
        throw new Error('All email providers failed or unconfigured.');
    }

    try {
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
            // Performance optimizations for high-volume fallbacks
            pool: true,
            maxConnections: 3,
            maxMessages: 50,
        });

        const info = await transporter.sendMail({
            from: process.env.EMAIL_FROM || '"DineInGo 🦖" <sec.dinelngo.team@gmail.com>',
            to,
            subject,
            html,
            headers: {
                'X-Priority': '1', // High priority for fallback
                'X-Mailer': 'DineInGo Early Access v1.1',
            },
            text: html.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim(),
        });

        console.log('✅ [V2] Gmail SMTP Success:', { messageId: info.messageId });
    } catch (smtpError: any) {
        console.error('❌ [V2] Gmail SMTP Final Failure:', {
            message: smtpError?.message,
            code: smtpError?.code
        });
        throw new Error('CRITICAL: Both primary (Brevo) and secondary (Gmail) systems failed.');
    }
}
