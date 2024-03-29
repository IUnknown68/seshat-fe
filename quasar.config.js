/* eslint-env node */

/*
 * This file runs in a Node context (it's NOT transpiled by Babel), so use only
 * the ES6 features that are supported by your Node version. https://node.green/
 */

// Configuration for your app
// https://v2.quasar.dev/quasar-cli-vite/quasar-config-js

/* eslint func-names: 0 */
/* eslint global-require: 0 */
const { mkdirSync, existsSync } = require('fs');
const { resolve, join } = require('path');
const { spawnSync } = require('child_process');
const { configure } = require('quasar/wrappers');
const dotenv = require('dotenv');

const pckgJson = require('./package.json');

const SESHAT_VARIANT_DEFAULT = 'default';

const {
  version,
  productName,
  description,
} = pckgJson;

function variantConfig(ctx) {
  // Variant and folder
  const variant = process.env.SESHAT_VARIANT || SESHAT_VARIANT_DEFAULT;
  const variantPath = (variant === '')
    ? process.cwd()
    : resolve(process.cwd(), 'variants', variant);

  // .env
  dotenv.config({ path: join(variantPath, '.env') });

  // dist-dir
  const distDir = (variant === '')
    ? join(variantPath, 'dist', ctx.modeName)
    : join(variantPath, 'dist');
  mkdirSync(distDir, { recursive: true });

  // Deployment
  const deployScript = (variant === '')
    ? undefined
    : resolve(variantPath, 'deploy.sh');

  const onPublish = (deployScript && existsSync(deployScript))
    ? () => {
      console.log('** Deploying:');
      spawnSync(deployScript, {
        cwd: variantPath,
        stdio: 'inherit',
      });
    }
    : () => {
      console.log('** WARNING: Publish specifed, but no deploy.sh found.');
    };

  return {
    variant,
    variantPath,
    distDir,
    onPublish,
  };
}

module.exports = configure((ctx) => {
  const {
    variant,
    variantPath,
    distDir,
    onPublish,
  } = variantConfig(ctx);

  const SESHAT_VERSION = process.env.SESHAT_VERSION || version;
  const SESHAT_PRODUCT_NAME = process.env.SESHAT_PRODUCT_NAME || productName;
  const SESHAT_DESCRIPTION = process.env.SESHAT_DESCRIPTION || description;
  const SESHAT_RESULTS_PER_PAGE = parseInt(process.env.SESHAT_RESULTS_PER_PAGE, 10) || 10;

  return {
    htmlVariables: {
      SESHAT_PRODUCT_NAME,
      SESHAT_DESCRIPTION,
    },
    eslint: {
      // fix: true,
      // include: [],
      // exclude: [],
      // rawOptions: {},
      warnings: true,
      errors: true,
    },

    // https://v2.quasar.dev/quasar-cli-vite/prefetch-feature
    // preFetch: true,

    // app boot file (/src/boot)
    // --> boot files are part of "main.js"
    // https://v2.quasar.dev/quasar-cli-vite/boot-files
    boot: [],

    // https://v2.quasar.dev/quasar-cli-vite/quasar-config-js#css
    css: [
      'app.scss',
    ],

    // https://github.com/quasarframework/quasar/tree/dev/extras
    extras: [
      // 'ionicons-v4',
      // 'mdi-v5',
      // 'fontawesome-v6',
      // 'eva-icons',
      // 'themify',
      // 'line-awesome',
      // 'roboto-font-latin-ext', // this or either 'roboto-font', NEVER both!

      'roboto-font', // optional, you are not bound to it
      'material-icons', // optional, you are not bound to it
    ],

    // Full list of options: https://v2.quasar.dev/quasar-cli-vite/quasar-config-js#build
    build: {
      target: {
        browser: ['es2019', 'edge88', 'firefox78', 'chrome87', 'safari13.1'],
        node: 'node16',
      },

      vueRouterMode: 'history', // available values: 'hash', 'history'
      // vueRouterBase,
      // vueDevtools,
      // vueOptionsAPI: false,

      rebuildCache: true, // rebuilds Vite/linter/etc cache on startup

      // publicPath: '/',
      // analyze: true,
      env: {},
      rawDefine: {
        SESHAT_VARIANT: JSON.stringify(variant),
        SESHAT_VERSION: JSON.stringify(SESHAT_VERSION),
        SESHAT_PRODUCT_NAME: JSON.stringify(SESHAT_PRODUCT_NAME),
        SESHAT_DESCRIPTION: JSON.stringify(SESHAT_DESCRIPTION),
        SESHAT_RESULTS_PER_PAGE,
      },
      // ignorePublicFolder: true,
      // minify: false,
      // polyfillModulePreload: true,
      distDir,
      extendViteConf(viteConf) {
        viteConf.publicDir = join(variantPath, 'public');
        viteConf.resolve.alias.lib = join(viteConf.resolve.alias.src, 'lib');
        viteConf.resolve.alias.variant = join(variantPath, 'src');
      },
      // viteVuePluginOptions: {},
      // vitePlugins: [],
      onPublish,
    },

    devServer: {
      https: false,
      open: false,
      host: '0.0.0.0',
      port: 8998,
      proxy: {
        '/api': {
          target: 'http://127.0.0.1:8040',
        },
      },
      // Everything below is for my dev proxy, you can comment out.
      hmr: {
        host: `8998.intern.seiberspace.de`,
        clientPort: 443,
        protocol: 'wss',
      },
      public: `https://8998.intern.seiberspace.de`,
      allowedHosts: [`8998.intern.seiberspace.de`],
    },

    // https://v2.quasar.dev/quasar-cli-vite/quasar-config-js#framework
    framework: {
      config: {},
      cssAddon: true,

      // iconSet: 'material-icons', // Quasar icon set
      // lang: 'en-US', // Quasar language pack

      // For special cases outside of where the auto-import strategy can have an impact
      // (like functional components as one of the examples),
      // you can manually specify Quasar components/directives to be available everywhere:
      //
      // components: [],
      // directives: [],

      // Quasar plugins
      plugins: [
        'Dialog',
        'Notify',
      ],
    },

    // animations: 'all', // --- includes all animations
    // https://v2.quasar.dev/options/animations
    animations: [],

    // https://v2.quasar.dev/quasar-cli-vite/quasar-config-js#property-sourcefiles
    // sourceFiles: {
    //   rootComponent: 'src/App.vue',
    //   router: 'src/router/index',
    //   store: 'src/store/index',
    //   registerServiceWorker: 'src-pwa/register-service-worker',
    //   serviceWorker: 'src-pwa/custom-service-worker',
    //   pwaManifestFile: 'src-pwa/manifest.json',
    //   electronMain: 'src-electron/electron-main',
    //   electronPreload: 'src-electron/electron-preload'
    // },

    // https://v2.quasar.dev/quasar-cli-vite/developing-ssr/configuring-ssr
    ssr: {
      // ssrPwaHtmlFilename: 'offline.html', // do NOT use index.html as name!
      // will mess up SSR

      // extendSSRWebserverConf (esbuildConf) {},
      // extendPackageJson (json) {},

      pwa: false,

      // manualStoreHydration: true,
      // manualPostHydrationTrigger: true,

      prodPort: 3000, // The default port that the production server should use
      // (gets superseded if process.env.PORT is specified at runtime)

      middlewares: [
        'render', // keep this as last one
      ],
    },

    // https://v2.quasar.dev/quasar-cli-vite/developing-pwa/configuring-pwa
    pwa: {
      workboxMode: 'generateSW', // or 'injectManifest'
      injectPwaMetaTags: true,
      swFilename: 'sw.js',
      manifestFilename: 'manifest.json',
      useCredentialsForManifestTag: false,
      // useFilenameHashes: true,
      // extendGenerateSWOptions (cfg) {}
      // extendInjectManifestOptions (cfg) {},
      // extendManifestJson (json) {}
      // extendPWACustomSWConf (esbuildConf) {}
    },

    // Full list of options: https://v2.quasar.dev/quasar-cli-vite/developing-cordova-apps/configuring-cordova
    cordova: {
      // noIosLegacyBuildFlag: true, // uncomment only if you know what you are doing
    },

    // Full list of options: https://v2.quasar.dev/quasar-cli-vite/developing-capacitor-apps/configuring-capacitor
    capacitor: {
      hideSplashscreen: true,
    },

    // Full list of options: https://v2.quasar.dev/quasar-cli-vite/developing-electron-apps/configuring-electron
    electron: {
      // extendElectronMainConf (esbuildConf)
      // extendElectronPreloadConf (esbuildConf)

      // specify the debugging port to use for the Electron app when running in development mode
      inspectPort: 5858,

      bundler: 'packager', // 'packager' or 'builder'

      packager: {
        // https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options

        // OS X / Mac App Store
        // appBundleId: '',
        // appCategoryType: '',
        // osxSign: '',
        // protocol: 'myapp://path',

        // Windows only
        // win32metadata: { ... }
      },

      builder: {
        // https://www.electron.build/configuration/configuration

        appId: 'profile-ai',
      },
    },

    // Full list of options: https://v2.quasar.dev/quasar-cli-vite/developing-browser-extensions/configuring-bex
    bex: {
      contentScripts: [
        'my-content-script',
      ],

      // extendBexScriptsConf (esbuildConf) {}
      // extendBexManifestJson (json) {}
    },
  };
});
