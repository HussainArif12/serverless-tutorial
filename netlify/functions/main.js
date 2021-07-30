const parseURL = require("./helpers/readerUtils");
exports.handler = async function (event, context) {
  const article = event.queryStringParameters.a;
  const data = await parseURL(article);
  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*", // Allow from anywhere
    },
    body: JSON.stringify(data),
  };
};
