"use client";
import { HttpLink, ApolloLink } from "@apollo/client";
import {
  NextSSRApolloClient,
  ApolloNextAppProvider,
  NextSSRInMemoryCache,
  SSRMultipartLink,
} from "@apollo/experimental-nextjs-app-support/ssr";

import { persistCache } from "apollo3-cache-persist";

const initCache = (initialState?: any) => {
  const cache = new NextSSRInMemoryCache().restore(initialState || {});
  if (typeof window !== "undefined") {
    persistCache({
      cache,
      storage: window.localStorage,
    });
  }

  return cache;
};

function makeClient() {
  const httpLink = new HttpLink({
    uri: process.env.NEXT_PUBLIC_VERCEL_URL + "/api/graphql",
  });

  return new NextSSRApolloClient({
    cache: initCache(),
    link:
      typeof window === "undefined"
        ? ApolloLink.from([
            new SSRMultipartLink({
              stripDefer: true,
            }),
            httpLink,
          ])
        : httpLink,
  });
}

export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
}
