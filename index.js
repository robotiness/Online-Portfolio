const http=require('http');
const express=require('express');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
var nodemailer = require('nodemailer');

const app=express();
const PORT=process.env.PORT;
//const PORT=3000;
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");


var success=false;

app.get('/',function (req,res) {
	res.render('home.ejs',{success:success});
	success=false;
});




app.post('/send', function (req, res) {
	var firstName=req.body.firstName;
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
	/*transporter.sendMail({
		from: 'fastudyonlineflashcards@gmail.com',
		to: 'cmmccoy1996@gmail.com',
		subject: 'New Client!',
		text: 'hello world!'
	});*/

	success=true;
	res.redirect("/");
});


app.listen(PORT,function() {
    console.log("Listening on Port:"+PORT);
});