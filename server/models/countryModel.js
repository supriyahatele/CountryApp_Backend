const mongoose = require('mongoose');

const countrySchema = new mongoose.Schema({
  name: { type: String, required: true },
  capital: { type: String },
  currency: { type: String, required: true }, // Currency code
  languages: [{ type: String }],
  flag: { type: String }, // URL to flag image
});

const CountryModel = mongoose.model('Country', countrySchema);

module.exports = {CountryModel};