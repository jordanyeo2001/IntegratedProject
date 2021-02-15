function openNavbar() {
  document.getElementById("sidenavbar").style.width = "250px";
}
function closeNavbar() {
  document.getElementById("sidenavbar").style.width = "0";
}
function getLocation() {
  navigator.geolocation.getCurrentPosition(getcoordinates);
}

function getcoordinates(position) {
  var currentlatitude = parseFloat(position.coords.latitude);
  var currentlongitude = parseFloat(position.coords.longitude);
  initMap(currentlatitude, currentlongitude);
}
getLocation();

function initMap(latitude, longitude) {
  if (latitude == undefined && longitude == undefined) {
    latitude = 1.3521;
    longitude = 103.8198;
  }

  var myMapCenter = { lat: parseFloat(latitude), lng: parseFloat(longitude) };
  var map = new google.maps.Map(document.getElementById("map"), {
    center: myMapCenter,
    zoom: +14,
  });

  function markStore(storeInfo) {
    var marker = new google.maps.Marker({
      map: map,
      position: storeInfo.location,
      title: storeInfo.name,
    });

    marker.addListener("click", function () {
      showStoreInfo(storeInfo);
    });
  }

  function showStoreInfo(storeInfo) {
    var info_div = document.getElementById("info_div");
    info_div.innerHTML =
      "Store name: " + storeInfo.name + "<br>Hours: " + storeInfo.hours;
  }

  var stores = [
    {
      name: "MaMaMart",
      location: { lat: 1.3372867999999999, lng: 103.7246456 },
      hours: "8AM to 10PM",
    },
    {
      name: "MaMaMart",
      location: { lat: 1.3392867999999999, lng: 103.7266456 },
      hours: "9AM to 9PM",
    },
    {
      name: "MaMaMart",
      location: { lat: 1.3332867999999999, lng: 103.7206456 },
      hours: "8AM to 10:30PM",
    },
    {
      name: "MaMaMart",
      location: { lat: 1.3462867999999999, lng: 103.7036456 },
      hours: "8AM to 8PM",
    },
    {
      name: "MaMaMart",
      location: { lat: 1.3962867999999999, lng: 103.8236456 },
      hours: "9AM to 10PM",
    },
  ];

  stores.forEach(function (store) {
    markStore(store);
  });
}

//For Login and SignUp

$(document).ready(function () {
  const APIKEY = "5ffd00071346a1524ff127a5";

  $("#accounts-submit").on("click", function (e) {
    //prevent default action of the button
    e.preventDefault();

    let accountusername = $("#accounts-username").val();
    let accountemail = $("#accounts-email").val();
    let accountpassword = $("#accounts-password").val();
    let accountgender = $("#accounts-gender").val();
    let accountphonenumber = $("#accounts-phonenumber").val();

    let jsondata = {
      username: accountusername,
      email: accountemail,
      password: accountpassword,
      gender: accountgender,
      phonenumber: accountphonenumber,
    };

    let settings = {
      async: true,
      crossDomain: true,
      url: "https://interactivedev-e9de.restdb.io/rest/accounts",
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-apikey": APIKEY,
        "cache-control": "no-cache",
      },
      processData: false,
      data: JSON.stringify(jsondata),
      beforeSend: function () {},
      error: function (err) {
        alert("This username/email is already in use!");
      },
    };

    $.ajax(settings).done(function (response) {
      alert("You account has been successfully created! Please login.");
      window.location.href = "loginpage.html";
    });
  });

  $("#accounts-login").on("click", function (e) {
    //prevent default action of the button
    e.preventDefault();

    let accountusername = $("#accounts-username").val();
    let accountpassword = $("#accounts-password").val();
    localStorage.setItem("username", accountusername);
    getaccounts();

    function getaccounts(limit = 10, all = true) {
      let settings = {
        async: true,
        crossDomain: true,
        url: "https://interactivedev-e9de.restdb.io/rest/accounts",
        method: "GET",
        headers: {
          "content-type": "application/json",
          "x-apikey": APIKEY,
          "cache-control": "no-cache",
        },
      };

      $.ajax(settings).done(function (response) {
        var usernamelist = [];
        var passwordlist = [];

        for (var i = 0; i < response.length && i < limit; i++) {
          var tempusername = response[i].username;
          var temppassword = response[i].password;
          usernamelist.push(tempusername);
          passwordlist.push(temppassword);
        }
        var x = usernamelist.includes(accountusername);
        var y = passwordlist.includes(accountpassword);

        if (x == true && y == true) {
          window.location.href = "homepage.html";
        } else {
          $("#invalidtext").html("Incorrect username or password");
        }
      });
    }
  });
});

function accountinfo() {
  var settings = {
    url: "https://interactivedev-e9de.restdb.io/rest/accounts",
    method: "GET",
    timeout: 0,
    headers: {
      "x-api-key": "5ffd00071346a1524ff127a5",
    },
  };

  $.ajax(settings).done(function (response) {
    var x = localStorage.getItem("username");
    $("#profileusername").html(x);
    $("#navbarname").html(x);
    $("#inputUser").html(x);
    for (i in response) {
      var y = response[i].username;
      if (x == y) {
        var accemail = response[i].email;
        var accnumber = response[i].phonenumber;
        var accgender = response[i].gender;
        $("#accemail").html(accemail);
        $("#accphonenumber").html(accnumber);
        $("#accgender").html(accgender);
      }
    }
  });
}
accountinfo();
resetdaily();
var resettime = "0:0";
var checkclaim = 0;
function resetdaily() {
  var currenttime = new Date();
  var currenthrs = currenttime.getHours();
  var currentmins = currenttime.getMinutes();
  var timenow = currenthrs + ":" + currentmins;
  if (timenow == resettime) {
    $("#newmsg").css("display", "inline-block");
    localStorage.setItem("claimcheck", "0");
    checkclaim = 0;
  } else {
    $("#newmsg").css("display", "none");
  }
}

$(document).ready(function () {
  var currenttime = new Date();
  var currenthrs = currenttime.getHours();
  var currentmins = currenttime.getMinutes();
  var timenow = currenthrs + ":" + currentmins;
  if (localStorage.getItem("claimcheck")) {
    var tempnum = localStorage.getItem("claimcheck");
    var checkclaim = tempnum;
  } else {
    var checkclaim = 0;
    localStorage.setItem("claimcheck", "0");
  }

  if (checkclaim == 0) {
    $("#newmsg").css("display", "inline-block");
  } else if (checkclaim == 1 && timenow != resettime) {
    $("#newmsg").css("display", "none");
  }

  if (timenow == resettime) {
    $("#newmsg").css("display", "inline-block");
    localStorage.setItem("claimcheck", "0");
  } else if (timenow != resettime && checkclaim == 1) {
    $("#newmsg").css("display", "none");
  }
  $("#navbartext4").on("click", function (e) {
    var checkdaily = localStorage.getItem("claimcheck");
    if (checkdaily == 0) {
      $("#newmsg").css("display", "none");
      localStorage.setItem("claimcheck", "1");
      closeNavbar();
      $(".dailyreward").css("display", "block");
    } else {
      closeNavbar();
      alert("You may only claim once a day!");
    }
  });
  $(".dailyreward").on("click", function (e) {
    $(".dailyreward").css("display", "none");
    $(".dailyopened").css("display", "block");
  });
  $(".dailyopened").on("click", function (e) {
    $(".dailyopened").css("display", "none");
  });
});

//JS for Feedback Page//
$(document).ready(function () {
  const APIKEY = "5ffd003a1346a1524ff127ad";

  $("#submit-button").on("click", function (e) {
    e.preventDefault();
    var x = localStorage.getItem("username");
    let contactUsername = x;
    let contactName = $("#inputName").val();
    let contactSubject = $("#inputSubject").val();
    let contactMessage = $("#inputMessage").val();

    let jsondata = {
      username: contactUsername,
      name: contactName,
      subject: contactSubject,
      message: contactMessage,
    };

    let settings = {
      async: true,
      crossDomain: true,
      url: "https://interactivedev-c72a.restdb.io/rest/contact",
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-apikey": APIKEY,
        "cache-control": "no-cache",
      },
      processData: false,
      data: JSON.stringify(jsondata),
      beforeSend: function () {
        $("#submit-button").prop("disabled", true);
        $("#add-feedback-form").trigger("reset");
      },
    };

    $.ajax(settings).done(function (response) {
      $("#submit-button").prop("disabled", false);
      alert("Your feedback has been succesfully submitted.");
      window.location.href = "homepage.html";
    });
  });
});

//For homepage AR/3D view
$(document).ready(function () {
  $("#camclosebtn").on("click", function (e) {
    window.location.href = "homepage.html";
  });

  $("#carmodel").on("click", function (e) {
    window.location.href = "cararpage.html";
  });

  $("#truckmodel").on("click", function (e) {
    window.location.href = "cararpage.html";
  });
});

//For cart page
$(document).ready(function () {
  $("#plus-btn").on("click", function (e) {
    var x = document.getElementById("productquantity").value;
    x = parseInt(x) + 1;
    document.getElementById("productquantity").value = x;
  });
  $("#minus-btn").on("click", function (e) {
    var x = document.getElementById("productquantity").value;
    if (x != 1) {
      x = parseInt(x) - 1;
    } else {
      x = 1;
    }

    document.getElementById("productquantity").value = x;
  });
  $("#plus-btn1").on("click", function (e) {
    var x = document.getElementById("productquantity1").value;
    x = parseInt(x) + 1;
    document.getElementById("productquantity1").value = x;
  });
  $("#minus-btn1").on("click", function (e) {
    var x = document.getElementById("productquantity1").value;
    if (x != 1) {
      x = parseInt(x) - 1;
    } else {
      x = 1;
    }

    document.getElementById("productquantity1").value = x;
  });
  var cartitem = parseInt(0);
  if (localStorage.getItem("cartitem")) {
    cartitem = localStorage.getItem("cartitem");
  } else {
    localStorage.setItem("cartitem", parseInt(0));
  }
  if (cartitem == 1) {
    $("#productcontainer").css("display", "block");
    $("#carttext").css("display", "none");
  } else if (cartitem == 2) {
    $("#productcontainer").css("display", "block");
    $("#productcontainer1").css("display", "block");
    $("#carttext").css("display", "none");
  }
  $("#truck").on("click", function () {
    cartitem = parseInt(cartitem) + 1;
    localStorage.setItem("cartitem", parseInt(cartitem));
    var tempname = document.getElementsByName("truck")[0].id;
    var finalname = document.getElementById(tempname + "name").textContent;
    var finalprice = document.getElementById(tempname + "price").textContent;
    localStorage.setItem("item1name", finalname);
    localStorage.setItem("item1price", finalprice);
  });
  updatecart();
  function updatecart() {
    var nameofproduct = localStorage.getItem("item1name");
    var finalprice = localStorage.getItem("item1price");
    document.getElementById("itemname").innerHTML = nameofproduct;
    document.getElementById("itemprice").innerHTML = finalprice;
  }
  document.getElementById("selectall").onclick = function () {
    var productbox = document.getElementsByName("products");
    for (var x of productbox) {
      x.checked = this.checked;
      if (x.checked) {
        var finalprice = localStorage.getItem("item1price");
        document.getElementById("product1").value = finalprice;
        document.getElementById(
          "subtotalamount"
        ).innerHTML = document.getElementById("product1").value;
      } else {
        document.getElementById("subtotalamount").innerHTML = "$0.00";
      }
    }
  };

  document.getElementById("product1").onclick = function () {};
});
function addvalue(checkboxElem) {
  if (checkboxElem.checked) {
    var finalprice = localStorage.getItem("item1price");
    document.getElementById("subtotalamount").innerHTML = finalprice;
  } else {
    var finalprice = localStorage.getItem("item1price");
    var tempamount = document.getElementById("subtotalamount").textContent;
    finalamount =
      parseInt(tempamount.substring(1)) - parseInt(finalprice.substring(1));
    if (finalamount == "0") {
      document.getElementById("subtotalamount").innerHTML = "$0.00";
    } else {
      document.getElementById("subtotalamount").innerHTML = "$" + finalamount;
    }
  }
}
