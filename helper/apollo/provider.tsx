"use client";
import { HttpLink, ApolloLink } from "@apollo/client";
import {
  NextSSRApolloClient,
  ApolloNextAppProvider,
  NextSSRInMemoryCache,
  SSRMultipartLink,
} from "@apollo/experimental-nextjs-app-support/ssr";
import { setContext } from "@apollo/client/link/context";
import { persistCache } from "apollo3-cache-persist";
import Cookies from "js-cookie";

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

const authLink = setContext(async (_, ctx) => {
  let token = Cookies.get("access-toke");
  if (!token) {
    let res = await fetch("/token-refresh?json=true");
    let data = await res.json();
    console.log(data);

    token = data["access-token"];
    Cookies.set("access-token", data["access-token"], {
      sameSite: "strict",
      expires: new Date(new Date().getTime() + 2 * 60 * 1000),
    });
  }
  return ctx;
});

function makeClient() {
  const httpLink = new HttpLink({
    uri: process.env.NEXT_PUBLIC_VERCEL_URL + "/api/graphql",
  });

  return new NextSSRApolloClient({
    cache: initCache(),
    defaultOptions: {
      mutate: {
        errorPolicy: "all",
      },
    },
    link:
      typeof window === "undefined"
        ? ApolloLink.from([
            new SSRMultipartLink({
              stripDefer: true,
            }),
            authLink.concat(httpLink),
          ])
        : authLink.concat(httpLink),
  });
}

export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
}
