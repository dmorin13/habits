const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
// var mongoose = require('mongoose');
var port = process.env.PORT || 8666;
// var configDB = require('./config/database.js');
//global
// var db, collection;

const url ='mongodb+srv://dmorin15:F1yGrKWSTli8lbil@cluster0.gfs2s.mongodb.net/habits?retryWrites=true&w=majority'
const dbName = "habits";
//higher order function

//USE MONGOOSE TO RECONFIG THIS "LISTEN METHOD" TO ACCOMODATE REMOTE HEROKU PORT #?!
app.listen(port, () => {
   MongoClient.connect(
     url,
     {useNewUrlParser:true, useUnifiedTopology:true},
     (error, client) => {
       if (error) {
         throw error;
       }
       db = client.db(dbName);
       console.log("Connected to `" + dbName + "`!");
     }
   );
 });


// mongoose.set('useNewUrlParser', true);
// mongoose.set('useUnifiedTopology', true);

// // configuration ===============================================================
// mongoose.connect(configDB.url, (err, database) => {
//   if (err) return console.log(err)
//   db = database
//   console.log('Assigning Routes...')
//   require('./server.js')(app, db);
// }); // connect to our database



app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
//client side static files are accessible/ public?
app.use(express.static("public"));

app.get("/", (req, res) => {
  db.collection("habitList")
    .find()
    .toArray((err, habitList) => {
      if (err) return console.log(err);
      console.log({habitList})
      res.render("index.ejs", {habitList});
    });
});

app.post("/habitList", (req, res) => {
  const newHabit = {
    habit: req.body.habit
  };
  
  db.collection("habitList").insertOne(
    //is this the right place to declare these properties ? 
    newHabit, {starred: false, checked: false},
    (err, result) => {
      if (err) return console.log(err);
      console.log("saved to database");
      res.redirect("/");
    }
  );
});

app.put("/habitList", (req, res) => {
  console.log(req.body.starred)
  db.collection("habitList").findOneAndUpdate(
    {habit: req.body.habit},
    {
      $set: {
        'starred': req.body.starred,
      }
    },

    (err, result) => {
      if (err) return res.send(err);
      res.send(result);
    }
    
  );
});
app.put("/editHabitList", (req, res) => {
  db.collection("habitList").findOneAndUpdate(
    {habitList: req.body.habit},
    {'checked': req.body.checked},
    {
      $set: {
        'checked': true ,
      },
    },

    (err, result) => {
      if (err) return res.send(err);
      res.send(result);
    }
    
  );
});


app.delete("/deleteHabit", (req, res) => {
  db.collection('habitList').findOneAndDelete(
    {habit: req.body.habit},
    (err, result) => {
      if (err) return res.send(500, err);
      res.send("Habit deleted!");
    })
});


//  app.listen(port);
//  console.log('The magic happens on port ' + port)