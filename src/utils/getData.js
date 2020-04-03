const request = require('request');
const key = require('./keys/key');

const getData = (location, callback) => {
  const url = `https://api.smartable.ai/coronavirus/stats/US-${location}`;
  request({url, json: true, headers: {"Subscription-Key": key.key}}, (error, response) => {
    const data = response.body;

    if(error) {
      callback("Error: Cannot get to Covid-19 Data...", undefined);
    } else if (data.length === 1) {
      callback("Error: You put in an invalid state abreviation. Please put in a correct state abreviation. Example: California would be CA", undefined);
    } else {
      const info = {
        state: data.location.provinceOrState,
        country: data.location.countryOrRegion,
        stats: {
          confirmedCases: data.stats.totalConfirmedCases,
          newlyConfirmedCases: data.stats.newlyConfirmedCases,
          recoverd: data.stats.totalRecoveredCases,
          totalDeaths: data.stats.totalDeaths,
          newDeaths: data.stats.newDeaths
        }
      }
      callback(undefined, info);
    }
  });
}




module.exports = getData;
