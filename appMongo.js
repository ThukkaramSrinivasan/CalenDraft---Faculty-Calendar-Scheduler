var express = require('express');
var path = require('path');
var bodyParser = require("body-parser");
const { Pinpoint } = require('aws-sdk');
const mongo = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'testing';

var app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname+'/views'));
//app.use('/static', express.static('static'));
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/login',function(req,res){

    var temp1=req.param('email', null);
    var temp2=req.param('password', null);
    var email=temp1.toString();
    var password=temp2.toString();
    console.log(email);
    console.log(password);
    
    mongo.connect(url, {useUnifiedTopology: true, useNewUrlParser: true},function(err, client) {
        assert.equal(null, err);
        console.log("Connected correctly to server");
      
        const db = client.db(dbName);

        db.collection('users').find({ email: email }).toArray(function(err, result) {
            if (err) throw err;
            // console.log(result);
            if(result.length > 0){
                if(password == result[0].password.toString()){
                    console.log('Login Successfull')
                    res.render("login", { denied: 0});
                    res.end();
                }
                else{
                    console.log('Login Failed')
                    res.render("login", { denied: 1});
                    res.end();
                }
            }
            else{
                console.log('Login Failed')
                    res.render("login", { denied: 1});
                    res.end();
            }
            client.close();
          });


    });

})

app.listen(8080);
console.log("server listening in http://localhost:8080");