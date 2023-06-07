import path from "node:path"

import webpack from "webpack"
import nodeExternals from "webpack-node-externals"
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin"
import MiniCssExtractPlugin from "mini-css-extract-plugin"
import HtmlWebpackPlugin from "html-webpack-plugin"
import { CleanWebpackPlugin } from "clean-webpack-plugin"
import TerserPlugin from "terser-webpack-plugin"

import serverModuleRules from "./webpack.server.module-rules"

const IS_DEVELOPMENT = Boolean(process.env.NODE_ENV !== 'production')
const PROJECT_DIR = path.resolve(process.cwd())
const PUBLIC_PATH = '/'

export default {
  name: 'server',
  target: 'node',
  mode: IS_DEVELOPMENT ? 'development' : 'production',
  entry: {
    //serverRenderer: path.join(PROJECT_DIR, './src/serverRenderer'),
    //renderPage: path.join(PROJECT_DIR, './src/renderPage'),
    renderForServer: path.join(PROJECT_DIR, './src/renderForServer'),
  },
  output: {
    publicPath: PUBLIC_PATH,
    path: path.join(PROJECT_DIR, './build'),
    filename: '[name].js',
    library: {
      type: 'commonjs2',
      export: 'default',
    },
  },
  module: {
    rules: serverModuleRules,
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
        '**/renderForServer.js',
        //'**/renderPage.js',
        //'**/serverRenderer.js',
        '!**/client.css',
        '!**/client.js',
        '!**/runtime.js',
        '!**/index.html',
      ],
      cleanOnceAfterBuildPatterns: [],
    }),
    IS_DEVELOPMENT && new webpack.HotModuleReplacementPlugin(),
    IS_DEVELOPMENT && new ReactRefreshWebpackPlugin(),
    new MiniCssExtractPlugin(),
  ].filter(Boolean),
  resolve: {
    extensions: ['.js','.jsx','.json','.css'],
    alias: {
      src: path.join(PROJECT_DIR, 'src'),
      app: path.join(PROJECT_DIR, 'src/app'),
    }
  },
  externals: [
    nodeExternals({
      modulesFromFile: {
        includeInBundle: ['dependencies'],
        excludeFromBundle: ['devDependencies', 'peerDependencies', 'optionalDependencies'],
      }
    })
  ],
  devtool: false,
  watchOptions: {
    ignored: ['**/build', '**/node_modules', '**/public'],
  },
  optimization: {
    innerGraph: false,
    concatenateModules: true,
    minimize: IS_DEVELOPMENT ? false : true,
    minimizer: [
      new TerserPlugin({
        extractComments: false,
        terserOptions: {
          format: {
            comments: false,
          },
        },
      }),
    ],
  },
}
