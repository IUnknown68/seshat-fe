# seshat-fe

Seshat frontend. Allows querying a redis database for documents with text embeddings.

## Install the dependencies
```bash
yarn
# or
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)
```bash
yarn dev
# or
npm run dev
```

#### Backend
The frontend expects a [backend](https://github.com/IUnknown68/Seshat) at `/api`.

When using the dev-server, there is a proxy setup for the `devServer` in `quasar.config.js`. It expects the backend at 127.0.0.1:8040.

### Lint the files
```bash
yarn lint
# or
npm run lint
```

### Build the app for production
```bash
yarn build
# or
npm run build
```
