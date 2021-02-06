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

//[STEP 0]: Make sure our document is A-OK
$(document).ready(function () {
  //what kind of interface we want at the start
  const APIKEY = "5ffd00071346a1524ff127a5";

  //[STEP 1]: Create our submit form listener
  $("#accounts-submit").on("click", function (e) {
    //prevent default action of the button
    e.preventDefault();

    //[STEP 2]: let's retrieve form data
    //for now we assume all information is valid
    //you are to do your own data validation
    let accountusername = $("#accounts-username").val();
    let accountemail = $("#accounts-email").val();
    let accountpassword = $("#accounts-password").val();
    let accountgender = $("#accounts-gender").val();
    let accountphonenumber = $("#accounts-phonenumber").val();

    //[STEP 3]: get form values when user clicks on send
    //Adapted from restdb api
    let jsondata = {
      username: accountusername,
      email: accountemail,
      password: accountpassword,
      gender: accountgender,
      phonenumber: accountphonenumber,
    };

    //[STEP 4]: Create our AJAX settings. Take note of API key
    let settings = {
      async: true,
      crossDomain: true,
      url: "https://interactivedev-e9de.restdb.io/rest/accounts",
      method: "POST", //[cher] we will use post to send info
      headers: {
        "content-type": "application/json",
        "x-apikey": APIKEY,
        "cache-control": "no-cache",
      },
      processData: false,
      data: JSON.stringify(jsondata),
      beforeSend: function () {
        //@TODO use loading bar instead
        //disable our button or show loading bar
        $("#accounts-submit").prop("disabled", true);
        //clear our form using the form id and triggering it's reset feature
        $("#add-contact-form").trigger("reset");
      },
    };

    //[STEP 5]: Send our ajax request over to the DB and print response of the RESTDB storage to console.
    $.ajax(settings).done(function (response) {
      console.log(response);

      $("#accounts-submit").prop("disabled", false);
    });
  });

  $("#accounts-login").on("click", function (e) {
    //prevent default action of the button
    e.preventDefault();

    //[STEP 2]: let's retrieve form data
    //for now we assume all information is valid
    //you are to do your own data validation
    let accountusername = $("#accounts-username").val();
    let accountpassword = $("#accounts-password").val();

    getaccounts();

    function getaccounts(limit = 10, all = true) {
      //[STEP 7]: Create our AJAX settings
      let settings = {
        async: true,
        crossDomain: true,
        url: "https://interactivedev-e9de.restdb.io/rest/accounts",
        method: "GET", //[cher] we will use GET to retrieve info
        headers: {
          "content-type": "application/json",
          "x-apikey": APIKEY,
          "cache-control": "no-cache",
        },
      };

      //[STEP 8]: Make our AJAX calls
      //Once we get the response, we modify our table content by creating the content internally. We run a loop to continously add on data
      //RESTDb/NoSql always adds in a unique id for each data, we tap on it to have our data and place it into our links
      $.ajax(settings).done(function (response) {
        let content = "";
        for (var i = 0; i < response.length && i < limit; i++) {
          var tempusername = response[i].username;
          var temppassword = response[i].password;
          if (
            accountusername == tempusername &&
            accountpassword == temppassword
          ) {
            window.location.href = "homepage.html";
          } else {
            $("#invalidtext").append("Incorrect username or password");
            break;
          }
          console.log(tempusername);
          console.log(temppassword);
        }
      });
    }
  });
});
