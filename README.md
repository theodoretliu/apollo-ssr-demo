# Reproduction of Apollo Client SSR Bug

## Build steps

1. `npm i`
2. `npm run build`
3. `node dist/server.js`
4. Visit `localhost:8080`

## Expected Behavior

Since the API is firewalled, we should see "Error" or "Data" shown.

## Actual Behavior

We see "loading", meaning the SSR did not complete.
