import nodemailer from "nodemailer"
import { google } from "googleapis"
import dotenv from "dotenv";

dotenv.config();

const oauth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  "https://developers.google.com/oauthplayground"
);
oauth2Client.setCredentials({
  refresh_token: process.env.REFRESH_TOKEN
});

const prepareEmailPipeLine = async (recipent, subject, body) => {
  try {
    const accessToken = await oauth2Client.getAccessToken();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.EMAIL,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken: accessToken
      }
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: recipent,
      subject: subject,
      text: body,
      // html:
    }

    const result = await transporter.sendMail(mailOptions)
    return result

  } catch (error) {
    return error
  }
}

export const sendMail = async (recipent, subject, body) => {
  try {
    prepareEmailPipeLine(recipent, subject, body);
  }
  catch (error) {
    return error;
  }
}