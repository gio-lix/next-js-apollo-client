import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {ApolloProvider} from "@apollo/client";
import apolloClient from "../lib/apollo";
import CreateStoreProvider from "../context/storeProvider";


function MyApp({ Component, pageProps }: AppProps) {
  return (
      <ApolloProvider client={apolloClient}>
          <CreateStoreProvider>
              <Component {...pageProps} />
          </CreateStoreProvider>
      </ApolloProvider>
  )
}

export default MyApp
