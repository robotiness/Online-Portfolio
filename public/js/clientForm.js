window.onload = function() {
	optionMsg();
	// switchForms();
	// submitForm();
	makeNavDisappear();
	proj_img_overlay();

// 	if(mySuccess)
// 	{
// 		success();
// 	}
// 	var bigScreen=document.querySelectorAll('.myBigScreen')[0];
// 	var smallScreen=document.querySelectorAll('.mySmallScreen')[0];
// 	if(screen.width<=997)
// 	{
// 		bigScreen.style.display="none";
// 		smallScreen.style.display="block"
// 		smallScreen.id="project";
// 		bigScreen.id="notProject";
// 	}
// 	else{
// 		bigScreen.style.display="block";
// 		smallScreen.style.display="none";
// 		smallScreen.id="notProject";
// 		bigScreen.id="project";
// 	}
// }
//
var addEvent = function(object, type, callback) {
    if (object == null || typeof(object) == 'undefined') return;
    if (object.addEventListener) {
        object.addEventListener(type, callback, false);
    } else if (object.attachEvent) {
        object.attachEvent("on" + type, callback);
    } else {
        object["on"+type] = callback;
    }
};
//
// addEvent(window, "resize", function(event) {
// 	var w = window,
// 	    d = document,
// 	    e = d.documentElement,
// 	    g = d.getElementsByTagName('body')[0],
// 	    x = w.innerWidth || e.clientWidth || g.clientWidth,
// 	    y = w.innerHeight|| e.clientHeight|| g.clientHeight;
// 	//alert(x + ' × ' + y);
// 	//alert(screen.width);
// 	var bigScreen=document.querySelectorAll('.myBigScreen')[0];
// 	var smallScreen=document.querySelectorAll('.mySmallScreen')[0];
// 	if(x<=997)
// 	{
// 		bigScreen.style.display="none";
// 		smallScreen.style.display="block"
// 	}
// 	else{
// 		bigScreen.style.display="block";
// 		smallScreen.style.display="none";
// 	}
// });

function proj_img_overlay()
{
	var projectImg = document.getElementsByClassName('img-container');
	for(var i=0;i<projectImg.length;++i){
		projectImg[i].addEventListener('mouseenter',function(){
			for(var ix=0;ix<this.childNodes.length;++ix){
				if(this.childNodes[ix].className &&
						this.childNodes[ix].className.includes("centered")){
						this.childNodes[ix].style.display = 'block';
				}
			}
		});

		projectImg[i].addEventListener('mouseleave',function(){
			for(var ix=0;ix<this.childNodes.length;++ix){
				if(this.childNodes[ix].className &&
						this.childNodes[ix].className.includes("centered")){
						this.childNodes[ix].style.display = 'none';
				}
			}
		});
	}
}
function makeNavDisappear()
{
	var navBar=document.querySelectorAll(".navbar-toggler")[0];
	var navBtn=document.querySelectorAll(".myDis");
	if(screen.width<=992)
	{
		for(var i=0;i<navBtn.length;++i)
		{
			navBtn[i].addEventListener("click",function(){
				if(screen.width<=992)
				{
				console.log(screen.width);
					navBar.click();
				}

			});
		}
	}



}


addEvent(window, "resize", function(event) {
	makeNavDisappear();
});

function optionMsg()
{
	var select=document.getElementById("mySelect");
	select.addEventListener("change",function(){
		console.log(this.value);
		if(this.value=="Other")
		{
			var otherMsg=document.getElementById('otherMsg');
			otherMsg.style.display="block";
		}
		else{
			var otherMsg=document.getElementById('otherMsg');
			otherMsg.style.display="none";
		}
	});
}

function switchForms()
{
	var toForm2=document.getElementById('toForm2');
	var backToForm1=document.getElementById('backToForm1');
	toForm2.addEventListener("click",function(){
		var form1=document.getElementById('form1');
		form1.style.display="none";
		var toForm2=document.getElementById('form2');
		form2.style.display="block";
	});

	backToForm1.addEventListener("click",function(){
		var form1=document.getElementById('form1');
		form1.style.display="block";
		var toForm2=document.getElementById('form2');
		form2.style.display="none";
	});
}

function submitForm()
{
	var submitFormBtn=document.getElementById('sendMailBtn');
	//var response = grecaptcha.getResponse();
	submitFormBtn.addEventListener("click",function(){
		var form=document.getElementById("formPost");
		var missFields=[];
		var values=getValues();
		var captcha = document.querySelector('#g-recaptcha-response').value;
		console.log("cap");
		console.log(captcha);
		if(captcha=="")
		{
			missFields.push("Missing recaptcha\n");
		}
		if(values.firstName=="")
		{
			missFields.push("Missing First Name\n");
		}
		if(values.lastName=="")
		{
			missFields.push("Missing Last Name\n");
		}
		if(values.fromWhere=="")
		{
			missFields.push("Missing where did you hear about this service\n");
		}
		if(values.emailAddress=="")
		{
			missFields.push("Missing emailAddress\n");
		}
		if(values.companyName=="")
		{
			missFields.push("Missing companyName\n");
		}
		if(values.projectType=="")
		{
			missFields.push("Missing type of project\n");
		}
		if(values.duration=="")
		{
			missFields.push("Missing duration of project\n");
		}
		if(values.durationUnit=="")
		{
			missFields.push("Missing unit of duration\n");
		}
		if(values.budget=="")
		{
			missFields.push("Missing budget of the project\n");
		}
		if(values.fromWhere=="Other" && values.fromWhereOther=="")
		{
			missFields.push("Missing where did hear about this service (from where)\n");
		}
		///if(missFields.length<1 && response.length!=0)
		if(missFields.length<1)
		{
			var form=document.getElementById("formPost");
			var recaptchaInput=document.getElementsByName("captcha")[0];
			recaptchaInput.value=captcha;

			form.submit();
		}
		else{
			var str="";
			for(var i=0;i<missFields.length;++i)
			{
				str=str+missFields[i];
			}
			alert(str);
		}
	});
}

function getValues()
{
    var elements = document.getElementById("formPost").elements;
    var obj ={};
    for(var i = 0 ; i < elements.length ; i++){
        var item = elements.item(i);
        obj[item.name] = item.value;
    }

    return obj;
}

function success()
{
	var success=document.getElementById("success");
	var form1=document.getElementById("form1");
	var form2=document.getElementById("form2");
	form1.style.display="none";
	form2.style.display="none";
	success.style.display="block";
	if(screen.width<=600)
	{
		var successbel=document.getElementById("belowSuccess");
		successbel.scrollIntoView();

	}
	else{
		success.scrollIntoView();
	}

	setTimeout(function(){
		success.classList.add('myHidden');
	}, 3000);
	setTimeout(function(){
		success.classList.remove('myHidden');
		success.style.display="none";
		form1.style.display="block";
	}, 5000);
	/*setTimeout(function(){
		success.style.display="none";
		success.classList.remove('myHidden');
		form1.classList.add()
	}, 3500);*/
}
}
