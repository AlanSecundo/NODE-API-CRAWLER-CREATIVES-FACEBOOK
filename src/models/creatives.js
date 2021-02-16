const mongoose = require("../database");
const Schema = mongoose.Schema;

const CreativeSchema = new mongoose.Schema({
  url: {
    type: String,
    require: true,
  },
  specialist: {
    type: Schema.Types.ObjectId,
    ref: "Specialist",
    require: true
  },
});

const Creative = mongoose.model("Creative", CreativeSchema);

module.exports = Creative;
