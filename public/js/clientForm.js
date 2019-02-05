window.onload = function() {
	optionMsg();
	switchForms();
	submitForm();
	if(mySuccess)
	{
		success();
	}
}
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
	submitFormBtn.addEventListener("click",function(){
		var form=document.getElementById("formPost");
		var missFields=[];
		var values=getValues();
		console.log(values);
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
		if(missFields.length<1)
		{
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
	success.scrollIntoView();

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
