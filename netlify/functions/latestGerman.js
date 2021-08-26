const getLatestGermanArticle = require("./helpers/getLatestDW");
exports.handler = async function () {
  const data = await getLatestGermanArticle();
  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*", // Allow from anywhere
    },
    body: JSON.stringify(data),
  };
};
