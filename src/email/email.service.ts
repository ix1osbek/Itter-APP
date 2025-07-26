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
            subject: 'Your OTP Code',
            text: `Your OTP code is: ${otp}`,
            html: `<p>Your <b>OTP</b> code is: <strong>${otp}</strong></p>`,
        }
         await this.emailTransporter().sendMail(mailOptions)
    }
}