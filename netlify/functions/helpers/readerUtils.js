const { Readability } = require("@mozilla/readability");
const got = require("got");
const { JSDOM } = require("jsdom");
const window = new JSDOM("").window;
const DOMPurify = require("dompurify")(window);

async function parseURL(site) {
  try {
    const response = await got(site);
    const doc = new JSDOM(response.body, {
      site,
    });

    let reader = new Readability(doc.window.document);
    let article = reader.parse();
    const markup = DOMPurify.sanitize(article.content);
    return {
      title: article.title,
      html: markup,
    };
  } catch (e) {
    return { error: e };
  }
}

module.exports = parseURL;
