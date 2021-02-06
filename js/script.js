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

//account info
//[STEP 0]: Make sure our document is A-OK
$(document).ready(function () {
  //what kind of interface we want at the start
  const APIKEY = "5ffd00071346a1524ff127a5";
  getContacts();
  //[STEP 1]: Create our submit form listener
  $("#accounts-submit").on("click", function (e) {
    //prevent default action of the button
    e.preventDefault();

    //[STEP 2]: let's retrieve form data
    //for now we assume all information is valid
    //you are to do your own data validation
    let contactName = $("#contact-name").val();
    let contactEmail = $("#contact-email").val();
    let contactMessage = $("#contact-msg").val();
    let contactStudentID = $("#contact-studentid").val();
    let contactStudentClass = $("#contact-studentclass").val();
    let contactStudentMentor = $("#contact-studentmentor").val();

    //[STEP 3]: get form values when user clicks on send
    //Adapted from restdb api
    let jsondata = {
      name: contactName,
      email: contactEmail,
      message: contactMessage,
      studentid: contactStudentID,
      studentclass: contactStudentClass,
      studentmentor: contactStudentMentor,
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

      //@TODO update frontend UI
      $("#add-update-msg").show().fadeOut(3000);

      //update our table
      getContacts();
    });
  }); //end click

  //[STEP] 6
  //let's create a function to allow you to retrieve all the information in your contacts
  //by default we only retrieve 10 results
  function getContacts(limit = 10, all = true) {
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
        //console.log(response[i]);
        //[METHOD 1]
        //let's run our loop and slowly append content
        //we can use the normal string append += method
        /*
        content += "<tr><td>" + response[i].name + "</td>" +
          "<td>" + response[i].email + "</td>" +
          "<td>" + response[i].message + "</td>
          "<td>Del</td><td>Update</td</tr>";
        */

        //[METHOD 2]
        //using our template literal method using backticks
        //take note that we can't use += for template literal strings
        //we use ${content} because -> content += content
        //we want to add on previous content at the same time
        content = `${content}<tr id='${response[i]._id}'><td>${response[i].name}</td>
        <td>${response[i].studentid}</td>
        <td>${response[i].studentclass}</td>
        <td>${response[i].studentmentor}</td>
        <td>${response[i].email}</td>
        <td>${response[i].message}</td>
        <td><a href='#' class='delete' data-id='${response[i]._id}'>Del</a></td><td>
        <a href='#update-contact-container' class='update' data-id='${response[i]._id}' data-msg='${response[i].message}' data-name='${response[i].name}' data-email='${response[i].email}' data-studentid='${response[i].studentid}' data-studentclass='${response[i].studentclass}' data-studentmentor='${response[i].studentmentor}'>Update</a></td></tr>`;
      }

      //[STEP 9]: Update our HTML content
      //let's dump the content into our table body
      $("#contact-list tbody").html(content);

      $("#total-contacts").html(response.length);
    });
  }
});
