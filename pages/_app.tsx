import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import "tailwindcss/tailwind.css";

const client = new ApolloClient({
  uri: "https://graphql-weather-api.herokuapp.com",
  cache: new InMemoryCache(),
})

import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return <ApolloProvider client={client}>
    <Component {...pageProps} />
  </ApolloProvider>
}

export default MyApp
