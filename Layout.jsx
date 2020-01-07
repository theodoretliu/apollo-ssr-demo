import React from "react";

import { gql, useQuery } from "@apollo/client";
import { Switch, Route } from "react-router-dom";

const GET_DOGS = gql`
  query {
    Media(id: 1) {
      id
    }
  }
`;

function Component() {
  const { loading, error, _data } = useQuery(GET_DOGS);

  if (loading) {
    return "loading";
  }

  if (error) {
    return "error";
  }

  // in SSR, we should see this "data" rendered
  return "data";
}

function Layout() {
  return (
    <Switch>
      <Route path="/">
        <Component />
      </Route>
    </Switch>
  );
}

export default Layout;
