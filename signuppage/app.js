var express = require("express");
// var url = require("./url")
var app = express();
// var url = 'mongodb://localhost:27017/node-demo';
var url =
  "mongodb+srv://feiya:feiya666@cluster0-h9bay.azure.mongodb.net/test?retryWrites=true&w=majority";
var mongo = require("mongodb");
let mongoose = require("mongoose");
var bodyParser = require("body-parser");
var assert = require("assert");

var connectDB = async () => {
  try {
    await mongoose.connect(url, { useNewUrlParser: true });
    console.log("Database connected ...");
  } catch (err) {
    console.log(err.message);
  }
};
connectDB();

var port = 4000;
app.listen(port, () => {
  console.log("Server listening on port " + port);
});
var staticPath = "./../static";
app.use(express.static(staticPath))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// app.get('/senddata',function (req, res, next){
// var firstName = req.query.firstName
// var lastName = req.query.lastName
// });
// app.use("/", (req, res) => {
//   res.sendFile(__dirname + "/index.html");
// });

// var mongoose = require("mongoose");
// mongoose.connect(url);
var nameSchema = new mongoose.Schema({
  name: String,
  password: String,
  dob: Date,
  address: String,
  school: String,
  country: String,
  city: String,
  startDate: Date,
  endDate: Date,
  major: String,
  award: String,
  awardDate: Date
});

var User = mongoose.model("User", nameSchema);

app.post("/signup", (req, res) => {
  var myData = new User(req.body);
  myData.school = req.body.school2 || myData.school
  console.log(myData)
  myData
    .save()
    .then(item => {
      res.send("item saved to database");
    })
    .catch(err => {
      res.status(400).send("unable to save to database");
    });
});
app.get("/", (req, res) => {
  res.redirect("/signup.html");
});
