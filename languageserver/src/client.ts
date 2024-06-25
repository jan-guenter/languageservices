import {Octokit} from "@octokit/rest";
import * as nodeFetch from "node-fetch";
import { HttpsProxyAgent, HttpsProxyAgentOptions } from "https-proxy-agent";

// function myfetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
//   return fetch(input, {
//     ...init,
//     agent: new HttpsProxyAgent('http://192.168.0.109:3128')
//   });
// }

function isNode(): boolean {
  return typeof process !== "undefined" && process.versions?.node != null;
}

// const nodeFetch = isNode() ? require("node-fetch") : null;
// const httpsProxyAgent = isNode() ? require("https-proxy-agent") as (new<Uri extends string>(proxy: Uri | URL, opts?: HttpsProxyAgentOptions<Uri>) => HttpsProxyAgent<Uri>) : null;

function myFetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
  // if (nodeFetch && httpsProxyAgent) {
  //   return nodeFetch(input, {
  //     ...init,
  //     agent: new httpsProxyAgent('http://192.168.0.109:3128')
  //   });
  if (isNode()) {
    //@ts-ignore
    return nodeFetch.default(input, {
      ...init,
      agent: new HttpsProxyAgent('http://192.168.0.109:3128')
    });
  } else {
    return fetch(input, init);
  }
}

export function getClient(token: string, userAgent?: string, apiUrl?: string): Octokit {
  return new Octokit({
    auth: token,
    userAgent: userAgent || `GitHub Actions Language Server`,
    baseUrl: apiUrl,
    request: {
      fetch: myFetch
    }
  });
}
