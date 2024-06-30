import cheerio from "cheerio";
import got from "got";
import parseURL from "./readerUtils";

const DWLink = "https://www.dw.com/de/";

export async function getLatestGermanArticle() {
  const response = await got(DWLink);
  const $ = cheerio.load(response.body);
  const listItems = $(".ts-hero");

  return "https://www.dw.com" + listItems.attr("href");
}

export async function declutterArticle() {
  const url = await getLatestGermanArticle();
  const data = await parseURL(url);

  return data;
}
//module.exports = declutterArticle;
