import React from "react";

import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import { Switch, Route } from "react-router-dom";

const GET_DOGS = gql`
  query {
    Media(id: 1) {
      id
    }
  }
`;

function Component() {
  const { loading, error, data } = useQuery(GET_DOGS);

  if (loading) {
    return "loading";
  }

  if (error) {
    return "error";
  }

  // in SSR, we should see this "data" rendered
  return <code>{JSON.stringify(data)}</code>;
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
