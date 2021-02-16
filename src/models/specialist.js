const mongoose = require('../database')

const SpecialistSchema = new mongoose.Schema({
  facebookName: {
    type: String,
    require: true
  }
})

const Specialist = mongoose.model('Specialist', SpecialistSchema);

module.exports = Specialist;