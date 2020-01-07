import {
  ApolloProvider,
  ApolloClient,
  createHttpLink,
  InMemoryCache
} from "@apollo/client";
import Express from "express";
import { StaticRouter } from "react-router";
import { renderToStaticMarkup } from "react-dom/server";
import React from "react";
import { renderToStringWithData } from "@apollo/react-ssr";

import Layout from "./Layout";
import fetch from "node-fetch";

const app = new Express();

function Html({ content, state }) {
  return (
    <html>
      <body>
        <div id="root" dangerouslySetInnerHTML={{ __html: content }} />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.__APOLLO_STATE__=${JSON.stringify(state).replace(
              /</g,
              "\\u003c"
            )};`
          }}
        />
      </body>
    </html>
  );
}

app.use((req, res) => {
  const client = new ApolloClient({
    ssrMode: true,
    link: createHttpLink({
      // technically this fails below but even that error is never displayed
      uri: "https://anilist.co/graphql",
      credentials: "same-origin",
      headers: {
        cookie: req.header("Cookie")
      },
      fetch
    }),
    cache: new InMemoryCache()
  });

  const context = {};

  const App = (
    <ApolloProvider client={client}>
      <StaticRouter location={req.url} context={context}>
        <Layout />
      </StaticRouter>
    </ApolloProvider>
  );

  renderToStringWithData(App).then(content => {
    const initialState = client.extract();
    const html = <Html content={content} state={initialState} />;

    res.status(200);
    res.send(`<!doctype html>\n${renderToStaticMarkup(html)}`);
    res.end();
  });
});
const basePort = 8080;

app.listen(basePort, () =>
  console.log(`app Server is now running on http://localhost:${basePort}`)
);
