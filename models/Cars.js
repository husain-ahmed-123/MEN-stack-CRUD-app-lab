const mongoose = require("mongoose");
//schema
const Carsschema = new mongoose.Schema(
  {
    name: { type: String },
    brand: { type: String },
    model: { type: Number },
  },
  { timestamps: true },
);
//model

const Cars = mongoose.model("Cars", Carsschema);

//export the model

module.exports = Cars;
