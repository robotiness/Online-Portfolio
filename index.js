const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const request = require("request");
const recaptchaSecret = process.env.recaptchaSecret || require("./config/secret").recaptchaSecret;
const recaptchaClient = process.env.recaptchaClient || require("./config/secret").recaptchaClient;
const emailUsername = process.env.emailUsername || require("./config/secret").emailUsername;
const emailPassword = process.env.emailPassword || require("./config/secret").emailPassword;
const sendTo = process.env.sendTo || require("./config/secret").sendTo;
const Recaptcha = require("express-recaptcha").Recaptcha;
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.set("view engine", "ejs");

var success = false;
app.get("/", function(req, res) {
  wake_up_app();
  res.render("home.ejs", {
    success: success,
    recaptchaClient:recaptchaClient
  });
  success = false;
});

app.post("/send", function(req, res) {
  if (
    req.body.captcha === undefined ||
    req.body.captcha === "" ||
    req.body.captcha === null
  ) {
    return res.json({
      success: false,
      msg: "Please select captcha"
    });
  }

  const verifyUrl = `https://google.com/recaptcha/api/siteverify?secret=${recaptchaSecret}&response=${req.body.captcha}&remoteip=${req.connection.remoteAddress}`;

  request(verifyUrl, (err, response, body) => {
    body = JSON.parse(body);

    if (body.success) {
      var firstName = req.body.firstName;
      var lastName = req.body.lastName;
      var companyName = req.body.companyName;
      var emailAdress = req.body.emailAddress;
      var fromWhere = req.body.fromWhere || req.body.fromWhereOther;
      var subject = req.body.subject;
      var message = req.body.message;

      console.log(req.body);

      var transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: emailUsername,
          pass: emailPassword,
        },
      });

      transporter.sendMail({
          from: emailAdress,
          to: sendTo,
          subject: subject,
          text:
          "Name: " + firstName + " " + lastName + "\n" +
          "Company: " + companyName + "\n" +
          "Email: " + emailAdress + "\n" +
          "From Where: " + fromWhere + "\n" +
          "Message: " + message

        },
        function(error, response) {
          if (error) {
            console.log(error);
          } else {
            console.log("Message was sent.");
          }
        }
      );

      success = true;
      res.redirect("/");
    } else {
      res.redirect("/");
    }
  });
});

function wake_up_app() {
  request('https://cash-app-1.herokuapp.com/', function(error, response, body) {
    if (error) {
      console.log(error)
    } else if (!body) {
      console.log("App not responding.");
    } else {
      console.log("App is awake.")
    }
  });
}

app.listen(PORT, function() {
  console.log("Listening on Port:" + PORT);
});
//test
