const mongodb = require("mongodb").MongoClient;
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.get("/api", (req, res) => {
    mongodb.connect("mongodb://127.0.0.1:27017", (err, conn) => {
        if (err) throw err;
        const db = conn.db("demotf");
        const coll = db.collection("Student");
        coll.find({}).toArray((err, docs) => {
            if (err) throw err;
            res.send(docs);
            console.log(docs)
        });
    });

});

app.post("/", (req, res) => {
    mongodb.connect("mongodb://127.0.0.1:27017", (err, conn) => {
        if (err) throw err;
        const db = conn.db("demotf");
        const coll = db.collection("Student");
        coll.insertOne({}).toArray((err, docs) => {
            if (err) throw err;
            res.send(docs);
            console.log(docs)
        });
    });

});


app.listen(3001, () => console.log("Server listening"));

