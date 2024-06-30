import { Readability } from "@mozilla/readability";
import got from "got";
import { parseHTML } from "linkedom";

async function parseURL(site) {
  try {
    const response = await got(site);

    const { document } = parseHTML(response.body, {
      site,
    });

    let reader = new Readability(document);
    let article = reader.parse();

    //let markup = DOMPurify.sanitize(article.content);
    let url = new URL(site);
    url = url.protocol + "//" + url.hostname;
    //replace relative URLs with absolute URLs
    article.content = article.content.replace(/"\//g, '"' + url + "/");
    console.log(article);
    return {
      title: article.title,
      html: article.content,
    };
  } catch (e) {
    console.log(e);
    return { error: e };
  }
}

export default parseURL;
