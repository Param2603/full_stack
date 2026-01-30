import nodemailer from "nodemailer";
import "dotenv/config";

export const sendOTPMail = async (otp, email) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS // App password
            }
        });

        const mailOptions = {
            from: process.env.MAIL_USER,
            to: email,
            subject: "Password Reset OTP",
            html: `<p>Your OTP for password reset is: <b>${otp}</b></p>`
        };

        const info = await transporter.sendMail(mailOptions);
        console.log("OTP sent successfully:", info.response);

    } catch (error) {
        console.error("Email error:", error.message);
        throw new Error("Failed to send OTP email");
    }
};
