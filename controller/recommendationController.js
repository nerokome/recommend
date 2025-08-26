import nodemailer from "nodemailer";
import twilio from "twilio";
import axios from "axios";

const {
  EMAIL_USER,
  EMAIL_PASS,
  TWILIO_SID,
  TWILIO_AUTH,
  TWILIO_WHATSAPP,
  FB_PAGE_ACCESS_TOKEN,
  TWITTER_BEARER,
} = process.env;


const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: { user: EMAIL_USER, pass: EMAIL_PASS },
});


const client = twilio(TWILIO_SID, TWILIO_AUTH);

export const sendRecommendation = async (req, res) => {
  const { to, message, channel } = req.body;

  try {
    if (channel === "email") {
      await transporter.sendMail({
        from: EMAIL_USER,
        to,
        subject: "New Recommendation Request",
        text: message,
      });
    }

    if (channel === "whatsapp") {
      await client.messages.create({
        from: `whatsapp:${TWILIO_WHATSAPP}`,
        to: `whatsapp:${to}`,
        body: message,
      });
    }

    if (channel === "facebook") {
      await axios.post(
        `https://graph.facebook.com/v17.0/me/messages?access_token=${FB_PAGE_ACCESS_TOKEN}`,
        {
          recipient: { id: to }, 
          message: { text: message },
        }
      );
    }

    if (channel === "twitter") {
      await axios.post(
        "https://api.twitter.com/2/tweets",
        { text: message },
        { headers: { Authorization: `Bearer ${TWITTER_BEARER}` } }
      );
    }

    res.json({ success: true, message: ` Sent via ${channel}` });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ success: false, error: " Failed to send" });
  }
};
