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
