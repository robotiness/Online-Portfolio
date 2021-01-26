const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const request = require("request");

const emailUsername = process.env.emailUsername || require("./config/secret").emailUsername;
const emailPassword = process.env.emailPassword || require("./config/secret").emailPassword;
const sendTo = process.env.sendTo || require("./config/secret").sendTo;

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.set("view engine", "ejs");

var success = false;
app.get("/", function (req, res) {
  wake_up_app();
  res.render("home.ejs", {
    success: success
  });
  success = false;
});

app.post("/send", function (req, res) {
  var challenge = req.body.challenge;
  if (challenge.toLowerCase() != 'yellow') {
    res.redirect('/');
  } else {
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var companyName = req.body.companyName;
    var emailAddress = req.body.emailAddress;
    var fromWhere = req.body.fromWhere || req.body.fromWhereOther;
    var subject = req.body.subject;
    var clientMessage = req.body.message;

    const transporter = nodemailer.createTransport({
      service: "AOL",
      auth: {
        user: emailUsername,
        pass: emailPassword,
      },
    });
    const message = `
      <p>Name:  `+ firstName + lastName + `</p>
      <p>Company Name:  `+ companyName + `</p>
      <p>Email:  `+ emailAddress + `</p>
      <p>From Where:  `+ fromWhere + `</p>
      <p>Message:   `+ clientMessage + `</p>`;

    transporter.sendMail({
      from: emailUsername,
      to: sendTo,
      subject: subject,
      html: message

    },
      function (error, response) {
        if (error) {
          console.log(error);
          console.log('2')
          res.send("Error occured. Please send email to " + sendTo);
        } else {
          success = true;
          console.log("Message was sent.");
          res.redirect("/");
        }
      }
    );
  }
});

function wake_up_app() {
  request('https://med-app-testing.herokuapp.com/auth/login', function (error, response, body) {
    if (error) {
      console.log(error)
    } else if (!body) {
      console.log("App not responding.");
    } else {
      console.log("App is awake.")
    }
  });
}

app.listen(PORT, function () {
  console.log("\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nListening on Port:" + PORT);
});
