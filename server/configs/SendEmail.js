import nodemailer from "nodemailer"
import { google } from "googleapis"
import dotenv from "dotenv";

dotenv.config();

const OAuth2 = google.auth.OAuth2;

const createTransporter = async () => {
  const oauth2Client = new OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    "https://developers.google.com/oauthplayground"
  );

  oauth2Client.setCredentials({
    refresh_token: process.env.REFRESH_TOKEN
  });

  const accessToken = await new Promise((resolve, reject) => {
    oauth2Client.getAccessToken((err, token) => {
      if (err) {
        reject();
      }
      resolve(token);
    });
  });

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.EMAIL,
      accessToken,
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      refreshToken: process.env.REFRESH_TOKEN
    }
  });
  return transporter;
};



export const triggerSendEmail = async (targetEmail, link) => {

  const emailOptions = {
    subject: "Test",
    text: link,
    to: targetEmail,
    from: process.env.EMAIL
  }

  let emailTransporter = await createTransporter();
  emailTransporter.sendMail(emailOptions, async (error, info) => {
    if (error)
      console.log(error)
    else {
      return info.response
    }
  });
}