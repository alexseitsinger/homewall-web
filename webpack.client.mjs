import path from "node:path"

import webpack from "webpack"
import HtmlWebpackPlugin from "html-webpack-plugin"
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin"
import MiniCssExtractPlugin from "mini-css-extract-plugin"
import { CleanWebpackPlugin } from "clean-webpack-plugin"
import TerserPlugin from "terser-webpack-plugin"
import CssMinimizerPlugin from "css-minimizer-webpack-plugin"

//const clientModuleRules = (await import('./webpack.client.module-rules.mjs')).default
import clientModuleRules from "./webpack.client.module-rules.mjs"

const IS_DEVELOPMENT = Boolean(process.env.NODE_ENV !== 'production')
const PROJECT_DIR = path.resolve(process.cwd())
const CLIENT_ENTRY = path.join(PROJECT_DIR, 'src/client.mjs')
const PUBLIC_PATH = '/static/'
const HMR_TIMEOUT = 1000
const HMR_PATH = `/__webpack_hmr`
const HMR_PARAMS = [
  // Bundle name (for multi-compiler mode)
  `name=client`,

  // The path to which the middleware is serving the event stream on.
  `path=${HMR_PATH}`,

  // use webpack's PUBLIC_PATH as the prefix of path.
  //`dynamicPublicPath=true`,

  // Time to wait for a disconnect before attempting to reconnect.
  `timeout=${HMR_TIMEOUT}`,

  // reload=true to reload page when webpack gets stuck.
  //`reload=false`,

  //Set to false to use to prevent a connection being automatically opened
  // from the client to the webpack back-end. Ideal if we need to modify the
  // options using the setOptionsAndConnect function.
  //`autoConnect=false`,

  // Set to false to disable DOM-based client-side overlay.
  //`overlay=false`,

  // An object to let you override or add new inline styles to the client
  // overlay div.
  //overlayStyles={}

  // Set to true to enable cleint overlay on warnings in addition to errors.
  //overlayWarnings={}

  // An object to customize the client overlay colors as mentioned in the
  // ansi-html package.
  //ansiColors={}

  // Set to true to disable all/informational console logging.
  //`noInfo=true`,
  //`quiet=true`,
]

const HMR_ENTRY = [
  'webpack-hot-middleware/client',
  HMR_PARAMS.join('&'),
].join('?')

export default {
  name: 'client',
  target: 'web',
  mode: IS_DEVELOPMENT ? 'development' : 'production',
  devtool: IS_DEVELOPMENT ? 'inline-source-map' : false,
  watchOptions: {
    // *WARN* if using context, be sure to ignore everything except src dir.
    ignored: [ '**/node_modules', '**/build'],
    // Required for react-refresh to work on FreeBSD.
    poll: HMR_TIMEOUT,
  },
  devServer: {
    //port: 3000,
    hot: IS_DEVELOPMENT,
    //static: [
      //{ directory: path.join(__dirname, 'public') },
      //{ directory: path.join(__dirname, 'build') },
    //],
    //watchFiles: {
      //paths: ['src/**'],
      //options: {
        //usePolling: true,
      //},
    //},
    //devMiddleware: {
      //index: 'index.html',
    //},
  },
  entry: {
    client: IS_DEVELOPMENT ? [HMR_ENTRY, CLIENT_ENTRY] : CLIENT_ENTRY,
  },
  output: {
    publicPath: PUBLIC_PATH,
    path: path.join(PROJECT_DIR, 'build'),
    filename: '[name].js',
    //hotUpdateChunkFilename: `[id].[fullhash].hot-update.js`,
    //hotUpdateMainFilename: `[runtime].[fullhash].hot-update.json`,
    //library: {
      //type: 'umd',
      //export: 'default',
    //},
    //clean: true,
  },
  module: {
    rules: clientModuleRules,
  },
  plugins: [
    new CleanWebpackPlugin({
      dry: false,
      verbose: true,
      // Automatically remove all unused webpack assets on rebuild.
      // (def: true)
      cleanStaleWebpackAssets: false,
      // Do not allow removal of current webpack assets.
      // (def: true)
      protectWebpackAssets: false,
      // Removes files prior to webpack compilation.
      // Not included in rebuilds (watch mode)
      // Use !negative patterns to exclude files.
      // (def: '**/*')
      cleanOnceBeforeBuildPatterns: [
        '!**/express.js',
        '!**/renderForServer.js',
        '!**/renderPage.js',
        '!**/serverRenderer.js',
        '**/client.css',
        '**/client.js',
        '**/runtime.js',
        '**/index.html',
      ],
      cleanOnceAfterBuildPatterns: [],
    }),
    IS_DEVELOPMENT && new webpack.HotModuleReplacementPlugin(),
    IS_DEVELOPMENT && new ReactRefreshWebpackPlugin(),
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(PROJECT_DIR, 'public/index.html'),
      PUBLIC_PATH,
      inject: false,
      filename: 'index.html',
    }),
  ].filter(Boolean),
  resolve: {
    extensions: ['.mjs', '.cjs', '.js', '.jsx', '.json', '.css'],
    alias: {
      src: path.join(PROJECT_DIR, 'src'),
      app: path.join(PROJECT_DIR, 'src/app'),
    },
  },
  /*
  optimization: {
    concatenateModules: true,
    mangleExports: true,
    mangleWasmImports: true,
    minimize: IS_DEVELOPMENT ? false : true,
    minimizer: [
      new CssMinimizerPlugin({
        parallel: true,
        minimizerOptions: {
          preset: ['default', { discardComments: { removeAll: true } }],
        },
      }),
      new TerserPlugin({
        extractComments: false,
        terserOptions: {
          format: {
            comments: false,
          },
        },
      }),
    ],
    innerGraph: false,
    //nodeEnv: 'production',
    removeAvailableModules: false,
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\\/]node_modules[\\\/]/,
          reuseExistingChunk: true,
          priority: -20,
        },
        default: {
          reuseExistingChunk: true,
          minChunks: 2,
          priority: -10,
        },
      },
    },
  },
  */
  //experiments: {
    //topLevelAwait: true,
  //},
}
