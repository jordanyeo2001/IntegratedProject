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
      beforeSend: function () {
        //disable the button
        $("#accounts-submit").prop("disabled", true);
        //clear the form and triggering it's reset feature
        $("#add-contact-form").trigger("reset");
      },
      error: function (err) {
        alert("This username/email is already in use!");
      },
    };

    $.ajax(settings).done(function (response) {
      $("#accounts-submit").prop("disabled", false);

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
