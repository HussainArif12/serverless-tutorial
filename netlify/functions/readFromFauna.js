const { read } = require("./helpers/dbUtils");

exports.handler = async function (event, context) {
  const data = await read();
  console.log(data);
  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*", // Allow from anywhere
    },
    body: JSON.stringify(data.findNoteByID),
  };
};
