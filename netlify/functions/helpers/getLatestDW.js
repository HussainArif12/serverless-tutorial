const cheerio = require("cheerio");
const got = require("got");
const parseURL = require("./readerUtils");

const DWLink = "https://www.dw.com/de/";
async function getLatestGermanArticle() {
  const response = await got(DWLink);
  const $ = cheerio.load(response.body);
  const listItems = $(".imgTeaserXL");
  return (
    "https://www.dw.com" + listItems.children("div").children("a").attr("href")
  );
}

async function declutterArticle() {
  const url = await getLatestGermanArticle();
  const data = await parseURL(url);

  return data;
}
module.exports = declutterArticle;
