import path from "node:path"

import MiniCssExtractPlugin from "mini-css-extract-plugin"

const projectDir = path.resolve(process.cwd())
const publicPath = 'http://localhost:3000/'

export default [
  // JSX (project)
  //
  {
    test: /\.jsx?$/,
    //exclude: /node_modules/,
    include: path.join(projectDir, 'src'),
    resolve: {
      fullySpecified: false,
    },
    use: [
      {
        loader: 'babel-loader',
        options: {
          //cacheDirectory: true,
        }
      },
    ],
  },

  // CSS (vendor)
  //
  {
    test: /\.css$/,
    include: /node_modules/,
    use: [
      {
        loader: MiniCssExtractPlugin.loader,
        options: {
          emit: false,
        },
      },
      {
        loader: 'css-loader',
        options: {
          modules: {
            localIdentContext: projectDir,
            localIdentName: '[local]',
          },
        },
      },
    ]
  },

  // CSS (project)
  //
  {
    test: /\.css$/,
    include: path.join(projectDir, 'src'),
    use: [
      {
        loader: MiniCssExtractPlugin.loader,
        options: {
          emit: false,
        },
      },
      {
        loader: 'css-loader',
        options: {
          modules: {
            localIdentContext: projectDir,
            localIdentName: '[name]__[local]__[hash:base64:5]',
          },
        },
      },
    ]
  },

  // IMAGES (project)
  //
  {
    test: /\.(gif|png|jpe?g|ico)$/,
    include: path.join(projectDir, 'public'),
    use: [
      {
        loader: 'file-loader',
        options: {
          publicPath,
          emitFile: false,
          name: 'images/[sha512:hash:base64:7].[ext]',
        },
      }
    ],
  },

  // FONTS (project)
  //
  {
    test: /\.((ttf|eot|svg|woff(2)?)(\?v=\d+\.\d+\.\d+)?)$/,
    include: path.join(projectDir, 'public'),
    use: [
      {
        loader: 'file-loader',
        options: {
          publicPath,
          emitFile: false,
          name: 'fonts/[sha512:hash:base64:7].[ext]',
        },
      },
    ],
  },
]
