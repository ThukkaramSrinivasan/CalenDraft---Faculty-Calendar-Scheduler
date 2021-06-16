var mysql = require('mysql');
var nodemailer = require('nodemailer');
var passport = require('passport');
const Swal = require("sweetalert2");
const mongo = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017";
var assert = require("assert");
window.setImmediate = window.setTimeout;


function oauthdisplay(arg)
{   
    if(arg<0)
    {
        app.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/google/callback', passport.authenticate('google', { failureRedirect: '/loginFailed' }), function(req,res){
  // res.render("index",{reset: 2});

  // res.end('Logged in!');
  // res.redirect('/index.html');
  res.redirect(301, 'http://localhost:8080/tempRedirect');
  res.end();
  // request.post('http://localhost:8080/tempRedirect')
  // res.render("index",{reset: 2});
})

app.get('/tempRedirect', function(req,res){
  // console.log("Congratulations Login Successful");
  // res.render("login", { denied: 0});
  // res.render("landingPage");
  // res.sendFile(path.join(__dirname+'/landingPage.html'));
  connection.query('SELECT * FROM temp', function (error, results, fields) {
    if (error) {
        throw error;
    }
    name = results[0].name;
    // console.log('Here:',name);
    res.render("dashboard_index",{name:name});
    res.end();
  });
  
});
    }
    else{
        return true;
    }

    
}

function captchadisplay(verifyuser){
    if(verifyuser=='users@gmail.com')
    {
        if (!req.body.captcha)
    return res.json({ success: false, msg: 'Please select captcha' });

     // Secret key
  const secretKey = '6Ldg_HcaAAAAAKWDAF9jaovHVK3bdNUcVraPQuVC';
  //verify url
  const query = stringify({
    secret: secretKey,
    response: req.body.captcha,
    remoteip: req.connection.remoteAddress
  });
  const verifyURL = `https://google.com/recaptcha/api/siteverify?${query}`;

  // Make a request to verifyURL
  //const body = await fetch(verifyURL).then(res => res.json());

  // If not successful
  if (body.success !== undefined && !body.success)
    {return 'Failed captcha verification'
    return res.json({ success: false, msg: 'Failed captcha verification' });}

  // If successful
  else{
      return 'Captcha passed'
  return res.json({ success: true, msg: 'Captcha passed' });}
    }
    

return 1;

};



function ProcessExcel() {
    //Create a HTML Table element.
    var table = document.createElement("table");
    table.border = "1";
  
    //Add the header row.
    var row = table.insertRow(-1);
  
    //Add the header cells.
    var headerCell = document.createElement("TH");
    headerCell.innerHTML = "Day";
    row.appendChild(headerCell);
  
    var headerCell = document.createElement("TH");
    headerCell.innerHTML = "1";
    row.appendChild(headerCell);
  
    var headerCell = document.createElement("TH");
    headerCell.innerHTML = "2";
    row.appendChild(headerCell);
  
    var headerCell = document.createElement("TH");
    headerCell.innerHTML = "3";
    row.appendChild(headerCell);
  
    var headerCell = document.createElement("TH");
    headerCell.innerHTML = "4";
    row.appendChild(headerCell);
  
    var headerCell = document.createElement("TH");
    headerCell.innerHTML = "5";
    row.appendChild(headerCell);
  
    var headerCell = document.createElement("TH");
    headerCell.innerHTML = "6";
    row.appendChild(headerCell);
  
    var headerCell = document.createElement("TH");
    headerCell.innerHTML = "7";
    row.appendChild(headerCell);
  
    var headerCell = document.createElement("TH");
    headerCell.innerHTML = "8";
    row.appendChild(headerCell);
  
    return 0;
};

var connection = mysql.createConnection({
  host     : "localhost",
  user     : "root",
  password : "abc@123",
  port     : "3306",
  database: "calendraft",
  });

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'team.calendraft@gmail.com',
      pass: 'calendraft123'
    }
  });

//functionforjest checkcreds
function checkcredentials(temp1,temp2){
    var email=temp1.toString();
    var password=temp2.toString();
    
  
    connection.query('SELECT * from users', function (error, results, fields) {
        if (error) {
            throw error;
        }
        
        var length = results.length;
        var test=0;
        var name = '';
        for (i = 0; i < length; i++)
          if (results[i].email == email && results[i].password == password){
            test = 1;
            name = results[i].Name;
          }
    
        if (test == 1){
            connection.query('DELETE FROM temp', function (error, results, fields) {
                if (error) {
                    throw error;
                }
              });
              var sql1="INSERT INTO temp VALUES ('"+email+"', '"+name+"');"
              connection.query(sql1, function (error, results, fields) {
                if (error) {
                    throw error;
                }
              });     
            return 1;
        }
  
        else{  
            return 0;
  
        }
  
        }); //till here
        return 1;
  }

//Dashboard 
function dashboard(temp1,temp2){
    var email=temp1.toString();
    var password=temp2.toString();
    
  
    connection.query('SELECT * from users', function (error, results, fields) {
        if (error) {
            throw error;
        }
        
        var length = results.length;
        var test=0;
        var name = '';
        for (i = 0; i < length; i++)
          if (results[i].email == email && results[i].password == password){
            test = 1;
            name = results[i].Name;
          }
    
        if (test == 1){
            connection.query('DELETE FROM temp', function (error, results, fields) {
                if (error) {
                    throw error;
                }
              });
              var sql1="INSERT INTO temp VALUES ('"+email+"', '"+name+"');"
              connection.query(sql1, function (error, results, fields) {
                if (error) {
                    throw error;
                }
              });     
            return 1;
        }
  
        else{  
            return 0;
  
        }
  
        }); //till here
        return 1;
  }

//to check for other 2-5 test cases
  function validate(username,password)
        {
            var regx=/^([a-zA-Z0-9\.-]+)@([a-zA-Z0-9-]+).([a-z]{2,20})$/;
            if(username.trim()=="")
            {
                //alert("No blank values allowed!");
                
                return "No blank values allowed!";
            }
            else if(password.trim()=="")
            {
                //alert("No blank values allowed!");
                return "No blank values allowed!";
            }
            else if(password.trim().length<=5)
            {
                //alert("Password must be atleast 6 characters in length!!");
                return "Password must be atleast 6 characters in length!!";

            }
            else
            {
                return true;
            }
        }

function sendresetemail(temp1){
    var email=temp1.toString();
    connection.query('SELECT * from users', function (error, results, fields) {
        if (error) {
            throw error;
        }

        var length = results.length;
        var test=0;
        var name="";
        var index = 0;
        for (i = 0; i < length; i++){
          if (results[i].email == email){
            test = 1;
            index = i;
            name=results[i].Name;
          }
        }
    
        if (test == 1){
            connection.query('DELETE FROM temp', function (error, results, fields) {
                if (error) {
                    throw error;
                }
              });
              var sql1="INSERT INTO temp VALUES ('"+email+"', '"+name+"');"
            connection.query(sql1, function (error, results, fields) {
              if (error) {
                  throw error;
              }
            });
            var mailOptions = {
                from: 'team.calendraft@gmail.com',
                to: email,
                subject: 'CalenDraft Password Reset Link',
                text: `Hi `+results[index].name+`, 
                          this is a No-Reply mail to reset your password.`,
                html: '<form action="http://localhost:8080/reset2" method="POST"><button type="submit" id="login" style="font-weight: bold;" class="btn btn-dark btn-block py-2">Reset Your Password</button></form>'        
              };
            transporter.sendMail(mailOptions, function(error, info){
                if (error) {

                    return "error"

                } else {

                    return "Email sent"
                }
              });
        }

        else{

            return "Email does not exist"
        }

    });
    return 1;
}

function redirectEmail(temp1,temp2){

    var password1=temp1.toString();
    var password2=temp2.toString();
    if(password1 == password2){

        connection.query('SELECT * from temp', function (error, results, fields) {
            if (error) {
                throw error;
            }

            email = results[0].email
            var sql="UPDATE users SET password ='"+password1+"' WHERE email='"+email+"';";
            connection.query(sql, function (error, results, fields) {
                if (error) {
                    throw error;
                }
                return 1;
            });
        });

        
    }
    else{
        return "Passwords not equal";
    }
    return "Complete";
}
function insertnewrow(email,name){
    var sql1="INSERT INTO temp VALUES ('"+email+"', '"+name+"');"
            connection.query(sql1, function (error, results, fields) {
              if (error) {
                  //throw error;
                  return 0
              }
              return 1
            });
    return 3;
}

function reminder(){
    var temp = document.getElementById('div#input');
        temp = ('');         
        temp = ('\
        <br>\
        <div type = "row">\
        <label>Enter Date</label>\
        <input type="date" id = "date" name = "date" style = "border-radius: 5px"> </input>&emsp;\
        <label>Enter Time</label>\
        <input type="time" id = "time" name = "time" style = "border-radius: 5px"> </input>\
        </div>\
        <br>\
        <div type = "row">\
        <label>Reminder Message</label>\
        <input type = "text" id = "msg" name = "msg" style = "border-radius: 5px"></input>\
        </div>\
        <br\
        <div type = "row">\
        <label>Notification Type</label>\
        <input type="radio" name = "notification" id = "silent" value="silent">Silent</input>&emsp;\
        <input type="radio" name = "notification" id = "sound" value="sound">Sound</input><br> <br>\
        </div>\
        <br>\
        <input type="submit" value = "Save Reminder" style = "border-radius: 5px"></input>\
        ');
    return true;
}







function processData(allText){
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
  if(lines)
  return true
  else
  return false
}
async function remove_event(callback, id, names)
{
    ev=id

    mongo
    .connect(url, { useNewUrlParser: true, useUnifiedTopology: true}, function(error, client){
        assert.equal(null,error);

        try {
            const db = client.db("events");
            db.collection("events").find({'name':names}).toArray(function(error, result){ //all events under (all records named roopa will be listed. Ever record named roopa is result[index]
                evs = result[0].events; //choosing the first record with name roopa
                //to_delete=db.AppointmentDiarys.Find(res);
                todel_index=-1
                for( i=0;i<evs.length;i++)
                {
                  if (evs[i].id==ev)
                  {
                    todel_index=i
                  }
                }
                // console.log(todel_index);
                evs.splice(todel_index,1);

                db.collection("events").updateOne(
                  {"name" : names},
                  {$set: { "events" : evs}},function(error,result){
                    if(error)
                      throw error;
                    else{
                      client.close();
                      callback(1)

                    }
                  });

                ////////////////
                //db.events.remove( { _id: req.body.id } );
                // console.log("removed from database");
            });
          } catch (err) {
            // console.log(err);
            client.close();
            callback(0)  
          } 
        
    });
}

async function add_event(callback, id, title, start, end, names)
{
    ev={
        id:id,
        title:title,
        start:start,
        end:end
    }

    
    mongo
    .connect(url, { useNewUrlParser: true, useUnifiedTopology: true}, function(error, client){
        assert.equal(null,error);

        try {
            const db = client.db("events");
            db.collection("events").find({'name':names}).toArray(function(error, result){
            
              evs = result[0].events;
              // console.log("result",result);
              // console.log("result[0]",result[0]);
              // console.log("result[0].events",result[0].events);
              // console.log("I am here");
              // console.log("evs",evs);
              evs.push(ev);
              // console.log("after push evs",evs);
              db.collection("events").updateOne(
              {"name" : names},
              {$set: { "events" : evs}},function(error,result){
                if(error)
                  throw error;
                else{
                  client.close();
                  callback(1)
                }
              });

              // console.log("result from ap.js", result);
              //     console.log(result[0].events);
                  var list = result[0].events;
                  
                  for(var i=0;i<list.length;i++){
                    // console.log(list[i].id,list[i].start);
                    var date = new Date(list[i].start);
                    var id = list[i].id.toString().replace(list[i].start.toString(),date.toString());
                    
                  }

            });
          } catch (err) {
            // console.log(err);
            client.close();
            callback(0)    
          } 
        
    });
}

async function update_date(callback, id, title, start, end, newid,names)
{

    ev = id;
  evtitle=title;
  evstart=start;
  evend=end;
  newid=newid;

    mongo
    .connect(url, { useNewUrlParser: true, useUnifiedTopology: true}, function(error, client){
        assert.equal(null,error);

        try {
            const db = client.db("events");
            // console.log("name",names);
            db.collection("events").find({'name':names}).toArray(function(error, result){ //all events under (all records named roopa will be listed. Ever record named roopa is result[index]
                evs = result[0].events; //choosing the first record with name roopa
                // console.log("in here!!!!");
               
                todel_index=-1
                for( i=0;i<evs.length;i++)
                {
                  if (evs[i].id==ev)
                  {
                    todel_index=i
                    evs[i].id=newid
                    evs[i].start=evstart
                    evs[i].end=evend
                  }
                }
                // console.log(todel_index);
                // //evs.splice(todel_index,1);

                db.collection("events").updateOne(
                  {"name" : names},
                  {$set: { "events" : evs}},function(error,result){
                    if(error)
                      throw error;
                    else{
                      client.close();
                      callback(1)
                    }
                  });

                  var list = result[0].events;
                
                  for(var i=0;i<list.length;i++){
                    // console.log(list[i].id,list[i].start);
                    var date = new Date(list[i].start);
                    var id = list[i].id.toString().replace(list[i].start.toString(),date.toString());
                  }
                
                  

        
                // console.log("updated into database");
            });
          } catch (err) {
            // console.log(err);
            client.close();
            callback(0)    
          } 
        
    });
}

async function update_time(callback, id, title, start, end, newid,names)
{

    ev = id;
  evtitle=title;
  evstart=start;
  evend=end;
  newid=newid;

    mongo
    .connect(url, { useNewUrlParser: true, useUnifiedTopology: true}, function(error, client){
        assert.equal(null,error);

        try {
            const db = client.db("events");
            // console.log("name",names);
            db.collection("events").find({'name':names}).toArray(function(error, result){ //all events under (all records named roopa will be listed. Ever record named roopa is result[index]
                evs = result[0].events; //choosing the first record with name roopa
                // console.log("in here!!!!");
               
                todel_index=-1
                for( i=0;i<evs.length;i++)
                {
                  if (evs[i].id==ev)
                  {
                    todel_index=i
                    evs[i].id=newid
                    evs[i].start=evstart
                    evs[i].end=evend
                  }
                }
                // console.log(todel_index);
                // //evs.splice(todel_index,1);

                db.collection("events").updateOne(
                  {"name" : names},
                  {$set: { "events" : evs}},function(error,result){
                    if(error)
                      throw error;
                    else{
                      client.close();
                      callback(1) 
                    }
                  });

              
                var list = result[0].events;
                
                for(var i=0;i<list.length;i++){
                  // console.log(list[i].id,list[i].start);
                  var date = new Date(list[i].start);
                  var id = list[i].id.toString().replace(list[i].start.toString(),date.toString());
                }
                  
                  
        
                // console.log("updated into database");
            });
          } catch (err) {
            // console.log(err);
            client.close();
            callback(0)    
        } 
        
    });
}

async function show_calendar(callback, names)
{
    mongo.connect(
        url,
        { useNewUrlParser: true, useUnifiedTopology: true },
        function (error, client) {
          assert.equal(null, error);
    
          try {
            const db = client.db("events");
  
            db.collection("events").find({'name':names}).toArray(function(error, result){
              if(result.length == 0){
                mongo.connect(
                  url,
                  { useNewUrlParser: true, useUnifiedTopology: true },
                  function (error, client) {
                    assert.equal(null, error);
                
                    try {
                      const db = client.db("events");
                      
                      var doc = { name: names, events: [] };
                      db.collection("events").insertOne(doc, function(err, res) {
                        if (err) throw err;
                        // console.log("Record created.");
                        // close the connection to db when you are done with it
                        client.close();
                      });
                    } catch (err) {
                      // console.log(err);
                      client.close();
                    }
                  }
                );
              }
            });
  
            db.collection("events").find({ name: names }).toArray(function (error, result) {
                // console.log("result from ap.js", result);
                client.close();
                // console.log("end of app.js");
                try{
                  callback(1)
                }
                catch (err){
                  // console.log(err);
                  callback(0)
                }
                
              });
          } catch (err) {
            // console.log(err);
            client.close();
          }
        });
}


async function search_free_slots(callback,start, end, names)
{
    start = new Date(start + "Z");
    end = new Date(end + "Z");
    mongo.connect(
      url,
      { useNewUrlParser: true, useUnifiedTopology: true },
      function (error, client) {
        assert.equal(null, error);
  
        try {
          const db = client.db("events");
          db.collection("events")
            .find({ name: names })
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
              callback(1)
            });
        } catch (err) {
          // console.log(err);
          client.close();
          callback(0)
        }
      }
    );
  
    // res.send({ret:1, val:"Hello"});
  };

// async function addReminders(callback,id,date,msg)
// {
//     var d = new Date();
//   var min = d.getTime();
//   var date = new Date(date);
//   console.log('addReminders:',id,date,jobs());
//   var minDate = date.getTime();
//   if(+d <= +date){
//     if((minDate-min) > 300000){
//       date.setMinutes(date.getMinutes()-5);
//       msg = msg + ' event in 5 minutes';
//     }
//     else{
//       msg = msg + ' event in '+(date.getMinutes()-d.getMinutes()-1).toString()+'minutes';
//       date = new Date();
//       date.setMinutes(date.getMinutes()+1);
//     }
//   }
//   var arr = jobs();
//   console.log(arr);
//   if(!(id in arr)){
//     const job = schedule.scheduleJob(id,date, function () {
//       console.log('Job Here');
//       new notifier.NotificationCenter().notify({
//         title: "CalenDraft",
//         message: msg,
//         silent: true
//           });
//       new notifier.NotifySend().notify({
//         title: "CalenDraft",
//         message: msg,
//         silent: true
//       });
//       new notifier.WindowsToaster().notify({
//         title: "CalenDraft",
//         message: msg,
//         silent: true
//       });
//       new notifier.Growl().notify({
//         title: "CalenDraft",
//         message: msg,
//         silent: true
//       });
//     });
//   }
//   console.log('J0bs',schedule.scheduledJobs);
// }


const functions={
    checkcredentials: checkcredentials,
    validate: validate,
    sendresetemail: sendresetemail,
    insertnewrow: insertnewrow,
    redirectEmail: redirectEmail,
    dashboard:dashboard,
    ProcessExcel:ProcessExcel,
    reminder:reminder,
    captchadisplay:captchadisplay,
    oauthdisplay:oauthdisplay,
    processData:processData,
    remove_event:remove_event,
    add_event:add_event,
    update_date:update_date,
    update_time:update_time,
    show_calendar:show_calendar,
    search_free_slots:search_free_slots,
    // addReminders:addReminders
}

module.exports=functions;