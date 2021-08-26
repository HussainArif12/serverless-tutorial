const { save } = require("./helpers/dbUtils");

exports.handler = async function (event, context) {
  const { updateNote } = await save();
  console.log(updateNote);
  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*", // Allow from anywhere
    },
    body: JSON.stringify(updateNote),
  };
};
