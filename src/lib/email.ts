import nodemailer from 'nodemailer';

export async function sendEmail(to: string, subject: string, html: string): Promise<void> {
    try {
        // Create transporter at runtime to ensure env vars are loaded
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST || 'smtp.gmail.com',
            port: Number(process.env.EMAIL_PORT) || 587,
            secure: false, // TLS via STARTTLS
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        console.log('📧 Email config:', {
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            user: process.env.EMAIL_USER,
            hasPassword: !!process.env.EMAIL_PASS,
            from: process.env.EMAIL_FROM
        });

        const info = await transporter.sendMail({
            from: process.env.EMAIL_FROM || '"DineInGo 🦖" <sec.dinelngo.team@gmail.com>',
            to,
            subject,
            html,
        });

        console.log('✅ Email sent:', info.messageId);
    } catch (error: any) {
        console.error('❌ Email error:', error?.message || error);
        throw error;
    }
}
