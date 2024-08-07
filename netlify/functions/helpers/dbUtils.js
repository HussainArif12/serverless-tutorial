import { GraphQLClient, gql } from "graphql-request";
import { declutterArticle } from "./getLatestDW";

const id = "307440513290600519"; //id of the note
const endpoint = "https://graphql.us.fauna.com/graphql";
const graphQLClient = new GraphQLClient(endpoint, {
  headers: {
    authorization: `Bearer ${process.env.FAUNA_SECRET}`,
  },
});

const updateQuery = gql`
  mutation changeArticle($title: String!, $body: String!) {
    updateNote(id: "307440513290600519", data: { title: $title, body: $body }) {
      title
      body
    }
  }
`;
const readQuery = gql`
  query {
    findNoteByID(id: ${id}) {
      _id
      title
      body
    }
  }
`;

export async function save() {
  const { title, html: body } = await declutterArticle();
  const data = await graphQLClient.request(updateQuery, { title, body });
  if (data) return { message: "OK" };
  else return { message: "Failed" };
}

export async function read() {
  const data = await graphQLClient.request(readQuery);
  return data;
}

//module.exports = { save, read };
