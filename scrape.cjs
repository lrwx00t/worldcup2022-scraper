const axios = require("axios");
const cheerio = require("cheerio");

const url = "https://www.skysports.com/world-cup-results/";

function FilterEmptyCells(elm) {
  return elm != null && elm !== false && elm !== "";
}

// array of matches
const matches = [];

axios(url)
  .then((response) => {
    const html = response.data;
    const $ = cheerio.load(html);
    $(".fixres__item", html).each(function () {
      let title = $(this).text().replace(/ /g, "");
      title = title.split("\n").filter(FilterEmptyCells);
      const first_country = title[0]; // first country
      const first_country_result = title[1]; // first country result
      const second_country_result = title[2]; // second country result
      const second_country = title[4]; // second country
      matches.push({
        first_country,
        first_country_result,
        second_country,
        second_country_result,
      });
    });
    console.log(matches);
  })
  .catch((err) => console.log(err));
