const http=require('http');
const express=require('express');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
var nodemailer = require('nodemailer');
var request=require('request');
//ADD recapcha

const app=express();
var PORT=3000;
const secretKey = "6LfgipIUAAAAABljW3Zah2MB58dWBCu9srkeEljK";
if(process.env.PORT)
{
	PORT=process.env.PORT;
}

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));
app.set("view engine", "ejs");


var success=false;

app.get('/',function (req,res) {
	res.render('home.ejs',{success:success});
	success=false;
});




app.post('/send', function (req, res) {
	if(req.body['g-recaptcha-response'] === undefined || req.body['g-recaptcha-response'] === '' || req.body['g-recaptcha-response'] === null) {
		return res.json({"responseCode" : 1,"responseDesc" : "Please select captcha"});
	}
	// Put your secret key here.
	var secretKey = "--paste your secret key here--";
	// req.connection.remoteAddress will provide IP address of connected user.
	var verificationUrl = "https://www.google.com/recaptcha/api/siteverify?secret=" + secretKey + "&response=" + req.body['g-recaptcha-response'] + "&remoteip=" + req.connection.remoteAddress;
	// Hitting GET request to the URL, Google will respond with success or error scenario.
	request(verificationUrl,function(error,response,body) {
		body = JSON.parse(body);
		// Success will be true or false depending upon captcha validation.
		if(body.success !== undefined && !body.success) {
			return res.json({"responseCode" : 1,"responseDesc" : "Failed captcha verification"});
		}
	res.json({"responseCode" : 0,"responseDesc" : "Sucess"});
	});



	/*var firstName=req.body.firstName;
	var lastName=req.body.lastName;
	var companyName=req.body.companyName;
	var emailAdress=req.body.emailAddress;
	var fromWhere=req.body.fromWhere;
	var fromWhereOther=req.body.fromWhereOther;
	var projectType=req.body.projectType;
	var duration=req.body.duration;
	var durationUnit=req.body.durationUnit;
	var budget=req.body.budget;
	var clientMsg=req.body.clientMsg;

	console.log(req.body);

	var transporter = nodemailer.createTransport({
		service: 'Gmail',
		auth: {
			user: 'fastudyonlineflashcards@gmail.com',
			pass: '2BZZ9i2nQnVcRyR'
		}
	});


	transporter.sendMail({
		from: emailAdress,
		to: 'cmmccoy1996@gmail.com',
		subject:"Message from "+firstName+" "+lastName,
		text: 
		'Company Name: '+companyName+"\n"+
		'Email Address: '+emailAdress+"\n"+
		'Project Type: '+projectType+"\n"+
		'Duration: '+duration+" "+durationUnit+"\n"+
		'Budget: '+budget+"\n"+
		'From Where: '+fromWhere+"\n"+
		'From Where Other: '+fromWhereOther+"\n"+
		'Message: '+clientMsg+"\n",

	
	}, function(error, response){
		if(error)
		{
			console.log(error);
		}
		else{
			console.log("Message was sent.");
		}
	});


	success=true;
	res.redirect("/");*/
});


app.listen(PORT,function() {
    console.log("Listening on Port:"+PORT);
});