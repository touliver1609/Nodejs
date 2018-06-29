var express = require("express");
var app = express();
var MongoClient = require("mongodb").MongoClient;
var mongoIO = require("./controller/MongoIO");
var bodyParser = require("body-parser");
const url = "mongodb://phat3:123456A.@ds219181.mlab.com:19181/listuser";

const dbName = "listuser";
app.use(bodyParser.json());

//API
//Get all
app.get("/", function(req, res) {
  var data = [];
  var dataJson; //data response
  MongoClient.connect(
    url,
    function(err, client) {
      const db = client.db(dbName);
      mongoIO.getAllChair(
        db,
        function() {
          //object to json
          dataJson = JSON.stringify({
            data: data
          });

          res.send(dataJson); //=> response body
          res.end();
        },
        data
      );
      client.close();
    }
  );
});

app.get("/search", function(req, res) {
  console.log("Search chair with trangthai");
  let data = [];
  var dataJson;
  MongoClient.connect(
    url,
    function(err, client) {
      const db = client.db(dbName);
      mongoIO.findChair(
        db,
        function() {
          // Callback
          dataJson = JSON.stringify({
            data: data
          });
          client.close();
          res.send(dataJson);
          res.end();
        },
        "chua",
        data
      );
    }
  );
});

app.get("/:chair", function(req, res) {
  console.log("Search chair with vitri");
  var data = [];
  var dataJson;
  var filter = parseInt(req.params.chair);

  MongoClient.connect(
    url,
    function(err, client) {
      const db = client.db(dbName);
      console.log(filter);
      mongoIO.findChairViTri(
        db,
        function() {
          // Callback
          dataJson = JSON.stringify({
            data: data
          });
          client.close();
          console.log(filter);
          res.send(dataJson);
          res.end();
        },
        filter,
        data
      );
    }
  );
});

app.post("/add", bodyParser.urlencoded({ extended: false }), function(
  req,
  res
) {
  console.log("Add chair info");
  //insert into mongo database
  var filter = parseInt(req.body.vitri);
  var person = req.body.nguoidat;
  var phone = req.body.dienthoai;
  MongoClient.connect(
    url,
    function(err, client) {
      const db = client.db(dbName);
      mongoIO.updateChairByPerson(
        db,
        function() {
          res.send("Successful");
          res.end();
        },
        filter,
        person,
        phone
      );
      client.close();
    }
  );
});

app.put("/update", bodyParser.urlencoded({ extended: false }), function(
  req,
  res
) {
  console.log("Update chair info ");
  var filter = parseInt(req.body.vitri);
  var person = req.body.nguoidat;
  var phone = req.body.dienthoai;
  MongoClient.connect(
    url,
    function(err, client) {
      const db = client.db(dbName);
      mongoIO.updateChair(
        db,
        function() {
          client.close();
          res.send("Successful");
          res.end();
        },
        filter,
        person,
        phone
      );
    }
  );
});

app.delete("/delete", bodyParser.urlencoded({ extended: false }), function(
  req,
  res
) {
  var filter = parseInt(req.body.vitri);
  MongoClient.connect(
    url,
    function(err, client) {
      const db = client.db(dbName);
      mongoIO.deleteChair(
        db,
        function() {
          client.close();
          res.send("Successful");
          res.end();
        },
        filter
      );
    }
  );
});

app.listen(9001, function() {
  console.log("Server is listening port 9001");
});
