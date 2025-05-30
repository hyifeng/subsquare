import { ApolloClient, InMemoryCache, useQuery } from "@apollo/client";
import { CHAIN } from "next-common/utils/constants";
import getChainSettings from "next-common/utils/consts/settings";
import { defaultOptions } from "./common";

const { modules } = getChainSettings(CHAIN);

/** @type {ApolloClient<InMemoryCache> | undefined} */
export let coretimeClient;

if (modules?.coretime) {
  coretimeClient = new ApolloClient({
    uri: `https://${CHAIN}-gh-api.subsquare.io/graphql`,
    cache: new InMemoryCache(),
    defaultOptions,
  });
}

/**
 * @type {typeof useQuery}
 */
export function useCoretimeQuery(query, options = {}, ...args) {
  options.client = options.client || coretimeClient;
  return useQuery(query, options, ...args);
}
