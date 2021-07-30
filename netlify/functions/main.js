const parseURL = require("./helpers/readerUtils");
exports.handler = async function (event, context) {
  const article = event.queryStringParameters.a;
  const data = await parseURL(article);
  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
};
