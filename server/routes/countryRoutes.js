const express = require('express');
const countryRouter = express.Router();
const {CountryModel} = require('../models/countryModel'); 
const axios = require('axios'); // For fetching data from external API
const { auth } = require('../middleware/auth');

// Get countries by currency code
countryRouter.get('/:currencyCode',auth, async (req, res) => {
  try {
    const currencyCode = req.params.currencyCode.toUpperCase(); // Ensure uppercase
    const countries = await CountryModel.find({ currency: currencyCode });

    if (countries.length === 0) {
      // If no matches found, fetch from external API
      const apiUrl = `https://restcountries.com/v3.1/currency/${currencyCode}`;
      const apiResponse = await axios.get(apiUrl);
      const apiData = apiResponse.data;

      if (apiData.length > 0) {
        // Save new country to database
        const newCountry = new CountryModel({
          name: apiData[0].name.common,
          capital: apiData[0].capital[0],
          currency: currencyCode,
          languages: Object.values(apiData[0].languages),
          flag: `https://flagsapi.com/${currencyCode}/shiny/64.png`, // Assuming you have a flag API
        });
        await newCountry.save();
        res.status(200).json(newCountry);
      } else {
        res.status(404).json({ message: 'Country not found' });
      }
    } else {
      res.status(200).json(countries);
    }
  } catch (error) {
    // console.error(error);
    res.status(500).json({ error:error, message: 'Failed to retrieve countries' });
  }
});

module.exports = {countryRouter};