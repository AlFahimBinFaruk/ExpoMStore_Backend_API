import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT!), //it gives error as the port is coming as string from env
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_AUTH_USER!, // generated ethereal user
    pass: process.env.EMAIL_AUTH_USER_PASSWORD!, // generated ethereal password
  },
});

export default transporter;
