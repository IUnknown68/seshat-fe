# seshat-fe

Semantic search.

Seshat was, among other things, the Egyptian goddess who invented writing.
She's a record keeper, and she's also associated with sciences and accounting.

So let's give her a redis database to keep her records, and use text embeddings
to help her find things in those records.


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

#### Variants
Since I'm using this frontend for different document collections, there are
different variants in - you guessed it: `variants`.

Some light branding and specialization is happening there, currently that's:

- Product name, description and version.
- Icons and images - everything in `public`.
- Brand colors.
- Optional footer.
- Optional routes, additional pages.

Structure of a variant folder:
```
<variant name>
  ├ src         Required, additional sources. Basically that would
  │  │          mirror the directory structure from /src in the
  │  │          project root.
  │  ├ ...      Whatever you need: Components, pages etc.
  │  ├ quasar.variables.scss   Required: Brand colors.
  │  └ index.js Required, see below
  ├ public      Required, icons and such (the same as public in the
  │             project root)
  ├ dist        Generated when running yarn build. Contains the spa-output.
  └ .env        Optional, dotenv-file
```

You choose a variant by setting `SESHAT_VARIANT` with the name of the variant in
your environment. If you don't, the variant in `default` is used.

`index.js` exports as `default` an object:
```js
import AboutPage from './pages/AboutPage.vue';
import MainLayoutFooter from './components/MainLayoutFooter.vue';

export default {
  // Optional: Additional routes
  routes: [
    {
      path: 'about',
      name: 'about',
      component: AboutPage,
    },
  ],
  // Optional: Footer. Contains link to AboutPage.
  footer: MainLayoutFooter,
};
```

So yes, in the most simple case you export an empty object.

You can use the footer to show links to about-pages and such stuff.
Currently that's the only place where to plug in additional content, however, as
you can probably see, it's flexible.

To add a variant, copy the `default` variant to a new folder, and start from there.

#### Environment

The following can be configured via the environment, usually from a `.env` file 
in the selected variant:

```sh
# Version. If not present, taken from package.json
SESHAT_VERSION="1.2.3"
# ProductName. If not present, taken from package.json
SESHAT_PRODUCT_NAME="SuperSearch"
# Description. If not present, taken from package.json
SESHAT_DESCRIPTION="My cool app"
# Max search results to return. Defaults to 10.
SESHAT_RESULTS_PER_PAGE=10
```
