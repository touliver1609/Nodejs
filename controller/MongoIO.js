var insertChair = function(db, callback, filter, data, person) {
  const collection = db.collection("ghe");
  collection.updateOne(
    { vitri: filter },
    {
      $set: { trangthai: data },
      $set: { nguoidat: person }
    },
    function(err, result) {
      console.log("Inserted 1 documents into the collection");
      callback(); //=> None bocking
    }
  );
};
var updateChair = function(db, callback, filter, person, phone) {
  var cursor = db.collection("ghe").updateOne(
    { vitri: filter }, //=> Filter
    {
      $set: { nguoidat: person, dienthoai: phone }
    },
    function(err, results) {
      callback();
    }
  );
};

var updateChairByPerson = function(db, callback, filter, data, phone) {
  var cursor = db.collection("ghe").updateOne(
    { vitri: filter }, //=> Filter
    {
      $set: { trangthai: "roi", nguoidat: data, dienthoai: phone } //=> Update
    },
    function(err, results) {
      callback();
    }
  );
};

var getAllChair = function(db, callback, data) {
  var cursor = db.collection("ghe").find();
  cursor.each(function(err, doc) {
    if (doc != null) {
      data.push(doc); //=> Push student info into array
      console.log(doc);
    } else {
      callback();
    }
  });
};

var findChair = function(db, callback, filter, data) {
  var cursor = db.collection("ghe").find({ trangthai: filter });
  cursor.each(function(err, doc) {
    if (doc != null) {
      data.push(doc);
    } else {
      callback();
    }
  });
};

var findChairViTri = function(db, callback, filter, data) {
  console.log(filter);
  var cursor = db.collection("ghe").find({ vitri: filter });
  cursor.each(function(err, doc) {
    if (doc != null) {
      data.push(doc);
      console.log(doc);
    } else {
      console.log(1);
      callback();
    }
  });
};

var deleteChair = function(db, callback, filter) {
  var cursor = db.collection("ghe").updateOne(
    { vitri: filter }, //=> Filter
    {
      $set: { trangthai: "chua", nguoidat: "", dienthoai: "" }
    },
    function(err, results) {
      callback();
    }
  );
};

exports.updateChairByPerson = updateChairByPerson;
exports.insertChair = insertChair;
exports.getAllChair = getAllChair;
exports.findChair = findChair;
exports.findChairViTri = findChairViTri;
exports.updateChair = updateChair;
exports.deleteChair = deleteChair;
