const mongo = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017";
var assert = require("assert");
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
                console.log(todel_index);
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
                console.log("removed from database");
            });
          } catch (err) {
            console.log(err);
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
              console.log("result",result);
              console.log("result[0]",result[0]);
              console.log("result[0].events",result[0].events);
              console.log("I am here");
              console.log("evs",evs);
              evs.push(ev);
              console.log("after push evs",evs);
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

              console.log("result from ap.js", result);
                  console.log(result[0].events);
                  var list = result[0].events;
                  
                  for(var i=0;i<list.length;i++){
                    console.log(list[i].id,list[i].start);
                    var date = new Date(list[i].start);
                    var id = list[i].id.toString().replace(list[i].start.toString(),date.toString());
                    
                  }

            });
          } catch (err) {
            console.log(err);
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
            console.log("name",names);
            db.collection("events").find({'name':names}).toArray(function(error, result){ //all events under (all records named roopa will be listed. Ever record named roopa is result[index]
                evs = result[0].events; //choosing the first record with name roopa
                console.log("in here!!!!");
               
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
                console.log(todel_index);
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
                    console.log(list[i].id,list[i].start);
                    var date = new Date(list[i].start);
                    var id = list[i].id.toString().replace(list[i].start.toString(),date.toString());
                  }
                
                  

        
                console.log("updated into database");
            });
          } catch (err) {
            console.log(err);
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
            console.log("name",names);
            db.collection("events").find({'name':names}).toArray(function(error, result){ //all events under (all records named roopa will be listed. Ever record named roopa is result[index]
                evs = result[0].events; //choosing the first record with name roopa
                console.log("in here!!!!");
               
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
                console.log(todel_index);
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
                  console.log(list[i].id,list[i].start);
                  var date = new Date(list[i].start);
                  var id = list[i].id.toString().replace(list[i].start.toString(),date.toString());
                }
                  
                  
        
                console.log("updated into database");
            });
          } catch (err) {
            console.log(err);
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
                        console.log("Record created.");
                        // close the connection to db when you are done with it
                        client.close();
                      });
                    } catch (err) {
                      console.log(err);
                      client.close();
                    }
                  }
                );
              }
            });
  
            db.collection("events").find({ name: names }).toArray(function (error, result) {
                console.log("result from ap.js", result);
                client.close();
                console.log("end of app.js");
                try{
                  callback(1)
                }
                catch (err){
                  console.log(err);
                  callback(0)
                }
                
              });
          } catch (err) {
            console.log(err);
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
          console.log(err);
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
    remove_event:remove_event,
    add_event:add_event,
    update_date:update_date,
    update_time:update_time,
    show_calendar:show_calendar,
    search_free_slots:search_free_slots,
    // addReminders:addReminders
}



module.exports=functions;