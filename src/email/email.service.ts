import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer'


@Injectable()
export class EmailService {
    emailTransporter() {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.GMAIL_PASS
            }
        });
        return transporter;
    }
    async sendEmailOtp(email: string, otp: string) {
        const mailOptions = {
            from: `"Itter APP" <${process.env.MAIL_USER}>`,
            to: email,
            subject: '✅ Tasdiqlash kodingiz tayyor!',
            text: `Sizning tasdiqlash kodingiz: ${otp}`,
            html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; border-radius: 10px; padding: 30px; background-color: #fefefe;">
        <div style="text-align: center;">
            <h1 style="color: #4CAF50; margin-bottom: 0;">Itter APP</h1>
            <p style="font-size: 16px; color: #555;">Emailingizni tasdiqlash uchun kod</p>

            <div style="margin: 30px 0;">
                <p style="font-size: 18px; margin-bottom: 10px;">Quyidagi <strong>bir martalik</strong> tasdiqlash kodini kiriting:</p>
                <div style="display: inline-block; padding: 15px 30px; background-color: #4CAF50; color: white; font-size: 28px; font-weight: bold; border-radius: 8px; letter-spacing: 5px; box-shadow: 0 4px 8px rgba(0,0,0,0.1); transition: all 0.3s ease;">
                    ${otp}
                </div>
            </div>

            <p style="font-size: 14px; color: #777;">Bu kod <strong>2 daqiqa</strong> ichida amal qiladi. Uni hech kim bilan bo‘lishmang.</p>

            <hr style="margin: 40px 0; border: none; border-top: 1px solid #eee;">

            <p style="font-size: 13px; color: #aaa;">Agar siz ushbu kodni so‘ramagan bo‘lsangiz, ushbu xabarni e’tiborsiz qoldirishingiz mumkin.</p>
        </div>
    </div>
    `,
        };

        await this.emailTransporter().sendMail(mailOptions)
    }
}