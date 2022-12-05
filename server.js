const mongodb = require("mongodb").MongoClient;
const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
app.use(cors());
app.use(bodyParser.json());
const ObjectID = require('mongodb').ObjectID;

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/api", (req, res) => {
  try {
    mongodb.connect("mongodb://127.0.0.1:27017", (err, conn) => {
      if (err) throw err;
      const db = conn.db("demotf");
      const coll = db.collection("Student");
      coll
        .find()
        .toArray()
        .then((docs) => res.send(docs))

    });
  } catch (err) {
    console.log(err);
  }
});

app.post("/add", (req, res) => {
  try {
    mongodb.connect("mongodb://127.0.0.1:27017", (err, conn) => {
      if (err) throw err;
      const db = conn.db("demotf");
      const coll = db.collection("Student");
      const newData = req.body;
      coll.insertOne(newData);
    });
  } catch (err) {
    console.log(err);
  }
});


app.put("/:id", (req, res, next) => {
  mongodb.connect("mongodb://127.0.0.1:27017", (err, conn) => {
    if (err) throw err;
    const db = conn.db("demotf");
    const coll = db.collection("Student");
    coll.findOneAndUpdate({_id: ObjectID(req.params.id)}, {$set: req.body}, (error, data) => {
      if (error) {
        console.log(error)
      }
      else {
        res.json(data)
        console.log('Student updated successfully !')
      }
    })
  })
})

  app.listen(4000, () => console.log("Server listening"));
