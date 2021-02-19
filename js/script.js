var usertier = "",
  totalpoints = 0;
function totalpayment() {
  var e = localStorage.getItem("cartitem");
  if ("1" == e) {
    var t = localStorage.getItem("item1price");
    document.getElementById("totalpayement").innerHTML =
      parseFloat(t) + parseFloat("1");
  } else if ("2" == e) {
    t = localStorage.getItem("item1price");
    var o = localStorage.getItem("item2price");
    if (localStorage.getItem("numofvoucher"))
      if ("1" == localStorage.getItem("numofvoucher")) {
        $("#discountbox").css("display", "block");
        var n = localStorage.getItem("voucher");
        if ("5OFF" == n) {
          var a = 5;
          (document.getElementById("discountamount").innerHTML =
            "$" + a + ".00"),
            (document.getElementById("totalpayment").innerHTML =
              "$" +
              (parseFloat(t.substring(1)) +
                parseFloat(o.substring(1)) +
                parseFloat(1) -
                a)),
            localStorage.setItem("numofvoucher", "0"),
            localStorage.setItem("voucher", ""),
            $("#profilevouchertext").css("display", "block"),
            $("#profilevoucher").css("display", "none");
        } else if ("10OFF" == n) {
          a = 10;
          (document.getElementById("discountamount").innerHTML =
            "$" + a + ".00"),
            (document.getElementById("totalpayment").innerHTML =
              "$" +
              (parseFloat(t.substring(1)) +
                parseFloat(o.substring(1)) +
                parseFloat(1) -
                a)),
            localStorage.setItem("numofvoucher", "0"),
            localStorage.setItem("voucher", ""),
            $("#profilevouchertext").css("display", "block"),
            $("#profilevoucher").css("display", "none");
        } else if ("30%OFF" == n) {
          a = 0.7;
          (document.getElementById("discountamount").innerHTML =
            "$" + a + ".00"),
            (document.getElementById("totalpayment").innerHTML =
              "$" +
              (parseFloat(t.substring(1)) +
                parseFloat(o.substring(1)) +
                parseFloat(1)) *
                a),
            localStorage.setItem("numofvoucher", "0"),
            localStorage.setItem("voucher", ""),
            $("#profilevouchertext").css("display", "block"),
            $("#profilevoucher").css("display", "none");
        }
      } else
        document.getElementById("totalpayment").innerHTML =
          "$" +
          (parseFloat(t.substring(1)) +
            parseFloat(o.substring(1)) +
            parseFloat(1));
  }
}
function updatepoints() {
  document.getElementById("totalpoints").innerHTML = totalpoints + " points";
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
function getcoordinates(e) {
  initMap(parseFloat(e.coords.latitude), parseFloat(e.coords.longitude));
}
function initMap(e, t) {
  null == e && null == t && ((e = 1.3521), (t = 103.8198));
  var o = { lat: parseFloat(e), lng: parseFloat(t) },
    n = new google.maps.Map(document.getElementById("map"), {
      center: o,
      zoom: 14,
    });
  function a(e) {
    new google.maps.Marker({
      map: n,
      position: e.location,
      title: e.name,
    }).addListener("click", function () {
      !(function (e) {
        document.getElementById("info_div").innerHTML =
          "Store name: " + e.name + "<br>Hours: " + e.hours;
      })(e);
    });
  }
  [
    {
      name: "MaMaMart",
      location: { lat: 1.3372868, lng: 103.7246456 },
      hours: "8AM to 10PM",
    },
    {
      name: "MaMaMart",
      location: { lat: 1.3392868, lng: 103.7266456 },
      hours: "9AM to 9PM",
    },
    {
      name: "MaMaMart",
      location: { lat: 1.3332868, lng: 103.7206456 },
      hours: "8AM to 10:30PM",
    },
    {
      name: "MaMaMart",
      location: { lat: 1.3462868, lng: 103.7036456 },
      hours: "8AM to 8PM",
    },
    {
      name: "MaMaMart",
      location: { lat: 1.3962868, lng: 103.8236456 },
      hours: "9AM to 10PM",
    },
  ].forEach(function (e) {
    a(e);
  });
}
function accountinfo() {
  $.ajax({
    url: "https://interactivedev-e9de.restdb.io/rest/accounts",
    method: "GET",
    timeout: 0,
    headers: { "x-api-key": "5ffd00071346a1524ff127a5" },
  }).done(function (e) {
    var t = localStorage.getItem("username");
    for (i in ($("#profileusername").html(t),
    $("#navbarname").html(t),
    $("#inputUser").html(t),
    e)) {
      if (t == e[i].username) {
        var o = e[i].email,
          n = e[i].phonenumber,
          a = e[i].gender;
        $("#accemail").html(o),
          $("#accphonenumber").html(n),
          $("#accgender").html(a);
      }
    }
  });
}
localStorage.getItem("totalpoints")
  ? (totalpoints = localStorage.getItem("totalpoints"))
  : localStorage.setItem("totalpoints", 0),
  localStorage.getItem("tier")
    ? (usertier = localStorage.getItem("tier"))
    : localStorage.setItem("tier", "Bronze"),
  $(document).ready(function () {
    const e = "5ffd00071346a1524ff127a5";
    $("#accounts-submit").on("click", function (t) {
      t.preventDefault();
      let o = {
          username: $("#accounts-username").val(),
          email: $("#accounts-email").val(),
          password: $("#accounts-password").val(),
          gender: $("#accounts-gender").val(),
          phonenumber: $("#accounts-phonenumber").val(),
        },
        n = {
          async: !0,
          crossDomain: !0,
          url: "https://interactivedev-e9de.restdb.io/rest/accounts",
          method: "POST",
          headers: {
            "content-type": "application/json",
            "x-apikey": e,
            "cache-control": "no-cache",
          },
          processData: !1,
          data: JSON.stringify(o),
          beforeSend: function () {},
          error: function (e) {
            alert("This username/email is already in use!");
          },
        };
      $.ajax(n).done(function (e) {
        alert("You account has been successfully created! Please login."),
          (window.location.href = "loginpage.html");
      });
    }),
      $("#accounts-login").on("click", function (t) {
        t.preventDefault();
        let o = $("#accounts-username").val(),
          n = $("#accounts-password").val();
        localStorage.setItem("username", o),
          (function (t = 10, a = !0) {
            let l = {
              async: !0,
              crossDomain: !0,
              url: "https://interactivedev-e9de.restdb.io/rest/accounts",
              method: "GET",
              headers: {
                "content-type": "application/json",
                "x-apikey": e,
                "cache-control": "no-cache",
              },
            };
            $.ajax(l).done(function (e) {
              for (var a = [], l = [], c = 0; c < e.length && c < t; c++) {
                var r = e[c].username,
                  i = e[c].password;
                a.push(r), l.push(i);
              }
              var s = a.includes(o),
                m = l.includes(n);
              1 == s && 1 == m
                ? (window.location.href = "homepage.html")
                : $("#invalidtext").html("Incorrect username or password");
            });
          })();
      });
  }),
  accountinfo(),
  resetdaily();
var resettime = "0:0",
  checkclaim = 0;
function resetdaily() {
  var e = new Date();
  e.getHours() + ":" + e.getMinutes() == resettime
    ? ($("#newmsg").css("display", "inline-block"),
      localStorage.setItem("claimcheck", "0"),
      (checkclaim = 0))
    : $("#newmsg").css("display", "none");
}
function updaterewardinfo() {
  if (localStorage.getItem("tier")) {
    document.getElementById("rewardtier").innerHTML = localStorage.getItem(
      "tier"
    );
  } else {
    document.getElementById("acclevel").innerHTML = "Bronze";
  }
  if (localStorage.getItem("earnpoints")) {
    var e = localStorage.getItem("earnpoints");
    if ("0" != e) {
      var t = (parseInt(e) / 500) * 97.3;
      document.getElementById("bar1").style.width = t + "%";
    }
    parseInt(e) >= 500 &&
      ((document.getElementById("bar1").style.width = "0%"),
      (document.getElementById("rewardtier").innerHTML = "Silver"),
      localStorage.setItem("tier", "Silver"),
      localStorage.setItem("earnpoints", "0"));
  }
}
function addvalue(e) {
  if (e.checked) {
    document.getElementById("oncheckout").disabled = !1;
    var t = localStorage.getItem("item1price"),
      o = document.getElementById("subtotalamount").textContent;
    (finalamount = parseFloat(o.substring(1)) + parseFloat(t.substring(1))),
      (document.getElementById("subtotalamount").innerHTML = "$" + finalamount);
  } else {
    (t = localStorage.getItem("item1price")),
      (o = document.getElementById("subtotalamount").textContent);
    (finalamount = parseFloat(o.substring(1)) - parseFloat(t.substring(1))),
      "0" == finalamount
        ? (document.getElementById("subtotalamount").innerHTML = "$0.00")
        : (document.getElementById("subtotalamount").innerHTML =
            "$" + finalamount);
  }
}
function addvalue2(e) {
  if (e.checked) {
    document.getElementById("oncheckout").disabled = !1;
    var t = localStorage.getItem("item2price"),
      o = document.getElementById("subtotalamount").textContent;
    (finalamount = parseFloat(o.substring(1)) + parseFloat(t.substring(1))),
      (document.getElementById("subtotalamount").innerHTML = "$" + finalamount);
  } else {
    (t = localStorage.getItem("item2price")),
      (o = document.getElementById("subtotalamount").textContent);
    (finalamount = parseFloat(o.substring(1)) - parseFloat(t.substring(1))),
      "0" == finalamount
        ? (document.getElementById("subtotalamount").innerHTML = "$0.00")
        : (document.getElementById("subtotalamount").innerHTML =
            "$" + finalamount);
  }
}
function loadingpage() {
  setTimeout(function () {
    window.location.href = "html/mainpage.html";
  }, 3e3);
}

function updateUserTier() {
  if (
    (localStorage.getItem("tier")
      ? (document.getElementById("acclevel").innerHTML = localStorage.getItem(
          "tier"
        ))
      : (document.getElementById("acclevel").innerHTML = "Bronze"),
    localStorage.getItem("numofvoucher")) &&
    "1" == localStorage.getItem("numofvoucher")
  ) {
    $("#profilevouchertext").css("display", "none"),
      $("#profilevoucher").css("display", "block");
    var e = localStorage.getItem("voucher");
    "5OFF" == e
      ? $("#profilevoucher").attr("src", "../img/voucher2.png")
      : "10OFF" == e
      ? $("#profilevoucher").attr("src", "../img/voucher3.png")
      : "30%OFF" == e &&
        $("#profilevoucher").attr("src", "../img/voucher1.png");
  }
}

function showproducts() {
  $.ajax({
    url: "https://fakestoreapi.com/products",
    method: "GET",
    timeout: 0,
  }).done(function (e) {
    for (i in e) {
      document.createElement("div").setAttribute("class", "products");
      var t = document.createElement("img");
      (t.src = e[i].image),
        t.setAttribute("class", "productimg"),
        (document.getElementById("products").className = "productimg");
      var o = document.createElement("h3");
      o.textContent = e[i].title;
      var n = document.createElement("p");
      n.textContent = "$" + e[i].price;
      var a = document.createElement("p");
      a.textContent = e[i].description;
      var l = document.createElement("div");
      (l.textContent = "Add to Cart"),
        l.setAttribute("class", "addtocartbtn"),
        document.getElementById("products").appendChild(t),
        document.getElementById("products").appendChild(o),
        document.getElementById("products").appendChild(n),
        document.getElementById("products").appendChild(a),
        document.getElementById("products").appendChild(l);
    }
  });
}
$(document).ready(function () {
  var e = new Date(),
    t = e.getHours() + ":" + e.getMinutes();
  if (localStorage.getItem("claimcheck"))
    var o = localStorage.getItem("claimcheck");
  else {
    o = 0;
    localStorage.setItem("claimcheck", "0");
  }
  0 == o
    ? $("#newmsg").css("display", "inline-block")
    : 1 == o && t != resettime && $("#newmsg").css("display", "none"),
    t == resettime
      ? ($("#newmsg").css("display", "inline-block"),
        localStorage.setItem("claimcheck", "0"))
      : t != resettime && 1 == o && $("#newmsg").css("display", "none"),
    $("#navbartext4").on("click", function (e) {
      0 == localStorage.getItem("claimcheck")
        ? ($("#newmsg").css("display", "none"),
          localStorage.setItem("claimcheck", "1"),
          closeNavbar(),
          $(".dailyreward").css("display", "block"))
        : (closeNavbar(), alert("You may only claim once a day!"));
    }),
    $(".dailyreward").on("click", function (e) {
      $(".dailyreward").css("display", "none");
      var t = Math.floor(1 * Math.random()) + 1;
      if ("1" == t) {
        $(".dailyopened").css("display", "block"),
          (document.getElementById("rewarddaily").src =
            "../img/daily_bonus.png");
        if ("Bronze" == usertier) {
          var o = 200;
          if (
            ((totalpoints = parseInt(totalpoints) + parseInt(o)),
            localStorage.setItem("totalpoints", totalpoints),
            (document.getElementById("totalpoints").innerHTML =
              totalpoints + " points"),
            localStorage.getItem("earnpoints"))
          ) {
            var n = localStorage.getItem("earnpoints"),
              a = parseInt(n) + o;
            localStorage.setItem("earnpoints", a);
          }
        } else if ("Silver" == usertier) {
          o = 300;
          if (
            ((totalpoints = parseInt(totalpoints) + parseInt(o)),
            localStorage.setItem("totalpoints", totalpoints),
            (document.getElementById("totalpoints").innerHTML =
              totalpoints + " points"),
            localStorage.getItem("earnpoints"))
          ) {
            (n = localStorage.getItem("earnpoints")), (a = parseInt(n) + o);
            localStorage.setItem("earnpoints", a);
          }
        } else if ("Gold" == usertier) {
          o = 400;
          if (
            ((totalpoints = parseInt(totalpoints) + parseInt(o)),
            localStorage.setItem("totalpoints", totalpoints),
            (document.getElementById("totalpoints").innerHTML =
              totalpoints + " points"),
            localStorage.getItem("earnpoints"))
          ) {
            (n = localStorage.getItem("earnpoints")), (a = parseInt(n) + o);
            localStorage.setItem("earnpoints", a);
          }
        } else if ("Platinum" == usertier) {
          o = 400;
          if (
            ((totalpoints = parseInt(totalpoints) + parseInt(o)),
            localStorage.setItem("totalpoints", totalpoints),
            (document.getElementById("totalpoints").innerHTML =
              totalpoints + " points"),
            localStorage.getItem("earnpoints"))
          ) {
            (n = localStorage.getItem("earnpoints")), (a = parseInt(n) + o);
            localStorage.setItem("earnpoints", a);
          }
        } else if ("Diamond" == usertier) {
          o = 600;
          if (
            ((totalpoints = parseInt(totalpoints) + parseInt(o)),
            localStorage.setItem("totalpoints", totalpoints),
            (document.getElementById("totalpoints").innerHTML =
              totalpoints + " points"),
            localStorage.getItem("earnpoints"))
          ) {
            (n = localStorage.getItem("earnpoints")), (a = parseInt(n) + o);
            localStorage.setItem("earnpoints", a);
          }
        }
      } else "2" == t ? (localStorage.setItem("voucher", "5OFF"), localStorage.setItem("numofvoucher", "1"), (document.getElementById("rewarddaily").src = "../img/daily_voucher2.png")) : "3" == t ? (localStorage.setItem("voucher", "10OFF"), localStorage.setItem("numofvoucher", "1"), (document.getElementById("rewarddaily").src = "../img/daily_voucher1.png")) : "4" == t && (localStorage.setItem("voucher", "30%OFF"), localStorage.setItem("numofvoucher", "1"), (document.getElementById("rewarddaily").src = "../img/daily_voucher3.png"));
      $(".dailyopened").css("display", "block");
    }),
    $(".dailyopened").on("click", function (e) {
      $(".dailyopened").css("display", "none");
    });
}),
  $(document).ready(function () {
    $("#submit-button").on("click", function (e) {
      e.preventDefault();
      let t = {
          username: localStorage.getItem("username"),
          name: $("#inputName").val(),
          subject: $("#inputSubject").val(),
          message: $("#inputMessage").val(),
        },
        o = {
          async: !0,
          crossDomain: !0,
          url: "https://interactivedev-c72a.restdb.io/rest/contact",
          method: "POST",
          headers: {
            "content-type": "application/json",
            "x-apikey": "5ffd003a1346a1524ff127ad",
            "cache-control": "no-cache",
          },
          processData: !1,
          data: JSON.stringify(t),
          beforeSend: function () {
            $("#submit-button").prop("disabled", !0),
              $("#add-feedback-form").trigger("reset");
          },
          error: function () {
            alert("Please fill in all fields in the form!");
          },
        };
      $.ajax(o).done(function (e) {
        $("#submit-button").prop("disabled", !1),
          alert("Your feedback has been succesfully submitted."),
          (window.location.href = "homepage.html");
      });
    });
  }),
  $(document).ready(function () {
    $("#camclosebtn").on("click", function (e) {
      window.location.href = "homepage.html";
    }),
      $("#carmodel").on("click", function (e) {
        window.location.href = "cararpage.html";
      }),
      $("#truckmodel").on("click", function (e) {
        window.location.href = "truckarpage.html";
      });
  }),
  $(document).ready(function () {
    $("#plus-btn").on("click", function (e) {
      var x = document.getElementById("productquantity").value;
      var y = document.getElementById("item1price").textContent;
      x = parseInt(x) + 1;
      y = parseFloat(y.substring(1)) + 38.88;
      document.getElementById("productquantity").value = x;
      document.getElementById("item1price").innerHTML = "$" + y.toFixed(2);
      localStorage.setItem("item1price", "$" + y.toFixed(2));
      localStorage.setItem("productno1", x);
    });
    $("#minus-btn").on("click", function (e) {
      var x = document.getElementById("productquantity").value;
      var y = document.getElementById("item1price").textContent;
      if (x != 1) {
        x = parseInt(x) - 1;
        y = parseFloat(y.substring(1)) - 38.88;
        document.getElementById("productquantity").value = x;
        document.getElementById("item1price").innerHTML = "$" + y.toFixed(2);
        localStorage.setItem("item1price", "$" + y.toFixed(2));
        localStorage.setItem("productno1", x);
      } else {
        x = 1;
      }
    });
    $("#plus-btn1").on("click", function (e) {
      var x = document.getElementById("productquantity1").value;
      var y = document.getElementById("item2price").textContent;
      x = parseInt(x) + 1;
      y = parseFloat(y.substring(1)) + 48.88;
      document.getElementById("productquantity1").value = x;
      document.getElementById("item2price").innerHTML = "$" + y.toFixed(2);
      localStorage.setItem("item2price", "$" + y.toFixed(2));
      localStorage.setItem("productno2", x);
    });
    $("#minus-btn1").on("click", function (e) {
      var x = document.getElementById("productquantity1").value;
      var y = document.getElementById("item2price").textContent;
      if (x != 1) {
        x = parseInt(x) - 1;
        y = parseFloat(y.substring(1)) - 48.88;
        document.getElementById("productquantity1").value = x;
        document.getElementById("item2price").innerHTML = "$" + y.toFixed(2);
        localStorage.setItem("item2price", "$" + y.toFixed(2));
        localStorage.setItem("productno2", x);
      } else {
        x = 1;
      }
      document.getElementById("productquantity1").value = x;
    });
    var e = parseInt(0);
    localStorage.getItem("cartitem")
      ? (e = localStorage.getItem("cartitem"))
      : localStorage.setItem("cartitem", parseInt(0)),
      1 == e
        ? ($("#productcontainer").css("display", "block"),
          $("#carttext").css("display", "none"))
        : 2 == e &&
          ($("#productcontainer").css("display", "block"),
          $("#productcontainer1").css("display", "block"),
          $("#carttext").css("display", "none")),
      $("#truck").on("click", function () {
        (e = parseInt(e) + 1), localStorage.setItem("cartitem", parseInt(e));
        var t = document.getElementsByName("truck")[0].id,
          o = document.getElementById(t + "name").textContent,
          n = document.getElementById(t + "price").textContent;
        localStorage.setItem("item1name", o),
          localStorage.setItem("item1price", n);
        if (localStorage.getItem("productno1")) {
          var x = localStorage.getItem("productno1");
          x = parseInt(x) + 1;
          localStorage.setItem("productno1", x);
        } else {
          localStorage.setItem("productno1", "1");
        }
      }),
      $("#car").on("click", function () {
        (e = parseInt(e) + 1), localStorage.setItem("cartitem", parseInt(e));
        var t = document.getElementsByName("car")[0].id,
          o = document.getElementById(t + "name").textContent,
          n = document.getElementById(t + "price").textContent;
        localStorage.setItem("item2name", o),
          localStorage.setItem("item2price", n);
        if (localStorage.getItem("productno2")) {
          var x = localStorage.getItem("productno2");
          x = parseInt(x) + 1;
          localStorage.setItem("productno2", x);
        } else {
          localStorage.setItem("productno2", "1");
        }
      }),
      (function () {
        var e = localStorage.getItem("cartitem");
        if ("1" == e) {
          var t = localStorage.getItem("item1name"),
            o = localStorage.getItem("item1price");
          (document.getElementById("item1name").innerHTML = t),
            (document.getElementById("item1price").innerHTML = o);
        } else if ("2" == e) {
          var t = localStorage.getItem("item1name"),
            o = localStorage.getItem("item1price");
          (document.getElementById("item1name").innerHTML = t),
            (document.getElementById("item1price").innerHTML = o);
          var t = localStorage.getItem("item2name"),
            o = localStorage.getItem("item2price");
          (document.getElementById("item2name").innerHTML = t),
            (document.getElementById("item2price").innerHTML = o);
        }
      })(),
      (document.getElementById("selectall").onclick = function () {
        var e = document.getElementsByName("products");
        for (var t of e)
          if (((t.checked = this.checked), t.checked)) {
            document.getElementById("oncheckout").disabled = !1;
            var o = localStorage.getItem("item1price");
            document.getElementById("product1").value = o;
            var n = localStorage.getItem("item2price");
            (document.getElementById("product2").value = n),
              (document.getElementById("subtotalamount").innerHTML =
                "$" +
                (parseFloat(o.substring(1)) + parseFloat(n.substring(1))));
          } else document.getElementById("subtotalamount").innerHTML = "$0.00";
      }),
      (document.getElementById("product1").onclick = function () {});
  }),
  $(document).ready(function () {
    $("#oncheckout").on("click", function () {
      window.location.href = "checkoutpage.html";
    }),
      $("#placeorderbtn").on("click", function () {
        var amount = document.getElementById("totalpayment").textContent;

        if (localStorage.getItem("earnpoints")) {
          var t = localStorage.getItem("earnpoints"),
            o = parseInt(t) + parseInt(amount.substring(1) * 10);
          localStorage.setItem("earnpoints", o);
          var n = localStorage.getItem("totalpoints"),
            a = parseInt(n) + parseInt(o);
          localStorage.setItem("totalpoints", a);
        }
        alert("Thank you for your purchase, your order has been placed."),
          (window.location.href = "homepage.html");
      });
  }),
  $(document).ready(function () {
    $("#search-input").on("keyup", function (e) {
      $("#products").css("display", "none"),
        $("#products2").css("display", "block");
      $.ajax({
        url: "https://fakestoreapi.com/products",
        method: "GET",
        timeout: 0,
      }).done(function (t) {
        for (i in t) {
          document.createElement("div").setAttribute("class", "products");
          var o = t[i].title,
            n = e.target.value;
          if (
            ((null != n && "" != n) ||
              (window.location.href = "searchpage.html"),
            1 == o.includes(n))
          ) {
            var a = document.createElement("img");
            (a.src = t[i].image),
              a.setAttribute("class", "productimg"),
              (document.getElementById("products2").className = "productimg");
            var l = document.createElement("h3");
            l.textContent = t[i].title;
            var c = document.createElement("p");
            c.textContent = "$" + t[i].price;
            var r = document.createElement("p");
            r.textContent = t[i].description;
            var s = document.createElement("div");
            (s.textContent = "Add to Cart"),
              s.setAttribute("class", "addtocartbtn");
            var m = document.getElementById("products2");
            m.appendChild(a),
              m.appendChild(l),
              m.appendChild(c),
              m.appendChild(r),
              m.appendChild(s);
          }
        }
      });
    });
  });
var quizattempt = 0;
function checkquiz() {
  var e = new Date(),
    t = e.getHours() + ":" + e.getMinutes();
  if (localStorage.getItem("quizattempt")) {
    var o = localStorage.getItem("quizattempt");
    "1" == o &&
      ($("#quizbefore").css("display", "none"),
      $("#quizafter").css("display", "block"));
  } else
    "1" == o &&
      t == resettime &&
      (localStorage.setItem("quizattempt", "0"),
      $("#quizbefore").css("display", "block"),
      $("#quizafter").css("display", "none"));
  t == resettime &&
    ($("#quizbefore").css("display", "block"),
    $("#quizafter").css("display", "none"),
    localStorage.setItem("quizattempt", "0"));
}
function update() {
  updaterewardinfo(), updatepoints();
}
localStorage.getItem("earnpoints") || localStorage.setItem("earnpoints", "0"),
  checkquiz(),
  $(document).ready(function () {
    $("#quiz-submit").on("click", function (e) {
      if ("$38.88" == $("#quizans").val()) {
        if (localStorage.getItem("earnpoints")) {
          var t = localStorage.getItem("earnpoints"),
            o = parseInt(t) + 150;
          localStorage.setItem("earnpoints", o);
          var n = localStorage.getItem("totalpoints"),
            a = parseInt(n) + parseInt(t);
          localStorage.setItem("totalpoints", a);
        }
        alert(
          "You have earned 150 bonus points for getting the correct answer."
        ),
          $("#quizbefore").css("display", "none"),
          $("#quizafter").css("display", "block");
      } else alert("Wrong answer. Please try again tomorrow."), $("#quizbefore").css("display", "none"), $("#quizafter").css("display", "block");
      (quizattempt = 1), localStorage.setItem("quizattempt", "1");
    });
  });

function togglecarimg() {
  var sketchfab = document.getElementById("carsketchfab");
  var stillimage = document.getElementById("carimg");
  if (sketchfab.style.display == "none") {
    sketchfab.style.display = "block";
    stillimage.style.display = "none";
  } else {
    sketchfab.style.display = "none";
    stillimage.style.display = "block";
  }
}

function toggletruckimg() {
  var sketchfab = document.getElementById("trucksketchfab");
  var stillimage = document.getElementById("truckimg");
  if (sketchfab.style.display == "none") {
    sketchfab.style.display = "block";
    stillimage.style.display = "none";
  } else {
    sketchfab.style.display = "none";
    stillimage.style.display = "block";
  }
}
