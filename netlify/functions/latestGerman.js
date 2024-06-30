import {
  getLatestGermanArticle,
  declutterArticle,
} from "./helpers/getLatestDW";

export const handler = async function () {
  const data = await declutterArticle(getLatestGermanArticle());
  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*", // Allow from anywhere
    },
    body: JSON.stringify(data),
  };
};
