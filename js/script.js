var usertier = "";
var totalpoints = 0;
if (localStorage.getItem("totalpoints")) {
  totalpoints = localStorage.getItem("totalpoints");
} else {
  localStorage.setItem("totalpoints", 0);
}

function totalpayment() {
  var numofitems = localStorage.getItem("cartitem");
  if (numofitems == "1") {
    var finalprice = localStorage.getItem("item1price");
    document.getElementById("totalpayement").innerHTML =
      parseFloat(finalprice) + parseFloat("1");
  } else if (numofitems == "2") {
    var finalprice = localStorage.getItem("item1price");
    var finalprice2 = localStorage.getItem("item2price");
    if (localStorage.getItem("numofvoucher")) {
      var x = localStorage.getItem("numofvoucher");
      if (x == "1") {
        $("#discountbox").css("display", "block");
        var y = localStorage.getItem("voucher");
        if (y == "5OFF") {
          var discount = 5;
          document.getElementById("discountamount").innerHTML =
            "$" + discount + ".00";
          document.getElementById("totalpayment").innerHTML =
            "$" +
            (parseFloat(finalprice.substring(1)) +
              parseFloat(finalprice2.substring(1)) +
              parseFloat(1) -
              discount);
        }
      } else {
        document.getElementById("totalpayment").innerHTML =
          "$" +
          (parseFloat(finalprice.substring(1)) +
            parseFloat(finalprice2.substring(1)) +
            parseFloat(1));
      }
    }
  }
}

function updatepoints() {
  document.getElementById("totalpoints").innerHTML = totalpoints + " points";
}

if (localStorage.getItem("tier")) {
  usertier = localStorage.getItem("tier");
} else {
  localStorage.setItem("tier", "Bronze");
}

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
    var tempnum = Math.floor(Math.random() * 2) + 1;
    if (tempnum == "1") {
      var points = 200;
      if (usertier == "Bronze") {
        var newpoints = points * 1;
        totalpoints = parseInt(totalpoints) + parseInt(newpoints);
        localStorage.setItem("totalpoints", totalpoints);
        document.getElementById("totalpoints").innerHTML =
          totalpoints + " points";
        localStorage.setItem("earnpoints", totalpoints);
      } else if (usertier == "Silver") {
        var newpoints = points * 1.5;
        totalpoints = parseInt(totalpoints) + parseInt(newpoints);
        localStorage.setItem("totalpoints", totalpoints);
        document.getElementById("totalpoints").innerHTML =
          totalpoints + " points";
        localStorage.setItem("earnpoints", totalpoints);
      } else if (usertier == "Gold") {
        var newpoints = points * 2;
        totalpoints = parseInt(totalpoints) + parseInt(newpoints);
        localStorage.setItem("totalpoints", totalpoints);
        document.getElementById("totalpoints").innerHTML =
          totalpoints + " points";
        localStorage.setItem("earnpoints", totalpoints);
      } else if (usertier == "Platinum") {
        var newpoints = points * 2;
        totalpoints = parseInt(totalpoints) + parseInt(newpoints);
        localStorage.setItem("totalpoints", totalpoints);
        document.getElementById("totalpoints").innerHTML =
          totalpoints + " points";
        localStorage.setItem("earnpoints", totalpoints);
      } else if (usertier == "Diamond") {
        var newpoints = points * 3;
        totalpoints = parseInt(totalpoints) + parseInt(newpoints);
        localStorage.setItem("totalpoints", totalpoints);
        document.getElementById("totalpoints").innerHTML =
          totalpoints + " points";
        localStorage.setItem("earnpoints", totalpoints);
      }
    } else if (tempnum == "2") {
      localStorage.setItem("voucher", "5OFF");
      localStorage.setItem("numofvoucher", "1");
    }
  });
});

updaterewardinfo();
function updaterewardinfo() {
  if (localStorage.getItem("earnpoints")) {
    var x = localStorage.getItem("earnpoints");
    var progress = (parseInt(x) / 500) * 97.3;
    document.getElementById("bar1").style.width = progress + "%";
    if (x == "500") {
      document.getElementById("bar1").style.width = "0%";
      document.getElementById("rewardtier").innerHTML = "Silver";
      localStorage.setItem("tier", "Silver");
      localStorage.setItem("earnpoints", "0");
    }
  }
}
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
  $("#car").on("click", function () {
    cartitem = parseInt(cartitem) + 1;
    localStorage.setItem("cartitem", parseInt(cartitem));
    var tempname = document.getElementsByName("car")[0].id;
    var finalname = document.getElementById(tempname + "name").textContent;
    var finalprice = document.getElementById(tempname + "price").textContent;
    localStorage.setItem("item2name", finalname);
    localStorage.setItem("item2price", finalprice);
  });
  updatecart();
  function updatecart() {
    var numofitems = localStorage.getItem("cartitem");
    if (numofitems == "1") {
      var nameofproduct = localStorage.getItem("item1name");
      var finalprice = localStorage.getItem("item1price");
      document.getElementById("item1name").innerHTML = nameofproduct;
      document.getElementById("item1price").innerHTML = finalprice;
    } else if (numofitems == "2") {
      var nameofproduct = localStorage.getItem("item1name");
      var finalprice = localStorage.getItem("item1price");
      document.getElementById("item1name").innerHTML = nameofproduct;
      document.getElementById("item1price").innerHTML = finalprice;

      var nameofproduct = localStorage.getItem("item2name");
      var finalprice = localStorage.getItem("item2price");
      document.getElementById("item2name").innerHTML = nameofproduct;
      document.getElementById("item2price").innerHTML = finalprice;
    }
  }
  document.getElementById("selectall").onclick = function () {
    var productbox = document.getElementsByName("products");
    for (var x of productbox) {
      x.checked = this.checked;
      if (x.checked) {
        document.getElementById("oncheckout").disabled = false;
        var finalprice = localStorage.getItem("item1price");
        document.getElementById("product1").value = finalprice;

        var finalprice2 = localStorage.getItem("item2price");
        document.getElementById("product2").value = finalprice2;
        document.getElementById("subtotalamount").innerHTML =
          "$" +
          (parseFloat(finalprice.substring(1)) +
            parseFloat(finalprice2.substring(1)));
      } else {
        document.getElementById("subtotalamount").innerHTML = "$0.00";
      }
    }
  };

  document.getElementById("product1").onclick = function () {};
});
function addvalue(checkboxElem) {
  if (checkboxElem.checked) {
    document.getElementById("oncheckout").disabled = false;
    var finalprice = localStorage.getItem("item1price");
    var tempamount = document.getElementById("subtotalamount").textContent;
    finalamount =
      parseFloat(tempamount.substring(1)) + parseFloat(finalprice.substring(1));
    document.getElementById("subtotalamount").innerHTML = "$" + finalamount;
  } else {
    var finalprice = localStorage.getItem("item1price");
    var tempamount = document.getElementById("subtotalamount").textContent;
    finalamount =
      parseFloat(tempamount.substring(1)) - parseFloat(finalprice.substring(1));
    if (finalamount == "0") {
      document.getElementById("subtotalamount").innerHTML = "$0.00";
    } else {
      document.getElementById("subtotalamount").innerHTML = "$" + finalamount;
    }
  }
}
function addvalue2(checkboxElem) {
  if (checkboxElem.checked) {
    document.getElementById("oncheckout").disabled = false;
    var finalprice = localStorage.getItem("item2price");
    var tempamount = document.getElementById("subtotalamount").textContent;
    finalamount =
      parseFloat(tempamount.substring(1)) + parseFloat(finalprice.substring(1));
    document.getElementById("subtotalamount").innerHTML = "$" + finalamount;
  } else {
    var finalprice = localStorage.getItem("item2price");
    var tempamount = document.getElementById("subtotalamount").textContent;
    finalamount =
      parseFloat(tempamount.substring(1)) - parseFloat(finalprice.substring(1));
    if (finalamount == "0") {
      document.getElementById("subtotalamount").innerHTML = "$0.00";
    } else {
      document.getElementById("subtotalamount").innerHTML = "$" + finalamount;
    }
  }
}

function loadingpage() {
  setTimeout(function () {
    window.location.href = "../html/mainpage.html";
  }, 3000);
}

function updateUserTier() {
  if (localStorage.getItem("tier")) {
    document.getElementById("acclevel").innerHTML = localStorage.getItem(
      "tier"
    );
  } else {
    document.getElementById("acclevel").innerHTML = "Bronze";
  }

  if (localStorage.getItem("numofvoucher")) {
    var x = localStorage.getItem("numofvoucher");
    if (x == "1") {
      $("#profilevouchertext").css("display", "none");
      $("#profilevoucher").css("display", "block");
      var y = localStorage.getItem("voucher");
      if (y == "5OFF") {
        $("#profilevoucher").attr("src", "../img/voucher2.png");
      } else if (y == "10OFF") {
        $("#profilevoucher").attr("src", "../img/voucher3.png");
      } else if (y == "30%OFF") {
        $("#profilevoucher").attr("src", "../img/voucher1.png");
      }
    }
  }
}

$(document).ready(function () {
  $("#oncheckout").on("click", function () {
    window.location.href = "checkoutpage.html";
  });
  $("#placeorderbtn").on("click", function () {
    alert("Thank you for your purchase, your order has been placed.");
    window.location.href = "homepage.html";
  });
});

function showproducts() {
  var settings = {
    url: "https://fakestoreapi.com/products",
    method: "GET",
    timeout: 0,
  };

  $.ajax(settings).done(function (response) {
    var productlist = "products";
    for (i in response) {
      var div = document.createElement("div");
      div.setAttribute("class", "products");
      var image = document.createElement("img");
      image.src = response[i].image;
      image.setAttribute("class", "productimg");
      document.getElementById(productlist).className = "productimg";

      var heading = document.createElement("h3");
      heading.textContent = response[i].title;

      var price = document.createElement("p");
      price.textContent = "$" + response[i].price;

      var description = document.createElement("p");
      description.textContent = response[i].description;

      var button = document.createElement("div");
      button.textContent = "Add to Cart";
      button.setAttribute("class", "addtocartbtn");
      document.getElementById(productlist).appendChild(image);
      document.getElementById(productlist).appendChild(heading);
      document.getElementById(productlist).appendChild(price);
      document.getElementById(productlist).appendChild(description);
      document.getElementById(productlist).appendChild(button);
    }
  });
}

$(document).ready(function () {
  $("#search-input").on("keyup", function (e) {
    $("#products").css("display", "none");
    $("#products2").css("display", "block");
    var settings = {
      url: "https://fakestoreapi.com/products",
      method: "GET",
      timeout: 0,
    };

    $.ajax(settings).done(function (response) {
      var productlist2 = "products2";
      for (i in response) {
        var div = document.createElement("div");
        div.setAttribute("class", "products");

        var str = response[i].title;
        var searchtext = e.target.value;
        if (searchtext == null || searchtext == "") {
          window.location.href = "searchpage.html";
        }
        var n = str.includes(searchtext);
        if (n == true) {
          var image = document.createElement("img");
          image.src = response[i].image;
          image.setAttribute("class", "productimg");
          document.getElementById(productlist2).className = "productimg";

          var heading = document.createElement("h3");
          heading.textContent = response[i].title;

          var price = document.createElement("p");
          price.textContent = "$" + response[i].price;

          var description = document.createElement("p");
          description.textContent = response[i].description;

          var button = document.createElement("div");
          button.textContent = "Add to Cart";
          button.setAttribute("class", "addtocartbtn");

          var x = document.getElementById(productlist2);
          x.appendChild(image);
          x.appendChild(heading);
          x.appendChild(price);
          x.appendChild(description);
          x.appendChild(button);
        }
      }
    });
  });
});
