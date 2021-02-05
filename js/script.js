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
