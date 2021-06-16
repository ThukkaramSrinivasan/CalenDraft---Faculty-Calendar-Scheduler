var mysql = require("mysql");
var express = require("express");
var passport = require("passport");
var path = require("path");
var request = require("request");
var bodyParser = require("body-parser");
const notifier = require("node-notifier");

const webpush = require("web-push");
const Swal = require("sweetalert2");
const { Pinpoint, SageMakerFeatureStoreRuntime } = require("aws-sdk");
var nodemailer = require("nodemailer");
const schedule = require("node-schedule");
const mongo = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017";
var assert = require("assert");
const { info } = require("console");

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  port: "3306",
  database: "scheduler",
});


var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "team.calendraft@gmail.com",
    pass: "calendraft123",
  },
});

var app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));
// app.use(express.static(__dirname+"/views"));
// app.use(express.static(__dirname+"/CSS"));
// app.use(express.static(__dirname+"/img"));
// app.use(express.static(__dirname+"/logo"));
// app.use(express.static(__dirname+"/HTML"));
// app.use('/static', express.static(__dirname));
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

function jobs() {
  var list = schedule.scheduledJobs;
  console.log(list);
  var arr = [];
  for (var key in list) {
    arr.push(list[key].name);
  }
  return arr;
}

function addReminders(id, date, msg) {
  var d = new Date();
  var min = d.getTime();
  var date = new Date(date);
  console.log("addReminders:", id, date, jobs());
  var minDate = date.getTime();
  if (+d <= +date) {
    if (minDate - min > 300000) {
      date.setMinutes(date.getMinutes() - 5);
      msg = msg + " event in 5 minutes";
    } else {
      msg =
        msg +
        " event in " +
        (date.getMinutes() - d.getMinutes() - 1).toString() +
        "minutes";
      date = new Date();
      date.setMinutes(date.getMinutes() + 1);
    }
  }
  var arr = jobs();
  console.log(arr);
  if (!(id in arr)) {
    const job = schedule.scheduleJob(id, date, function () {
      console.log("Job Here");
      new notifier.NotificationCenter().notify({
        title: "CalenDraft",
        message: msg,
        icon: "C:\\finalgit\\logo\\shortcutLogo.png",
        silent: true,
      });
      new notifier.NotifySend().notify({
        title: "CalenDraft",
        message: msg,
        icon: "C:\\finalgit\\logo\\shortcutLogo.png",
        silent: true,
      });
      new notifier.WindowsToaster().notify({
        title: "CalenDraft",
        message: msg,
        icon: "C:\\finalgit\\logo\\shortcutLogo.png",
        silent: true,
      });
      new notifier.Growl().notify({
        title: "CalenDraft",
        message: msg,
        icon: "C:\\finalgit\\logo\\shortcutLogo.png",
        silent: true,
      });
    });
  }
  console.log("J0bs", schedule.scheduledJobs);
}

function setReminder(
  year,
  month,
  day,
  hour,
  minutes,
  msg,
  sound,
  name,
  email,
  repeat,
  id
) {
  console.log(year, month, day, hour, minutes, msg, sound, name, email);
  const date = new Date(year, month, day, hour, minutes, 0);
  const ret = "";

  if (repeat == "none") {
    const job = schedule.scheduleJob(id, date, function () {
      console.log("The answer to life, the universe, and everything!");
      var mailOptions = {
        from: "team.calendraft@gmail.com",
        to: email,
        subject: "CalenDraft Reminder:" + msg,
        text:
          `Hi ` +
          name +
          `, this is a No-Reply mail to remind you about:` +
          msg +
          `.`,
      };
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
          ret = info.response;
        }
      });

      // notifier.notify(
      //   {
      //     title: "CalenDraft",
      //     message: msg,
      //     icon: "C:\\SWE-Backup_v2\\logo\\shortcutLogo.png",
      //     silent: sound,
      //     subtitle: "User:"+name
      //   }
      // );

      new notifier.NotificationCenter().notify({
        title: "CalenDraft",
        message: msg,
        icon: "C:\\SWE-Backup_v2\\logo\\shortcutLogo.png",
        silent: sound,
        subtitle: "User:" + name,
      });
      new notifier.NotifySend().notify({
        title: "CalenDraft",
        message: msg,
        icon: "C:\\SWE-Backup_v2\\logo\\shortcutLogo.png",
        silent: sound,
        subtitle: "User:" + name,
      });
      new notifier.WindowsToaster().notify({
        title: "CalenDraft",
        message: msg,
        icon: "C:\\SWE-Backup_v2\\logo\\shortcutLogo.png",
        silent: sound,
        subtitle: "User:" + name,
      });
      new notifier.Growl().notify({
        title: "CalenDraft",
        message: msg,
        icon: "C:\\SWE-Backup_v2\\logo\\shortcutLogo.png",
        silent: sound,
        subtitle: "User:" + name,
      });
    });
  } else if (repeat == "hourly") {
    const rule = new schedule.RecurrenceRule();
    rule.minute = date.getMinutes();
    rule.second = 0;
    const job = schedule.scheduleJob(id, rule, function () {
      console.log("The answer to life, the universe, and everything!");
      var mailOptions = {
        from: "team.calendraft@gmail.com",
        to: email,
        subject: "CalenDraft Reminder:" + msg,
        text:
          `Hi ` +
          name +
          `, this is a No-Reply mail to remind you about:` +
          msg +
          `.`,
      };
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
          ret = info.response;
        }
      });

      new notifier.NotificationCenter().notify({
        title: "CalenDraft",
        message: msg,
        icon: "C:\\SWE-Backup_v2\\logo\\shortcutLogo.png",
        silent: sound,
        subtitle: "User:" + name,
      });
      new notifier.NotifySend().notify({
        title: "CalenDraft",
        message: msg,
        icon: "C:\\SWE-Backup_v2\\logo\\shortcutLogo.png",
        silent: sound,
        subtitle: "User:" + name,
      });
      new notifier.WindowsToaster().notify({
        title: "CalenDraft",
        message: msg,
        icon: "C:\\SWE-Backup_v2\\logo\\shortcutLogo.png",
        silent: sound,
        subtitle: "User:" + name,
      });
      new notifier.Growl().notify({
        title: "CalenDraft",
        message: msg,
        icon: "C:\\SWE-Backup_v2\\logo\\shortcutLogo.png",
        silent: sound,
        subtitle: "User:" + name,
      });
    });
  } else if (repeat == "daily") {
    const rule = new schedule.RecurrenceRule();
    rule.hour = date.getHours();
    rule.minute = date.getMinutes();
    rule.second = 0;
    const job = schedule.scheduleJob(id, rule, function () {
      console.log("The answer to life, the universe, and everything!");
      var mailOptions = {
        from: "team.calendraft@gmail.com",
        to: email,
        subject: "CalenDraft Reminder:" + msg,
        text:
          `Hi ` +
          name +
          `, this is a No-Reply mail to remind you about:` +
          msg +
          `.`,
      };
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
          ret = info.response;
        }
      });

      new notifier.NotificationCenter().notify({
        title: "CalenDraft",
        message: msg,
        icon: "C:\\SWE-Backup_v2\\logo\\shortcutLogo.png",
        silent: sound,
        subtitle: "User:" + name,
      });
      new notifier.NotifySend().notify({
        title: "CalenDraft",
        message: msg,
        icon: "C:\\SWE-Backup_v2\\logo\\shortcutLogo.png",
        silent: sound,
        subtitle: "User:" + name,
      });
      new notifier.WindowsToaster().notify({
        title: "CalenDraft",
        message: msg,
        icon: "C:\\SWE-Backup_v2\\logo\\shortcutLogo.png",
        silent: sound,
        subtitle: "User:" + name,
      });
      new notifier.Growl().notify({
        title: "CalenDraft",
        message: msg,
        icon: "C:\\SWE-Backup_v2\\logo\\shortcutLogo.png",
        silent: sound,
        subtitle: "User:" + name,
      });
    });
  } else if (repeat == "weekly") {
    const rule = new schedule.RecurrenceRule();
    rule.dayOfWeek = date.getDay();
    rule.hour = date.getHours();
    rule.minute = date.getMinutes();
    rule.second = 0;
    const job = schedule.scheduleJob(id, rule, function () {
      console.log("The answer to life, the universe, and everything!");
      var mailOptions = {
        from: "team.calendraft@gmail.com",
        to: email,
        subject: "CalenDraft Reminder:" + msg,
        text:
          `Hi ` +
          name +
          `, this is a No-Reply mail to remind you about:` +
          msg +
          `.`,
      };
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
          ret = info.response;
        }
      });

      new notifier.NotificationCenter().notify({
        title: "CalenDraft",
        message: msg,
        icon: "C:\\SWE-Backup_v2\\logo\\shortcutLogo.png",
        silent: sound,
        subtitle: "User:" + name,
      });
      new notifier.NotifySend().notify({
        title: "CalenDraft",
        message: msg,
        icon: "C:\\SWE-Backup_v2\\logo\\shortcutLogo.png",
        silent: sound,
        subtitle: "User:" + name,
      });
      new notifier.WindowsToaster().notify({
        title: "CalenDraft",
        message: msg,
        icon: "C:\\SWE-Backup_v2\\logo\\shortcutLogo.png",
        silent: sound,
        subtitle: "User:" + name,
      });
      new notifier.Growl().notify({
        title: "CalenDraft",
        message: msg,
        icon: "C:\\SWE-Backup_v2\\logo\\shortcutLogo.png",
        silent: sound,
        subtitle: "User:" + name,
      });
    });
  } else if (repeat == "monthly") {
    const rule = new schedule.RecurrenceRule();
    rule.date = date.getDate();
    rule.dayOfWeek = date.getDay();
    rule.hour = date.getHours();
    rule.minute = date.getMinutes();
    rule.second = 0;
    const job = schedule.scheduleJob(id, rule, function () {
      console.log("The answer to life, the universe, and everything!");
      var mailOptions = {
        from: "team.calendraft@gmail.com",
        to: email,
        subject: "CalenDraft Reminder:" + msg,
        text:
          `Hi ` +
          name +
          `, this is a No-Reply mail to remind you about:` +
          msg +
          `.`,
      };
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
          ret = info.response;
        }
      });

      new notifier.NotificationCenter().notify({
        title: "CalenDraft",
        message: msg,
        icon: "C:\\SWE-Backup_v2\\logo\\shortcutLogo.png",
        silent: sound,
        subtitle: "User:" + name,
      });
      new notifier.NotifySend().notify({
        title: "CalenDraft",
        message: msg,
        icon: "C:\\SWE-Backup_v2\\logo\\shortcutLogo.png",
        silent: sound,
        subtitle: "User:" + name,
      });
      new notifier.WindowsToaster().notify({
        title: "CalenDraft",
        message: msg,
        icon: "C:\\SWE-Backup_v2\\logo\\shortcutLogo.png",
        silent: sound,
        subtitle: "User:" + name,
      });
      new notifier.Growl().notify({
        title: "CalenDraft",
        message: msg,
        icon: "C:\\SWE-Backup_v2\\logo\\shortcutLogo.png",
        silent: sound,
        subtitle: "User:" + name,
      });
    });
  }
}

function randomGen() {
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz0123456789";
  var lenString = 7;
  var id = "";

  for (var i = 0; i < lenString; i++) {
    var rnum = Math.floor(Math.random() * characters.length);
    id += characters.substring(rnum, rnum + 1);
  }
  return id;
}

function getCurrentName() {
  connection.query("SELECT * from temp", function (error, results, fields) {
    if (error) {
      throw error;
    }
    return results[0].name;
  });
}

app.use(passport.initialize());

require("./authenticate");

app.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/loginFailed" }),
  function (req, res) {
    // res.render("index",{reset: 2});

    // res.end('Logged in!');
    // res.redirect('/index.html');
    res.redirect(301, "http://localhost:8080/tempRedirect");
    res.end();
    // request.post('http://localhost:8080/tempRedirect')
    // res.render("index",{reset: 2});
  }
);

app.get("/tempRedirect", function (req, res) {
  console.log("Congratulations Login Successful");
  // res.render("login", { denied: 0});
  // res.render("landingPage");
  // res.sendFile(path.join(__dirname+'/landingPage.html'));
  connection.query("SELECT * FROM temp", function (error, results, fields) {
    if (error) {
      throw error;
    }
    name = results[0].name;
    // console.log('Here:',name);
    if (name == "Admin") {
      console.log("Here admin dashboard");
      // res.render("index",{reset:100});
      res.render("admin_dashboard", { name: "Admin" });
    } else if (name == "COE") {
      console.log("Here coe dashboard");
      // res.render("index",{reset:100});
      res.render("coe_dashboard");
    } else {
      res.render("dashboard_index", { name: name });
      res.end();
    }
  });
});

app.get("/", function (_, res) {
  console.log("Here");
  // res.render("index",{reset:100});
  res.sendFile(__dirname + "/HTML/index.html");
});

app.post("/login", function (req, res) {
  var temp1 = req.param("email", null);
  var temp2 = req.param("password", null);
  var email = temp1.toString();
  var password = temp2.toString();
  console.log(email);
  console.log(password);

  connection.query("SELECT * from users", function (error, results, fields) {
    if (error) {
      throw error;
    }

    // console.log(results);

    var length = results.length;
    var test = 0;
    var name = "";
    for (i = 0; i < length; i++)
      if (results[i].email == email && results[i].password == password) {
        test = 1;
        name = results[i].Name;
      }

    if (test == 1) {
      connection.query("DELETE FROM temp", function (error, results, fields) {
        if (error) {
          throw error;
        }
      });
      console.log(name, email);
      var sql1 = "INSERT INTO temp VALUES ('" + email + "', '" + name + "');";
      connection.query(sql1, function (error, results, fields) {
        if (error) {
          throw error;
        }
      });

      console.log("Congratulations Login Successful");
      // res.render("login", { denied: 0});
      // res.render("landingPage");
      // res.sendFile(path.join(__dirname+'/landingPage.html'));

      if (name == "Admin") {
        console.log("Here admin dashboard");
        // res.render("index",{reset:100});
        res.render("admin_dashboard", { name: "Admin" });
        res.end();
      } else if (name == "COE") {
        console.log("Here coe dashboard");
        // res.render("index",{reset:100});
        res.render("coe_dashboard");
        res.end();
      } else {
        res.render("dashboard_index", { name: name });
        res.end();
      }
    } else {
      console.log("Login Failed");
      res.render("login", { denied: 1 });
      res.end();
    }
  });
});

app.post("/reset1", function (req, res) {
  var temp1 = req.param("email", null);
  var email = temp1.toString();
  console.log("Reset Email:" + email);
  connection.query("SELECT * from users", function (error, results, fields) {
    if (error) {
      throw error;
    }

    var length = results.length;
    var test = 0;
    var index = 0;
    for (i = 0; i < length; i++) {
      if (results[i].email == email) {
        test = 1;
        index = i;
      }
    }

    if (test == 1) {
      connection.query("DELETE FROM temp", function (error, results, fields) {
        if (error) {
          throw error;
        }
      });
      var sql1 =
        "INSERT INTO temp VALUES ('" +
        email +
        "','" +
        results[index].name +
        "' );";
      connection.query(sql1, function (error, results, fields) {
        if (error) {
          throw error;
        }
      });
      console.log("Password Reset Request");
      var mailOptions = {
        from: "team.calendraft@gmail.com",
        to: email,
        subject: "CalenDraft Password Reset Link",
        text:
          `Hi ` +
          results[index].name +
          `, 
                          this is a No-Reply mail to reset your password.`,
        html: '<form action="http://localhost:8080/reset2" method="POST"><button type="submit" id="login" style="font-weight: bold;" class="btn btn-dark btn-block py-2">Reset Your Password</button></form>',
      };
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          res.render("index", { reset: 0 });
          res.end();
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
          res.render("index", { reset: 1 });
          res.end();
        }
      });
    } else {
      console.log("Email does not exist");
      res.render("reset1", { denied: 1 });
      res.end();
    }
  });
});

app.post("/reset2", function (req, res) {
  res.render("reset2", { denied: 2 });
  res.end();
});

app.post("/reset3", function (req, res) {
  var temp1 = req.param("password1", null);
  var temp2 = req.param("password2", null);
  var password1 = temp1.toString();
  var password2 = temp2.toString();
  if (password1 == password2) {
    connection.query("SELECT * from temp", function (error, results, fields) {
      if (error) {
        throw error;
      }

      email = results[0].email;
      var sql =
        "UPDATE users SET password ='" +
        password1 +
        "' WHERE email='" +
        email +
        "';";
      connection.query(sql, function (error, results, fields) {
        if (error) {
          throw error;
        }
        res.render("login", { denied: 4 });
        res.end();
      });
    });
  } else {
    res.render("reset2", { denied: 1 });
    res.end();
  }
});

app.post("/reminder", function (req, res) {
  radio = req.param("reminder", null);
  // console.log(radio);
  if (radio == "Add") {
    var date = new Date(req.param("date", null));
    time = req.param("time", null);
    msg = req.param("msg", null);
    temp = req.param("notification", null);
    repeat = req.param("repeat", null);
    sound = true;
    if (temp == "silent") {
      sound = false;
    }
    console.log(date, time.split(":"));
    day = date.getDate();
    month = date.getMonth();
    year = date.getFullYear();
    hour = time.split(":")[0];
    minutes = time.split(":")[1];
    console.log(day, month, year, hour, minutes);
    date = new Date(year, month, day, hour, minutes, 0);
    // console.log(date.toLocaleTimeString());

    var id = randomGen();

    connection.query("SELECT * from temp", function (error, results, fields) {
      if (error) {
        throw error;
        res.render("reminder", { reminderSent: 1 });
        res.end();
      }
      name = results[0].name;
      email = results[0].email;
      var sql1 =
        "INSERT INTO reminders VALUES ('" +
        email +
        "',DATE('" +
        year +
        "-" +
        (parseInt(month) + 1).toString() +
        "-" +
        day +
        "'),time('" +
        time +
        "'),'" +
        msg +
        "'," +
        sound +
        ",'" +
        name +
        "','" +
        repeat +
        "','" +
        id +
        "');";
      connection.query(sql1, function (error, results, fields) {
        if (error) {
          throw error;
        }
      });
      res.render("reminder", { deleted: 2 });
      setReminder(
        year,
        month,
        day,
        hour,
        minutes,
        msg,
        sound,
        name,
        email,
        repeat,
        id
      );
    });
  } else if (radio == "Del") {
    var date = req.param("reminders", null);
    console.log("input:" + date);
    arr = [];
    if (date.constructor === Array) {
      for (var i = 0; i < date.length; i++) {
        var temp = date[i].split("#")[0].split("T")[0];
        console.log("input:" + temp);
        var date2 = new Date(temp);
        date2.setDate(date2.getDate() + 1);
        var temp = date2.toISOString().split("T")[0];
        // var temp2 = temp.split("-");
        // console.log(temp2);
        // var val = parseInt(temp2[2]);
        // val = val + 1;
        // if (val < 10) {
        //   temp2[2] = "0" + String(val);
        // } else {
        //   temp2[2] = String(val);
        // }
        // var temp3 = temp2.join("-");
        // console.log(temp3);
        var temp4 = date[i].split("#")[1];
        arr.push([temp, temp4]);
      }
    } else {
      var temp = date.split("#")[0].split("T")[0];
      console.log("input:" + temp);
      var date2 = new Date(temp);
      date2.setDate(date2.getDate() + 1);
      var temp = date2.toISOString().split("T")[0];
      // var temp2 = temp.split("-");
      // console.log(temp2);
      // var val = parseInt(temp2[2]);
      // val = val + 1;
      // if (val < 10) {
      //   temp2[2] = "0" + String(val);
      // } else {
      //   temp2[2] = String(val);
      // }
      // var temp3 = temp2.join("-");
      // console.log(temp3);
      var temp4 = date.split("#")[1];
      arr.push([temp, temp4]);
    }

    console.log(arr);
    for (var i = 0; i < arr.length; i++) {
      var sql =
        "SELECT * FROM reminders WHERE date = '" +
        arr[i][0] +
        "' AND time = '" +
        arr[i][1] +
        "';";
      connection.query(sql, function (error, results, fields) {
        if (error) {
          throw error;
        }
        var id = results[0].id;
        var my_job = schedule.scheduledJobs[id];
        if (my_job == undefined) {
          console.log("No jobs");
        } else {
          my_job.cancel();
        }
      });
      var sql =
        "DELETE FROM reminders WHERE date = '" +
        arr[i][0] +
        "' AND time = '" +
        arr[i][1] +
        "';";
      connection.query(sql, function (error, results, fields) {
        if (error) {
          throw error;
        }
        var sql = "SELECT * FROM temp;";
        connection.query(sql, function (error, results, fields) {
          if (error) {
            throw error;
          }
          res.render("reminder", { deleted: 1, name: results[0].name });
        });
      });
    }
  }
});

//RECAPTCHA

// app.get('/', (_, res) => {
//   res.sendFile(__dirname + '/HTML/login.html');
// });
app.post("/subscribe", async (req, res) => {
  if (!req.body.captcha)
    return res.json({ success: false, msg: "Please select captcha" });

  // Secret key
  const secretKey = "6Ldg_HcaAAAAAKWDAF9jaovHVK3bdNUcVraPQuVC";
  //verify url
  const query = stringify({
    secret: secretKey,
    response: req.body.captcha,
    remoteip: req.connection.remoteAddress,
  });
  const verifyURL = `https://google.com/recaptcha/api/siteverify?${query}`;

  // Make a request to verifyURL
  const body = await fetch(verifyURL).then((res) => res.json());

  // If not successful
  if (body.success !== undefined && !body.success)
    return res.json({ success: false, msg: "Failed captcha verification" });

  // If successful
  return res.json({ success: true, msg: "Captcha passed" });
});
////////RECAPTCHA

app.post("/del_reminder", function (req, res) {
  connection.query("SELECT * from temp", function (error, results, fields) {
    if (error) {
      throw error;
    }
    var email = results[0].email;
    var sql1 = "SELECT * FROM reminders WHERE email = '" + email + "'";
    connection.query(sql1, function (error, results, fields) {
      if (error) {
        throw error;
      }
      res.send({ results: results });
    });
  });
});

app.post("/reminder_redirect", function (req, res) {
  console.log("reminder page");
  connection.query("SELECT * FROM temp", function (error, results, fields) {
    if (error) {
      throw error;
    }
    res.render("reminder", { deleted: 10, name: results[0].name });
  });
});

app.post("/calendar_redirect", function (req, res) {
  console.log("calendar page");
  connection.query("SELECT * FROM temp", function (error, results, fields) {
    if (error) {
      throw error;
    }
    res.render("dashboard_calendar", { name: results[0].name });
  });
});

app.post("/index_redirect", function (req, res) {
  console.log("index page");
  connection.query("SELECT * FROM temp", function (error, results, fields) {
    if (error) {
      throw error;
    }
    res.render("dashboard_index", { name: results[0].name });
  });
});

app.post("/login_redirect", function (req, res) {
  console.log("login page");
  res.render("login", { denied: 2 });
});

app.post("/show_calendar", function (req, res) {
  connection.query("SELECT * from temp", function (error, results, fields) {
    if (error) {
      throw error;
    }
    var name = results[0].email;
    mongo.connect(
      url,
      { useNewUrlParser: true, useUnifiedTopology: true },
      function (error, client) {
        assert.equal(null, error);

        try {
          const db = client.db("events");

          db.collection("events")
            .find({ name: name })
            .toArray(function (error, result) {
              if (result.length == 0) {
                mongo.connect(
                  url,
                  { useNewUrlParser: true, useUnifiedTopology: true },
                  function (error, client) {
                    assert.equal(null, error);

                    try {
                      const db = client.db("events");

                      var doc = { name: name, events: [] };
                      db.collection("events").insertOne(
                        doc,
                        function (err, res) {
                          if (err) throw err;
                          console.log("Record created.");
                          // close the connection to db when you are done with it
                          client.close();
                        }
                      );
                    } catch (err) {
                      console.log(err);
                      client.close();
                    }
                  }
                );
              }
            });

          db.collection("events")
            .find({ name: name })
            .toArray(function (error, result) {
              console.log("result from ap.js", result);
              client.close();
              console.log("end of app.js");
              try {
                res.send({ events: result[0].events });
              } catch (err) {
                console.log(err);
                res.send({ events: [] });
              }
            });
        } catch (err) {
          console.log(err);
          client.close();
        }
      }
    );
  });
});

function processData(allText) {
  var allTextLines = allText.split(/\r\n|\n/);
  var headers = allTextLines[0].split(",");
  var lines = [];

  for (var i = 1; i < allTextLines.length; i++) {
    var data = allTextLines[i].split(",");
    if (data.length == headers.length) {
      var tarr = [];
      for (var j = 0; j < headers.length; j++) {
        tarr.push(headers[j] + ":" + data[j]);
      }
      lines.push(tarr);
    }
  }
  // console.log(lines);
  return lines;
}

function createTTObj(lines) {
  tt = {};
  lines.forEach((element) => {
    temp = {};
    element.slice(1).forEach((ele) => {
      s = ele.split(":");
      temp[s[0]] = s[1];
    });
    tt[element[0].slice(1)] = temp;
  });
  return tt;
}

function createCalObj(lines) {
  cal = [];
  lines.forEach((element) => {
    temp = {};
    element.forEach((ele) => {
      s = ele.split(":");
      temp[s[0]] = s[1];
    });
    cal.push(temp);
  });
  return cal;
}

function createEvents(tt, cal) {
  startTime = {
    1: "09:00",
    2: "10:00",
    3: "11:00",
    4: "12:00",
    5: "14:00",
    6: "15:00",
    7: "16:00",
    8: "17:00",
  };
  endTime = {
    1: "10:00",
    2: "11:00",
    3: "12:00",
    4: "13:00",
    5: "15:00",
    6: "16:00",
    7: "17:00",
    8: "18:00",
  };
  events = [];
  cal.forEach((element) => {
    if (element["Working"] == "W") {
      tt_day = tt[element["Day"]];
      date = element["Date"].split("-");
      if (date[0].length < 2) {
        date[0] = "0" + date[0];
      }
      if (date[1].length < 2) {
        date[1] = "0" + date[1];
      }
      date = date[2] + "-" + date[0] + "-" + date[1];
      Object.keys(tt_day).forEach((key) => {
        title = tt_day[key];
        st = startTime[key];
        et = endTime[key];
        startDate = date + "T" + st + ":00";
        endDate = date + "T" + et + ":00";

        addedEventID = date + startDate + endDate + title;

        events.push({
          id: addedEventID,
          title: title,
          start: startDate,
          end: endDate,
        });
      });
    }
  });
  return events;
}

app.post("/populate_calendar", function (req, res) {
  console.log("here");
  tt = req.body.tt;
  tt = createTTObj(processData(tt));
  cal = req.body.cal;
  cal = createCalObj(processData(cal));
  new_events = createEvents(tt, cal);

  connection.query("SELECT * from temp", function (error, results, fields) {
    if (error) {
      throw error;
    }
    var name = results[0].email;
    mongo.connect(
      url,
      { useNewUrlParser: true, useUnifiedTopology: true },
      function (error, client) {
        assert.equal(null, error);

        try {
          const db = client.db("events");
          db.collection("events")
            .find({ name: name })
            .toArray(function (error, result) {
              evs = result[0].events;
              evs = evs.concat(new_events);
              db.collection("events").updateOne(
              {"name" : name},
              {$set: { "events" : evs}},function(error,result){
                if(error)
                  throw error;
                else{
                  client.close();
                  console.log("result from ap.js", result);
                  res.send({ret:1});
                }
              });

              var list = new_events;
                  
                  for(var i=0;i<list.length;i++){
                    console.log(list[i].id,list[i].start);
                    var date = new Date(list[i].start);
                    var id = list[i].id.toString().replace(list[i].start.toString(),date.toString());
                    addReminders(id,date,list[i].title);
                  }
                  console.log('Jobs:',schedule.scheduledJobs);
  
          });
        } catch (err) {
          console.log(err);
          client.close();
          res.send({ ret: 0 });
        }
      }
    );
  });
});

app.post("/populate_admin_calendar", function (req, res) {
  console.log("here");
  cal = req.body.cal;
  cal = createCalObj(processData(cal));
  startTime = "09:00";
  endTime = "18:00";
  events = [];
  cal.forEach((element) => {
    if (element["Working"] == "W") {
      date = element["Date"].split("-");
      if (date[0].length < 2) {
        date[0] = "0" + date[0];
      }
      if (date[1].length < 2) {
        date[1] = "0" + date[1];
      }
      date = date[2] + "-" + date[0] + "-" + date[1];
      title = "Working Day";
      st = startTime;
      et = endTime;
      startDate = date + "T" + st + ":00";
      endDate = date + "T" + et + ":00";

      addedEventID = date + startDate + endDate + title;

      events.push({
        id: addedEventID,
        title: title,
        start: startDate,
        end: endDate,
      });
    }
  });

  connection.query("SELECT * from temp", function (error, results, fields) {
    if (error) {
      throw error;
    }
    var name = results[0].email;
    mongo.connect(
      url,
      { useNewUrlParser: true, useUnifiedTopology: true },
      function (error, client) {
        assert.equal(null, error);

        try {
          const db = client.db("events");
          db.collection("events")
            .find({ name: name })
            .toArray(function (error, result) {
              evs = result[0].events;
              evs = evs.concat(events);
              db.collection("events").updateOne(
                { name: name },
                { $set: { events: evs } },
                function (error, result) {
                  if (error) throw error;
                  else {
                    client.close();
                    res.send({ ret: 1 });
                  }
                }
              );
            });
        } catch (err) {
          console.log(err);
          client.close();
          res.send({ ret: 0 });
        }
      }
    );
  });
});

app.post("/add_event_calendar", function (req, res) {
  ev = req.body.event;
  console.log("ev", ev);
  console.log("ev", ev.start);
  evdel = req.body.event._id;
  console.log("evdel", evdel);

  connection.query("SELECT * from temp", function (error, results, fields) {
    if (error) {
      throw error;
    }
    var name = results[0].email;
    mongo.connect(
      url,
      { useNewUrlParser: true, useUnifiedTopology: true },
      function (error, client) {
        assert.equal(null, error);

        try {
          const db = client.db("events");
          db.collection("events")
            .find({ name: name })
            .toArray(function (error, result) {
              evs = result[0].events;
              console.log("result", result);
              console.log("result[0]", result[0]);
              console.log("result[0].events", result[0].events);
              console.log("I am here");
              console.log("evs", evs);
              evs.push(ev);
              console.log("after push evs", evs);
              db.collection("events").updateOne(
                { name: name },
                { $set: { events: evs } },
                function (error, result) {
                  if (error) throw error;
                  else {
                    client.close();
                    res.send({ ret: 1 });
                  }
                }
              );

              console.log("result from ap.js", result);
              console.log(result[0].events);
              var list = result[0].events;

              for (var i = 0; i < list.length; i++) {
                console.log(list[i].id, list[i].start);
                var date = new Date(list[i].start);
                var id = list[i].id
                  .toString()
                  .replace(list[i].start.toString(), date.toString());
                addReminders(id, date, list[i].title);
              }
            });
        } catch (err) {
          console.log(err);
          client.close();
          res.send({ ret: 0 });
        }
      }
    );
  });
});

app.post("/remove_event_calendar", function (req, res) {
  ev = req.body.id;
  console.log("ev", ev);

  connection.query("SELECT * from temp", function (error, results, fields) {
    if (error) {
      throw error;
    }
    var name = results[0].email;
    mongo.connect(
      url,
      { useNewUrlParser: true, useUnifiedTopology: true },
      function (error, client) {
        assert.equal(null, error);

        try {
          const db = client.db("events");
          db.collection("events")
            .find({ name: name })
            .toArray(function (error, result) {
              //all events under (all records named roopa will be listed. Ever record named roopa is result[index]
              evs = result[0].events; //choosing the first record with name roopa
              //to_delete=db.AppointmentDiarys.Find(res);
              todel_index = -1;
              for (i = 0; i < evs.length; i++) {
                if (evs[i].id == ev) {
                  todel_index = i;
                }
              }
              console.log(todel_index);
              evs.splice(todel_index, 1);

              db.collection("events").updateOne(
                { name: name },
                { $set: { events: evs } },
                function (error, result) {
                  if (error) throw error;
                  else {
                    client.close();
                    res.send({ ret: 1 });
                  }
                }
              );

              ////////////////
              //db.events.remove( { _id: req.body.id } );
              console.log("removed from database");
            });
        } catch (err) {
          console.log(err);
          client.close();
          res.send({ ret: 0 });
        }
      }
    );
  });
});

app.post("/update_event_date_calendar", function (req, res) {
  ev = req.body.id;
  evtitle = req.body.tit;
  evstart = req.body.usd;
  evend = req.body.ued;
  newid = req.body.new_id;
  // console.log("ev",ev);
  // console.log("ev",evtitle);
  // console.log("ev",evstart);
  // console.log("ev",evend);
  // console.log("ev",newid);
  connection.query("SELECT * from temp", function (error, results, fields) {
    if (error) {
      throw error;
    }
    var name = results[0].email;
    mongo.connect(
      url,
      { useNewUrlParser: true, useUnifiedTopology: true },
      function (error, client) {
        assert.equal(null, error);

        try {
          const db = client.db("events");
          console.log("name", name);
          db.collection("events")
            .find({ name: name })
            .toArray(function (error, result) {
              //all events under (all records named roopa will be listed. Ever record named roopa is result[index]
              evs = result[0].events; //choosing the first record with name roopa
              console.log("in here!!!!");

              todel_index = -1;
              for (i = 0; i < evs.length; i++) {
                if (evs[i].id == ev) {
                  todel_index = i;
                  evs[i].id = newid;
                  evs[i].start = evstart;
                  evs[i].end = evend;
                }
              }
              console.log(todel_index);
              // //evs.splice(todel_index,1);

              db.collection("events").updateOne(
                { name: name },
                { $set: { events: evs } },
                function (error, result) {
                  if (error) throw error;
                  else {
                    client.close();
                    res.send({ ret: 1 });
                  }
                }
              );

              var list = result[0].events;

              for (var i = 0; i < list.length; i++) {
                console.log(list[i].id, list[i].start);
                var date = new Date(list[i].start);
                var id = list[i].id
                  .toString()
                  .replace(list[i].start.toString(), date.toString());
                addReminders(id, date, list[i].title);
              }

              console.log("updated into database");
            });
        } catch (err) {
          console.log(err);
          client.close();
          res.send({ ret: 0 });
        }
      }
    );
  });
});

app.post("/update_event_time_calendar", function (req, res) {
  ev = req.body.id;
  evtitle = req.body.tit;
  evstart = req.body.ust;
  evend = req.body.uet;
  newid = req.body.new_id;
  // console.log("ev",ev);
  // console.log("ev",evtitle);
  // console.log("ev",evstart);
  // console.log("ev",evend);
  // console.log("ev",newid);
  connection.query("SELECT * from temp", function (error, results, fields) {
    if (error) {
      throw error;
    }
    var name = results[0].email;
    mongo.connect(
      url,
      { useNewUrlParser: true, useUnifiedTopology: true },
      function (error, client) {
        assert.equal(null, error);

        try {
          const db = client.db("events");
          console.log("name", name);
          db.collection("events")
            .find({ name: name })
            .toArray(function (error, result) {
              //all events under (all records named roopa will be listed. Ever record named roopa is result[index]
              evs = result[0].events; //choosing the first record with name roopa
              console.log("in here!!!!");

              todel_index = -1;
              for (i = 0; i < evs.length; i++) {
                if (evs[i].id == ev) {
                  todel_index = i;
                  evs[i].id = newid;
                  evs[i].start = evstart;
                  evs[i].end = evend;
                }
              }
              console.log(todel_index);
              // //evs.splice(todel_index,1);

              db.collection("events").updateOne(
                { name: name },
                { $set: { events: evs } },
                function (error, result) {
                  if (error) throw error;
                  else {
                    client.close();
                    res.send({ ret: 1 });
                  }
                }
              );

              var list = result[0].events;

              for (var i = 0; i < list.length; i++) {
                console.log(list[i].id, list[i].start);
                var date = new Date(list[i].start);
                var id = list[i].id
                  .toString()
                  .replace(list[i].start.toString(), date.toString());
                addReminders(id, date, list[i].title);
              }

              console.log("updated into database");
            });
        } catch (err) {
          console.log(err);
          client.close();
          res.send({ ret: 0 });
        }
      }
    );
  });
});

app.get("/admin", function (_, res) {
  console.log("Here admin dashboard");
  // res.render("index",{reset:100});
  res.render("admin", { name: "Admin" });
});

app.get("/admin_add_user", function (_, res) {
  console.log("Here admin dashboard");
  // res.render("index",{reset:100});
  res.render("admin_add_user", { name: "Admin" });
});

app.get("/admin_delete_user", function (_, res) {
  console.log("Here admin dashboard");
  // res.render("index",{reset:100});
  res.render("admin_delete_user", { name: "Admin" });
});

app.get("/coe", function (_, res) {
  console.log("Here coe dashboard");
  // res.render("index",{reset:100});
  res.render("coe_dashboard");
});

app.post("/search_free_slots", function (req, res) {
  var info = req.body.info;
  var start = new Date(info.start + "Z");
  var end = new Date(info.end + "Z");
  console.log(info, start, end);
  var sql = "SELECT * FROM users WHERE Name LIKE '%" + info.Name + "%';";
  console.log(sql);
  connection.query(sql, function (error, results, fields) {
    if (error) {
      throw error;
    }
    console.log(results);
    var name = results[0].email;
    mongo.connect(
      url,
      { useNewUrlParser: true, useUnifiedTopology: true },
      function (error, client) {
        assert.equal(null, error);

        try {
          const db = client.db("events");
          db.collection("events")
            .find({ name: name })
            .toArray(function (error, result) {
              evs = result[0].events;
              op = [{ s: start, e: end }];
              evs.forEach((i) => {
                s1 = new Date(i.start);
                e1 = new Date(i.end);
                for (j = 0; j < op.length; j++) {
                  // console.log(j,s1,e1,op)
                  if (op[j].s < s1 && e1 < op[j].e) {
                    op.splice(j, 1, { s: op[j].s, e: s1 });
                    op.splice(j, 0, { s: e1, e: op[j].e });
                  } else if (op[j].s < s1 && s1 < op[j].e) {
                    op.splice(j, 1, { s: s1, e: op[j].e });
                  } else if (op[j].s < e1 && e1 < op[j].e) {
                    op.splice(j, 1, { s: e1, e: op[j].e });
                  }
                }
                // console.log(op);
              });
              res.send({ ret: 1, val: op });
            });
        } catch (err) {
          console.log(err);
          client.close();
          res.send({ ret: 0 });
        }
      }
    );
  });
});

app.post("/admin_view_reminders", function (req, res) {
  var name = req.param("userSel", null);
  console.log(name);
  var sql =
    "SELECT * FROM reminders WHERE email IN (SELECT email FROM users WHERE name ='" +
    name +
    "');";
  connection.query(sql, function (error, results, fields) {
    if (error) {
      throw error;
    }
    res.render("admin_view_reminders", { userData: results });
  });
});

app.post("/admin_view_users", function (req, res) {
  connection.query("SELECT * FROM users", function (error, results, fields) {
    if (error) {
      throw error;
    }
    res.render("admin_view_users", { userData: results });
  });
});

app.post("/admin_reminder_redirect", function (req, res) {
  console.log("Hello1");
  res.render("admin_view_reminders", { userData: [] });
});

app.post("/admin_users_redirect", function (req, res) {
  console.log("Hello2");
  res.render("admin_view_users", { userData: [] });
});

app.post("/admin_dashboard_redirect", function (req, res) {
  console.log("Hello2");
  res.render("admin_dashboard", { name: "Admin" });
});

app.post("/admin_calendar_redirect", function (req, res) {
  console.log("Hello2");
  res.render("admin_calendar", { name: "Admin" });
});

app.post("/get_user_names", function (req, res) {
  connection.query("SELECT * FROM users", function (error, results, fields) {
    if (error) {
      throw error;
    }
    res.send({ results: results });
  });
});

app.post("/admin_delete_user", function (req, res) {
  connection.query(
    "DELETE FROM users WHERE email ='" + req.body.email + "';",
    function (error, results, fields) {
      if (error) {
        res.render("admin_delete_user", {deleted: 2});
        throw error;
      }
      res.render("admin_delete_user", {deleted: 1});
    }
  );
});

app.post("/admin_add_user", function (req, res) {
  email = req.body.email;
  password = req.body.pwd;
  names = req.body.name;
  dob = req.body.dob;
  bg = req.body.bg;
  mobile = req.body.mobile;
  address = req.body.address;


  mongo.connect(url,{ useNewUrlParser: true, useUnifiedTopology: true },
    function (error, client) {
      assert.equal(null, error);
      try {
        const db = client.db("events");
        var myobj = { name: email, events: [] };
        db.collection("events").insertOne(myobj, function(err, res) {
          if (err) throw err;
          console.log("1 document inserted");
          client.close();
        });
      } catch (err) {
        console.log(err);
        client.close();
      }
    }
  );


  connection.query(
    "INSERT INTO users(email,password,Name,dob,bg,mobile, address) VALUES ('" +
      email +
      "','" +
      password +
      "','" +
      names +
      "','" +
      dob +
      "','" +
      bg +
      "','" +
      mobile +
      "','" +
      address +
      "');",
    function (error, results, fields) {
      if (error) {
        res.render("admin_add_user", {added : 2});
        throw error;
      }

     res.render("admin_add_user", {added : 1});
    }
  );
});

app.post("/coe_redirect", function(req,res){
  console.log('Hello3');
  res.render("coe_dashboard");
});

app.post("/coe_reminder_redirect", function(req,res){
  console.log('Hello3');
  res.render("coe_reminder", {deleted:3});
});

app.post("/coe_calendar_redirect", function(req,res){
  console.log('Hello3');
  res.render("coe_calendar");
});

app.post("/coe_assign_redirect", function(req,res){
  console.log('Hello3');
  res.render("coe_assign_faculty");
});

app.post("/admin_add_users_redirect", function(req,res){
  console.log('Hello4');
  res.render("admin_add_user", {added: 3});
});

app.post("/admin_del_users_redirect", function(req,res){
  console.log('Hello4');
  res.render("admin_delete_user", {deleted: 3});
});

app.get("/about_us.html", function(_,res){
  res.render("about_us");
});

app.listen(8080);
console.log("server listening in http://localhost:8080");

