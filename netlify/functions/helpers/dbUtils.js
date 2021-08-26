const { GraphQLClient, gql } = require("graphql-request");
const declutterArticle = require("./getLatestDW");

const id = "307440513290600519"; //id of the note
const endpoint = "https://graphql.us.fauna.com/graphql";
const graphQLClient = new GraphQLClient(endpoint, {
  headers: {
    authorization: "Bearer " + process.env.FAUNA_SECRET,
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

async function save() {
  const { title, html: body } = await declutterArticle();
  const data = await graphQLClient.request(updateQuery, { title, body });
  return data;
}

async function read() {
  const data = await graphQLClient.request(readQuery);
  return data;
}

module.exports = { save, read };
