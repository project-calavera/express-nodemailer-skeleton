const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

const mailUtils = require("../utils/mail");

require("dotenv").config();

router.get("/", (req, res) => {
  res.render("index");
});

router.post("/send-mail", (req, res) => {
  const smtpConfig = {
    host: process.env.SMTP_SERVER,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  };
  const transporter = nodemailer.createTransport(smtpConfig);

  let mailOptions = {
    from: process.env.MAIL_FROM,
    replyTo: process.env.MAIL_REPLYTO,
    subject: process.env.SUBJECT
  };

  mailOptions["subject"] = "The email subject";
  mailOptions["to"] = process.env.MAIL_TO;
  mailOptions["text"] = mailUtils.getMailBody(req.body);

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
    }

    mailOptions["from"] = process.env.MAIL_REPLYTO;
    mailOptions["subject"] = "The email subject";
    mailOptions["to"] = req.body.email;
    mailOptions["text"] = mailUtils.getUserMailBody();

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log(err);
      }

      res.json(info);
    });
  });
});

module.exports = router;
