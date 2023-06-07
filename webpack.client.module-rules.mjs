import path from "node:path"

import MiniCssExtractPlugin from "mini-css-extract-plugin"

const PROJECT_DIR = path.resolve(process.cwd())
const PUBLIC_PATH = 'http://localhost:3000/'

export default [
  // JSX (project)
  //
  {
    test: /\.(c|m)?jsx?$/,
    exclude: /node_modules/,
    //include: path.join(PROJECT_DIR, 'src')
    resolve: {
      fullySpecified: false,
    },
    use: [
      {
        loader: 'babel-loader',
        options: {
          //cacheDirectory: true,
        },
      },
    ],
  },

  // CSS (vendor)
  //
  {
    test: /\.css$/,
    include: /node_modules/,
    use: [
      MiniCssExtractPlugin.loader,
      {
        loader: 'css-loader',
        options: {
          modules: {
            localIdentContext: PROJECT_DIR,
            localIdentName: '[local]',
          },
        },
      },
    ],
  },

  // CSS (project)
  //
  {
    test: /\.css$/,
    include: path.join(PROJECT_DIR, 'src'),
    use: [
      MiniCssExtractPlugin.loader,
      {
        loader: 'css-loader',
        options: {
          modules: {
            localIdentContext: PROJECT_DIR,
            localIdentName: '[name]__[local]__[hash:base64:5]',
          },
        },
      },
    ],
  },

  // IMAGES (project)
  //
  {
    test: /\.(gif|png|jpe?g|ico)$/,
    include: path.join(PROJECT_DIR, 'public'),
    use: [
      {
        loader: 'file-loader',
        options: {
          PUBLIC_PATH,
          //emitFile: false,
          name: 'images/sha512:hash:base64:7].[ext]',
        },
      }
    ],
  },

  // FONTS (project)
  //
  {
    test: /\.((ttf|eot|svg|woff(2)?)(\?v=\d+\.\d+\.\d+)?)$/,
    include: path.join(PROJECT_DIR, 'public'),
    use: [
      {
        loader: 'file-loader',
        options: {
          PUBLIC_PATH,
          //emitFile: false,
          name: 'fonts/[sha512:hash:base64:7].[ext]',
        },
      },
    ],
  }

]
