const mongo = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'testing';

// Use connect method to connect to the Server
mongo.connect(url, {useUnifiedTopology: true, useNewUrlParser: true},function(err, client) {
  assert.equal(null, err);
  console.log("Connected correctly to server");

  const db = client.db(dbName);

  // Insert a single document

  // db.collection('inserts').insertOne({a:1}, function(err, r) {
  //   assert.equal(null, err);
  //   assert.equal(1, r.insertedCount);

    // Insert multiple documents
    db.collection('users').insertMany([{email:'user@gmail.com',password:'user123'}, {email:'admin@gmail.com',password:'admin123'}], function(err, r) {
      assert.equal(null, err);
      assert.equal(2, r.insertedCount); 

      client.close();
    });
  // });
});


$('#create_acc_bt').on('click', function () {

  console.log("INSIDE CREATE ACCOUNT");
  var disp = $('#create_acc_disp_msg');
  disp.html('');

  var n1 = document.getElementById("cr_name").value;
  var user1 = document.getElementById("cr_username").value;
  var psw1 = document.getElementById("cr_psw1").value;
  var psw2 = document.getElementById("cr_psw2").value;
  var univ = document.getElementById("cr_univ").value;
  var roll = document.getElementById("cr_roll").value;
  var sec_q = document.getElementById("cr_sec_q").value;
  var sec_ans = document.getElementById("cr_sec_ans").value;

              console.log(n1);
      console.log(user1);
      console.log(psw1);
      console.log(psw2);
      console.log(univ);
      console.log(roll);
      console.log(sec_q);
      console.log(sec_ans);
  

  if(n1=="")
  {
      disp.html('');
      disp.append("Please enter your name");
  }
  else if(user1=="")
  {
      disp.html('');
      disp.append("Please enter the username");
  }
  else if(psw1=="")
  {
      disp.html('');
      disp.append("Please enter the password");
  }
  else if(psw2=="")
  {
      disp.html('');
      disp.append("Please Re-enter the password");
  }
  else if(univ=="")
  {
      disp.html('');
      disp.append("Please enter your university");
  }
  else if(roll=="")
  {
      disp.html('');
      disp.append("Please enter your roll-number");
  }
  else if(sec_q=="")
  {
      disp.html('');
      disp.append("Please select the security question");
  }
  else if(sec_ans=="")
  {
      disp.html('');
      disp.append("Please enter the security answer");
  }
  else
  {
  }
});