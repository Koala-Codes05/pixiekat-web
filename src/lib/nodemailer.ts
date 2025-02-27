import nodemailer from "nodemailer";

// ! For production remember to switch to SMTP services like Mailgun, Postmark or SendGrid

const transporter = nodemailer.createTransport({
    service: "Gmail", 
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    },
});

export default transporter;