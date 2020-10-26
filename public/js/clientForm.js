window.onload = function() {
  var width = window.innerWidth;
  optionMsg();
  submitForm();
  makeNavDisappear();
  proj_img_overlay();
  project_resize();
  removePic(width);
  removeProject(width);
  if (success) {
    successFunction();
  }
}
var addEvent = function(object, type, callback) {
  if (object == null || typeof(object) == 'undefined') return;
  if (object.addEventListener) {
    object.addEventListener(type, callback, false);
  } else if (object.attachEvent) {
    object.attachEvent("on" + type, callback);
  } else {
    object["on" + type] = callback;
  }
};
//
function removePic(x) {
  var myPic = document.getElementsByClassName('myPic')[0];
  if (x < 992) {
    myPic.style.display = "none";
  } else if (myPic.style.display == "none") {
    myPic.style.display = "block";
  }
}

function removeProject(x) {
  var bigScreen = document.querySelectorAll('.myBigScreen')[0];
  var projectTag = document.getElementById('projectTag');
  // var smallScreen=document.querySelectorAll('.mySmallScreen')[0];
  if (x < 992) {
    bigScreen.style.display = "none";
    projectTag.style.display = "none";
  } else {
    bigScreen.style.display = "block";
    projectTag.style.display = "block";
  }
}

function project_resize() {
  addEvent(window, "resize", function(event) {
    var w = window,
      d = document,
      e = d.documentElement,
      g = d.getElementsByTagName('body')[0],
      x = w.innerWidth || e.clientWidth || g.clientWidth,
      y = w.innerHeight || e.clientHeight || g.clientHeight;
    removeProject(x);
    removePic(x);

  });
}

function proj_img_overlay() {
  var projectImg = document.getElementsByClassName('img-container');
  for (var i = 0; i < projectImg.length; ++i) {
    projectImg[i].addEventListener('mouseenter', function() {
      for (var ix = 0; ix < this.childNodes.length; ++ix) {
        if (this.childNodes[ix].className &&
          this.childNodes[ix].className.includes("centered")) {
          this.childNodes[ix].style.display = 'block';
        }
      }
    });

    projectImg[i].addEventListener('mouseleave', function() {
      for (var ix = 0; ix < this.childNodes.length; ++ix) {
        if (this.childNodes[ix].className &&
          this.childNodes[ix].className.includes("centered")) {
          this.childNodes[ix].style.display = 'none';
        }
      }
    });
  }
}

function makeNavDisappear() {
  var navBar = document.querySelectorAll(".navbar-toggler")[0];
  var navBtn = document.querySelectorAll(".myDis");
  if (screen.width <= 992) {
    for (var i = 0; i < navBtn.length; ++i) {
      navBtn[i].addEventListener("click", function() {
        if (screen.width <= 992) {
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

function optionMsg() {
  var select = document.getElementById("mySelect");
  select.addEventListener("change", function() {
    console.log(this.value);
    if (this.value == "Other") {
      var otherMsg = document.getElementById('otherMsg');
      otherMsg.style.display = "block";
    } else {
      var otherMsg = document.getElementById('otherMsg');
      otherMsg.style.display = "none";
    }
  });
}

function switchForms() {
  var toForm2 = document.getElementById('toForm2');
  var backToForm1 = document.getElementById('backToForm1');
  toForm2.addEventListener("click", function() {
    var form1 = document.getElementById('form1');
    form1.style.display = "none";
    var toForm2 = document.getElementById('form2');
    form2.style.display = "block";
  });

  backToForm1.addEventListener("click", function() {
    var form1 = document.getElementById('form1');
    form1.style.display = "block";
    var toForm2 = document.getElementById('form2');
    form2.style.display = "none";
  });
}

function submitForm() {
  var submitFormBtn = document.getElementById('sendMailBtn');
  submitFormBtn.addEventListener("click", function() {
    var form = document.getElementById("formPost");
    var missFields = [];
    var values = getValues();
    
    if (values.subject == "") {
      missFields.push("Missing Subject\n");
    }
    if (values.message == "") {
      missFields.push("Missing Message\n");
    }
    if (values.challenge.toLowerCase() != "yellow") {
      missFields.push("Invalid challenge response\n");
    }
    if (values.firstName == "") {
      missFields.push("Missing First Name\n");
    }
    if (values.lastName == "") {
      missFields.push("Missing Last Name\n");
    }
    if (values.fromWhere == "") {
      missFields.push("Missing where did you hear about this service\n");
    }
    if (values.emailAddress == "") {
      missFields.push("Missing emailAddress\n");
    }
    if (values.companyName == "") {
      missFields.push("Missing companyName\n");
    }
    if (values.projectType == "") {
      missFields.push("Missing type of project\n");
    }
    if (values.duration == "") {
      missFields.push("Missing duration of project\n");
    }
    if (values.durationUnit == "") {
      missFields.push("Missing unit of duration\n");
    }
    if (values.budget == "") {
      missFields.push("Missing budget of the project\n");
    }
    if (values.fromWhere == "Other" && values.fromWhereOther == "") {
      missFields.push("Missing where did hear about this service (from where)\n");
    }
    ///if(missFields.length<1 && response.length!=0)
    if (missFields.length < 1) {
      var form = document.getElementById("formPost");
      form.submit();
    } else {
      var str = "";
      for (var i = 0; i < missFields.length; ++i) {
        str = str + missFields[i];
      }
      alert(str);
    }
  });
}

function getValues() {
  var elements = document.getElementById("formPost").elements;
  var obj = {};
  for (var i = 0; i < elements.length; i++) {
    var item = elements.item(i);
    obj[item.name] = item.value;
  }

  return obj;
}

function successFunction() {
  var success = document.getElementById("success");
  var form1 = document.getElementById("form1");
  // var form2=document.getElementById("form2");
  form1.style.display = "none";
  // form2.style.display="none";
  success.style.display = "block";
  if (screen.width <= 600) {
    var successbel = document.getElementById("belowSuccess");
    successbel.scrollIntoView();

  } else {
    success.scrollIntoView();
  }

  setTimeout(function() {
    success.classList.add('myHidden');
  }, 3000);
  setTimeout(function() {
    success.classList.remove('myHidden');
    success.style.display = "none";
    form1.style.display = "block";
  }, 5000);
}
