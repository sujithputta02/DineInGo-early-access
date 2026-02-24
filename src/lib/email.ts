import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: Number(process.env.EMAIL_PORT) || 587,
    secure: false, // TLS via STARTTLS
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

export async function sendEmail(to: string, subject: string, html: string): Promise<void> {
    await transporter.sendMail({
        from: process.env.EMAIL_FROM || '"DineInGo 🦖" <sec.dinelngo.team@gmail.com>',
        to,
        subject,
        html,
    });
}
