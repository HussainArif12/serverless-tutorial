const { Readability, isProbablyReaderable } = require("@mozilla/readability");
const got = require("got");
const { JSDOM } = require("jsdom");
const window = new JSDOM("").window;
const DOMPurify = require("dompurify")(window);

async function parseURL(site) {
  const response = await got(site);
  const doc = new JSDOM(response.body);

  if (isProbablyReaderable(doc.window.document)) {
    let reader = new Readability(doc.window.document);
    let article = reader.parse();
    const markup = DOMPurify.sanitize(article.content);
    return {
      title: article.title,
      html: markup,
    };
  } else {
    return { error: "The site was not readable" };
  }
}

module.exports = parseURL;
