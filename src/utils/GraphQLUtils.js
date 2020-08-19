import { ApolloClient, InMemoryCache } from '@apollo/client';
import { gql } from '@apollo/client';
const passwordHash = require('password-hash');

const client = new ApolloClient({
  uri: 'http://34.220.169.34/graphql',
  cache: new InMemoryCache()
});

export async function saveLogin(email, password) {

  const hash = passwordHash.generate(password);

  console.log(hash);

  client.mutate({
    mutation: gql`
      mutation saveLogin {
        saveLogin(email: "${email}", hash: "${hash}") {
          couldSave
        }
      }
    `}).then(result => console.log(result))
}