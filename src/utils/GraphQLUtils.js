import { ApolloClient, InMemoryCache } from "@apollo/client";
import { gql } from "@apollo/client";
const passwordHash = require("password-hash");

const client = new ApolloClient({
  uri: "https://nice-box.herokuapp.com/graphql",
  cache: new InMemoryCache(),
});

export async function saveLogin(email, password) {
  const hash = passwordHash.generate(password);

  console.log(hash);

  client
    .mutate({
      mutation: gql`
      mutation saveLogin {
        saveLogin(email: "${email}", hash: "${hash}") {
          couldSave
        }
      }
    `,
    })
    .then((result) => console.log(result));
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
    .catch((e) => console.log(e));

  return res.data.confirmLogin;
}
