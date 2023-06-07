import path from "node:path"

import nodeExternals from "webpack-node-externals"
import TerserPlugin from "terser-webpack-plugin"
import { CleanWebpackPlugin } from "clean-webpack-plugin"

const IS_DEVELOPMENT = Boolean(process.env.NODE_ENV !== 'production')
const PROJECT_DIR = path.resolve(process.cwd())
const EXPRESS_ENTRY = path.join(PROJECT_DIR, './express.mjs')
const PUBLIC_PATH = '/'

export default {
  name: 'express',
  target: 'node',
  mode: IS_DEVELOPMENT ? 'development' : 'production',
  devtool: false,
  entry: {
    express: EXPRESS_ENTRY,
  },
  output: {
    publicPath: PUBLIC_PATH,
    path: path.join(PROJECT_DIR, 'build'),
    filename: '[name].cjs',
    library: {
      type: 'commonjs2',
      export: 'default',
    },
  },
  module: {
    rules: [
      {
        test: /\.(m|c)?jsx?$/,
        exclude: /node_modules/,
        resolve: {
          fullySpecified: false,
        },
        use: ['babel-loader'],
      },
    ],
  },
  plugins: [
    //new webpack.DefinePlugin({
      //'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    //}),
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
        '**/express.js',
        '**/express.cjs',
        '**/express.mjs',
        '!**/renderForServer.js',
        '!**/renderPage.js',
        '!**/serverRenderer.js',
        '!**/client.css',
        '!**/client.js',
        '!**/runtime.js',
        '!**/index.html',
      ],
      cleanOnceAfterBuildPatterns: [],
    })
  ],
  resolve: {
    extensions: ['.js', '.cjs', '.mjs','.css','.json'],
    alias: {
      src: path.join(PROJECT_DIR, 'src'),
      app: path.join(PROJECT_DIR, 'src/app'),
    },
  },
  externalsPresets: { node: true },
  externals: [
    nodeExternals({
      modulesFromFile: {
        includeInBundle: ['dependencies'],
      },
    })
  ],
  optimization: {
    // To properly remove both the license file and the license comments
    // inside the bundle:
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: false,
        terserOptions: {
          format: {
            comments: false,
          },
        },
      })
    ],
  },
  experiments: {
    topLevelAwait: true,
  },
}
