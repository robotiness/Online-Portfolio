const http=require('http');
const express=require('express');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
var nodemailer = require('nodemailer');
var request=require('request');
var reCAPTCHA = require('recaptcha2');
 
var recaptcha = new reCAPTCHA({
  siteKey: '6LfgipIUAAAAAMguDwZkJwHA66qm-iJyywLcYa5m', // retrieved during setup
  secretKey: '6LfgipIUAAAAABljW3Zah2MB58dWBCu9srkeEljK' // retrieved during setup
});
//ADD recapcha

const app=express();
var PORT=3000;

if(process.env.PORT)
{
	PORT=process.env.PORT;
}

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended : true}));
app.set("view engine", "ejs");


var success=false;

app.get('/',function (req,res) {
	res.render('home.ejs',{success:success});
	success=false;
});




app.post('/send', function (req, res) {
	recaptcha.validateRequest(req)
    .then(function(){
      // validated and secure
      res.json({formSubmit:true})
    })
    .catch(function(errorCodes){
      // invalid
      res.json({
        formSubmit: false,
        errors: recaptcha.translateErrors(errorCodes) // translate error codes to human readable text
      });
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