import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import "tailwindcss/tailwind.css";

const defaultOptions = {
  watchQuery: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
  },
};

const client = new ApolloClient({
  uri: "https://graphql-weather-api.herokuapp.com",
  cache: new InMemoryCache(),
  defaultOptions: defaultOptions as any,
})

import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return <ApolloProvider client={client}>
    <Component {...pageProps} />
  </ApolloProvider>
}

export default MyApp
