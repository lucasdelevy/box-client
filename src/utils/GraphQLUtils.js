import { ApolloClient, InMemoryCache } from "@apollo/client";
import { gql } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://nice-box.herokuapp.com/graphql",
  cache: new InMemoryCache(),
});

export async function saveLogin(email, password) {
  const res = await client
    .mutate({
      mutation: gql`
      mutation saveLogin {
        saveLogin(email: "${email}", password: "${password}") {
          couldSave
          token
        }
      }
    `,
    })
    .catch((e) => console.log(`saveLogin failed: ${e}`));

  return res.data.saveLogin;
}

export async function confirmLogin(email, password) {
  const res = await client
    .query({
      query: gql`
      query confirmLogin {
        confirmLogin(email: "${email}", password: "${password}") {
          authenticated
          token
        }
      }
      `,
    })
    .catch((e) => console.log(`confirmLogin failed: ${e}`));

  return res.data.confirmLogin;
}

export async function getUserData(email, token) {
  const res = await client
    .query({
      query: gql`
      query getUserData {
        getUserData(email: "${email}", token: "${token}") {
          validToken
          email
          userId
        }
      }
      `,
    })
    .catch((e) => console.log(`getUserData failed: ${e}`));

  return res.data.getUserData;
}

export async function listFiles(email, token, path) {
  const res = await client
    .query({
      query: gql`
      query listFiles {
        listFiles(email: "${email}", token: "${token}", path: "${path}") {
          files
        }
      }
    `,
    })
    .catch((e) => console.log(`fetchFileList failed: ${e}`));

  return res.data.listFiles;
}
