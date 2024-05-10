# Code Review Tool

## Getting Started
1. Set the correct Node version via `nvm use`
2. Start the Firebase Emulators via `npm run dev`
3. In another Terminal:
   1. Navigate into the `hosting` directory
   2. Run `npm i`
   3. Create a `.env` file based off of `.env.sample`
      - You can get a GitHub token from [here](https://github.com/settings/tokens)
   4. Start the React development server via `npm start`
      - In order to authenticate locally, you will need to use `127.0.0.1` rather than `localhost`

## Project Guidelines

### Components Structure
We follow the [Atomic Design](https://bradfrost.com/blog/post/atomic-web-design/) methodology for organising our components. It provides a clear way to structure consistent and scalable components which relates to their final context. 

### React Query Usage
We use the [React Query](https://tanstack.com/query/latest/docs/framework/react/overview) library for handling caching and synchronisation of our API calls. For consistency, we use the format `[<service-being-called>, <endpoint>, <parameter>]` for our [query keys](https://tanstack.com/query/latest/docs/framework/react/guides/query-keys) (for example: `["github", "repositories", "example-user"]`). We ask that you keep the implementation of [query functions](https://tanstack.com/query/latest/docs/framework/react/guides/query-functions) slim, placing most the logic in the service layer.
