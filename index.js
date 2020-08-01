require("dotenv").config();
const express = require("express");
const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

express()
  .use(express.urlencoded({ extended: true }))
  .post("/", async (req, res, next) => {
    try {
      const { name, email } = req.body;
      if (name === undefined || email === undefined)
        return res.status(400).end();
      await sgMail.send({
        to: "wife@leafac.com",
        from: "sendgrid@leafac.com",
        subject: `Louis’s Baby Shower · ${name} <${email}> RSVPd`,
        text: `${name} <${email}>`,
      });
      await sgMail.send({
        to: email,
        from: "sendgrid@leafac.com",
        subject: "Louis’s Baby Shower · Looking forward to seeing you there",
        text: "We’ll see you soon",
      });
      res.status(200).end();
    } catch (error) {
      next(error);
    }
  })
  .listen(process.env.PORT ?? 5000);
