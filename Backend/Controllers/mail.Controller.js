import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

export const sendMail = async (req, res) => {
  try {
    const { recipients, summary, html } = req.body;
    if (!recipients || recipients.length === 0) {
      return res.status(400).json({ error: "Recipients required" });
    }

    let to;
    if (!Array.isArray(recipients)) {
   to = [recipients];
}
    
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    let info = await transporter.sendMail({
      from: `"Meeting Notes App" <${process.env.EMAIL_USER}>`,
      to: to.join(","),
      subject: "Shared Meeting Summary",
      text: summary,
      html: html
    });

    res.json({ message: "Email sent", info });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Failed to send email" });
  }
};