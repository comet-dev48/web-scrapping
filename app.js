const axios = require("axios");
const cheerio = require("cheerio");
const pretty = require("pretty");
const fs = require("fs");

const markup = `
<ul class="fruits">
  <li class="fruits__mango"> Mango </li>
  <li class="fruits__apple"> Apple </li>
</ul>
`;

const $ = cheerio.load(markup);

console.log(pretty($.html()));

const mango = $(".fruits__mango");
console.log(mango.html());

const apple = $(".fruits__apple");
console.log(apple.attr("class"));

const listItems = $("li");
console.log(listItems.length); // 2
listItems.each(function (idx, el) {
  console.log($(el).text());
});

const ul = $("ul");
ul.append("<li>Banana</li>");
ul.prepend("<li>Pineapple</li>");
console.log(pretty($.html()));

// URL of the page we want to scrape
const url = "https://en.wikipedia.org/wiki/ISO_3166-1_alpha-3";

// Async function which scrapes the data
async function scrapeData() {
  try {
    // Fetch HTML of the page we want to scrape
    const { data } = await axios.get(url);
    // Load HTML we fetched in the previous line
    const $ = cheerio.load(data);
    // Select all the list items in plainlist class
    const listItems = $(".plainlist ul li");
    // Stores data for all countries
    const countries = [];
    // Use .each method to loop through the li we selected
    listItems.each((idx, el) => {
      // Object holding data for each country/jurisdiction
      const country = { name: "", iso3: "" };
      // Select the text content of a and span elements
      // Store the textcontent in the above object
      country.name = $(el).children("a").text();
      country.iso3 = $(el).children("span").text();
      // Populate countries array with country data
      countries.push(country);
    });
    // Logs countries array to the console
    console.dir(countries);
    // Write countries array in countries.json file
    fs.writeFile("coutries.json", JSON.stringify(countries, null, 2), (err) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log("Successfully written data to file");
    });
  } catch (err) {
    console.error(err);
  }
}
// Invoke the above function
scrapeData();