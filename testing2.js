var mysql = require("mysql");
var express = require("express");
var passport = require("passport");
var path = require("path");
var request = require("request");
var bodyParser = require("body-parser");
const toast = require('powertoast');
const webpush = require("web-push");
const Swal = require("sweetalert2");
const { Pinpoint, SageMakerFeatureStoreRuntime, CostExplorer } = require("aws-sdk");
var nodemailer = require("nodemailer");
const schedule = require("node-schedule");
const mongo = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017";
var assert = require("assert");
const notifier = require('node-notifier');


mongo.connect(url,{ useNewUrlParser: true, useUnifiedTopology: true },
  function (error, client) {
    assert.equal(null, error);
    try {
      const db = client.db("events");
      var myobj = { name: "Testing123", events: [] };
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


// var date = new Date('2021-05-31');
// date.setDate(date.getDate()+1);
// console.log(date.toISOString().split('T')[0]);

// var date = new Date();
// date.setMinutes(date.getMinutes()-30);
// console.log(date.toString())


// function jobs(){
//   var list = schedule.scheduledJobs;
//   console.log(list);
//   var arr = [];
//   for(var key in list){
//     arr.push(list[key].name);
//   }
//   return arr
// }

// function addReminders(id,date,msg){
//   var arr = jobs();
//   if(!(id in arr)){
//     const job = schedule.scheduleJob(id,date, function () {
//       console.log('Here');
//       new notifier.NotificationCenter().notify({
//         title: "CalenDraft",
//         message: msg,
//         icon: "C:\\SWE-Backup_v2\\logo\\shortcutLogo.png",
//         silent: sound
//           });
//     });
//   }
// }


// mongo.connect(
//   url,
//   { useNewUrlParser: true, useUnifiedTopology: true },
//   function (error, client) {
//     assert.equal(null, error);

//     try {
//       const db = client.db("events");

//       db.collection("events").find({ name: 'csainath0210@gmail.com' }).toArray(function (error, result) {
//           console.log("result from ap.js", result);
//           client.close();
//           console.log(result[0].events);
//           var list = result[0].events;
          
//           for(var i=0;i<list.length;i++){
//             console.log(list[i].id,list[i].start);
//             addReminders(list[i].id,list[i].start,list[i].title);
//           }
//         });
//     } catch (err) {
//       console.log(err);
//       client.close();
//     }
//   });

//   var temp = jobs();
//   console.log(temp);
      

// new notifier.NotificationCenter().notify({
//   title: "CalenDraft",
//   message: msg,
//   icon: "C:\\SWE-Backup_v2\\logo\\shortcutLogo.png",
//   silent: sound,
//   subtitle: "User:"+name
//     });
// new notifier.NotifySend().notify({
//   title: "CalenDraft",
//   message: msg,
//   icon: "C:\\SWE-Backup_v2\\logo\\shortcutLogo.png",
//   silent: sound,
//   subtitle: "User:"+name
// });
// new notifier.WindowsToaster().notify({
//   title: "CalenDraft",
//   message: msg,
//   icon: "C:\\SWE-Backup_v2\\logo\\shortcutLogo.png",
//   silent: sound,
//   subtitle: "User:"+name
// });
// new notifier.Growl().notify({
//   title: "CalenDraft",
//   message: msg,
//   icon: "C:\\SWE-Backup_v2\\logo\\shortcutLogo.png",
//   silent: sound,
//   subtitle: "User:"+name
// });




// notifier.notify(
//   {
//     title: "CalenDraft",
//     message: msg,
//     icon: "C:\\SWE-Backup_v2\\logo\\shortcutLogo.png",
//     silent: sound,
//     subtitle: "User:"+name
//   }
// );

// var date = new Date("Sat Jun 5 2021 22:00:00 GMT+0530 (India Standard Time)")
// // console.log(d.getUTCDate())
// const job = schedule.scheduleJob(date, function () {
//   console.log('Here');
// });
// var arr = jobs();
// console.log(arr);
// var list = schedule.scheduledJobs;
// console.log(list)
// console.log('Date=',date)
// for(var key in list){
//   var temp = list[key].name.split(' ');
//   var temp2 = temp[temp.length-1].split('>')[0].split('Z')[0];
//   console.log(temp2)
//   var d = new Date(temp2);
//   console.log(d.toString());
// }


// function randomGen(){
//   var characters = "ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz0123456789";
// 	  var lenString = 7;
// 	  var id = '';

// 	  for (var i=0; i<lenString; i++) {
// 	  	var rnum = Math.floor(Math.random() * characters.length);
// 	  	id += characters.substring(rnum, rnum+1);
// 	  }
//     return id;
// }

// console.log(randomGen())

// const date = new Date(2021, 05, 30, 20, 30, 0);
// const job = schedule.scheduleJob('2CNZXmL',date, function () {
//   console.log("The answer to life, the universe, and everything!");
  
//     toast({
//       title: "CalenDraft",
//       message: 'msg',
//       icon: "C:\\SWE-Backup_v2\\logo\\shortcutLogo.png",
//       silent: 1,
//       attribution: "User:"+'testing'
//     }).catch((err) => { 
//       console.error(err);
//     });
    
// });

// var list = schedule.scheduledJobs['2CNZXmL'];
// if(list == undefined){
//   console.log('yup');
// }
// else{
// console.log(list);
// }

// var my_job = schedule.scheduledJobs['2CNZXmL'];
// console.log(my_job.name)
// my_job.cancel();

// var characters = "ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz0123456789";
// 	var lenString = 7;
// 	var randomstring = '';

// 	for (var i=0; i<lenString; i++) {
// 		var rnum = Math.floor(Math.random() * characters.length);
// 		randomstring += characters.substring(rnum, rnum+1);
// 	}

// 	console.log(randomstring);


// mongo.connect(url, { useNewUrlParser: true, useUnifiedTopology: true}, function(error, client){
//   assert.equal(null,error);
//   try {
//     const db = client.db("events");
//     db.collection("events").find({'name':"user@gmail.com"}).toArray(function(error, result){
//       console.log(result.length)
//       if(result.length == 0){
//         mongo.connect(url,{ useNewUrlParser: true, useUnifiedTopology: true },
//           function (error, client) {
//             assert.equal(null, error);
        
//             try {
//               const db = client.db("events");
              
//               var doc = { name: "user@gmail.com", events: [] };
//               db.collection("events").insertOne(doc, function(err, res) {
//                 if (err) throw err;
//                 console.log("Record created.");
//                 // close the connection to db when you are done with it
//               });
//             } catch (err) {
//               console.log(err);
//             }
//           }
//         );
//       }
//      });
//       } catch (err) {
//       console.log(err);
//       client.close(); 
//     } 
// });



// mongo.connect(
//   url,
//   { useNewUrlParser: true, useUnifiedTopology: true },
//   function (error, client) {
//     assert.equal(null, error);

//     try {
//       const db = client.db("events");

    //   db.collection("events").find({'name':"Hello"}).toArray(function(error, result){
    //     // evs = result[0].events;
    //     console.log("result",result.length);
    //     console.log("result[0]",result[0]);
    //     // console.log("result[0].events",result[0].events);
    //     console.log("I am here");
    //     // console.log("evs",evs);
    //     // console.log("after push evs",evs);
    //     // db.collection("events").updateOne(
    //     // {"name" : "Testing"},
    //     // {$set: { "events" : evs}},function(error,result){
    //     //   if(error)
    //     //     throw error;
    //     //   else{
    //     //     client.close();
    //     //   }
    //     // });

    // });
      
    // var doc = { name: "Testing", events: [] };
    //   db.collection("events").insertOne(doc, function(err, res) {
    //     if (err) throw err;
    //     console.log("Document inserted");
    //     // close the connection to db when you are done with it
    //     client.close();
    //   });

      // db.collection("events")
      //   .find({ name: name })
      //   .toArray(function (error, result) {
      //     console.log("result from ap.js", result);
      //     client.close();
      //     console.log("end of app.js");
      //     res.send({ events: result[0].events });
      //   });
//     } catch (err) {
//       console.log(err);
//       client.close();
//     }
//   }
// );


// const toast = require('powertoast');

// const schedule = require('node-schedule');
// const date = new Date(2021, 3, 6, 23, 39, 0);

// const job = schedule.scheduleJob(date, function(){
//   console.log('The answer to life, the universe, and everything!');
// });

// console.log(date.toDateString());

// toast({
//   title: "CalenDraft",
//   message: "Reminder",
//   icon: "C:\\SWE-Backup_v2\\logo\\shortcutLogo.png",
//   silent: false
// }).catch((err) => { 
//   console.error(err);
// });