const express = require("express"); //importing express package
const app = express(); // creates a express application
const dotenv = require("dotenv").config(); //this allows me to use my .env values in this file
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const morgan = require("morgan");
const Cars = require("./models/Cars");
// Middleware
app.use(express.static("public")); //all static files are in the public folder
app.use(express.urlencoded({ extended: false })); // this will allow us to see the data being sent in the POST or PUT
app.use(methodOverride("_method"));
app.use(morgan("dev"));

async function conntectToDB() {
  //connection to the database
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to Database");
  } catch (error) {
    console.log("Error Occured", error);
  }
}

conntectToDB();

// Routes go here
//homepage
app.get("/", (req, res) => {
  res.render("homepage.ejs");
});
app.get("views/cars-details", (req, res) => {
  res.render("/cars-details");
});
app.get("views/create-cars", (req, res) => {
  res.render("/create-cars");
});
app.get("views/cars-list", (req, res) => {
  res.render("/cars-list");
});

//new
app.get("/Cars/new", (req, res) => {
  res.render("create-cars.ejs");
});
//display
app.get("/cars", async (req, res) => {
  const allCars = await Cars.find();
  res.render("cars-list.ejs", { cars: allCars });
});
//delete
app.delete("/cars/:carsId/delete", async (req, res) => {
  console.log("delete cars");
  await Cars.findByIdAndDelete(req.params.carsId);
  res.redirect("/cars");
});

app.get("/cars/:CarsId", async (req, res) => {
  const foundcars = await Cars.findById(req.params.CarsId);
  res.render("cars-details.ejs", { cars: foundcars });
});
app.post("/cars", async (req, res) => {
  const carsCreate = await Cars.create({
    name: req.body.name,
  });
  res.redirect("/");
});
app.get("/cars/:carsId/edit", async (req, res) => {
  const foundcars = await Cars.findById(req.params.carsId);
  res.render("edit-cars.ejs", { cars: foundcars });
});
app.put("/cars/:carsId", async (req, res) => {
  const updateCars = await Cars.findByIdAndUpdate(req.params.cardId, req.body);
  res.redirect("/cars");
});
app.listen(3000, () => {
  console.log("Listening on port " + 3000);
}); // Listen on port 3000
