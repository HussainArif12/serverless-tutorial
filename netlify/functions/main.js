import parseUrl from "./helpers/readerUtils";
export const handler = async function (event, context) {
  const article = event.queryStringParameters.a;
  const data = await parseUrl(article);
  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*", // Allow from anywhere
    },
    body: JSON.stringify(data),
  };
};
