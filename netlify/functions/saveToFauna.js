const { save } = require("./helpers/dbUtils");

exports.handler = async function (event, context) {
  const response = await save();
  console.log(response);
  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*", // Allow from anywhere
    },
    body: JSON.stringify(response),
  };
};
