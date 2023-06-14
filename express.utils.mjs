import path from "node:path"
import fsPromises from "node:fs/promises"
import util from "node:util"
import child_process from "node:child_process"

// Importing these here causing production builds to require webpack, et al.
//import webpack from "webpack"
//import webpackDevMiddleware from "webpack-dev-middleware"
//import webpackHotMiddleware from "webpack-hot-middleware"

//const child_process = await import("node:child_process")
const exec = util.promisify(child_process.exec)

//const memfs = require('memfs')
//const webpack = require('webpack')
//const webpackDevMiddleware = require('webpack-dev-middleware')
//const webpackHotMiddleware = require('webpack-hot-middleware')
//const webpackHotServerMiddleware = require('webpack-hot-server-middleware')
//import { isObject } = require('underscore')

function isObject(obj) {
  var type = typeof obj;
  return type === 'function' || (type === 'object' && !!obj);
}

//const clientConfig = require('./webpack.client')
//const serverConfig = require('./webpack.server')

function normalizeAssets(assets) {
  if (isObject(assets)) {
    return Object.values(assets)
  }
  return Array.isArray(assets) ? assets : [assets]
}

//function nameToRelativePath(name) {
  //var out = name
  //out = out.replace(/-/g, '/')
  //out = out.replace(/_/g, '.')
  //return out
//}

//function nameToCmd(name) {
  //return name.split('-').join(' ')
//}

/*
 * To test status (200 or 500):
 * run.test.sh <cmd> | jq '.status' 
 */
async function getCard(command) {
  const { stdout, stderr } = await exec(command);
  const lines = stdout.split('\n');

  const name = lines[0].match(/^.+:/)[0].split(':')[0];
  //const inet = lines[4].match(/inet (\.?\d{1,3}){4}/)[0];
  //const groups = lines[5].match(/groups\: (.+)$/)[1].split(' ');
  //const status = false;
  //if (/\<UP,/.test(lines[0])) {
    //status = true;
  //}

  return { name }
  //return { name, inet, status, groups }
}

async function runResponse(req, res, next) {
  const command = req.body.command;
  let lines = [];

  try {
    console.log(`Running the command: ${command}`)
    const { stdout, stderr } = await exec(command)
    lines = stdout.split('\n')
    return res.json({ command, lines, status: 200 })
  }
  catch (error) {
    console.error(`Running command failed: ${command}`)
    lines = [error.name, error.message]
    return res.json({ command, lines, status: 500 })
  }
}

async function backupFile(src, callback) {
  const dst = `${src}.bak`
  try {
    await fsPromises.copyFile(src, dst, constants.COPYFILE_EXCL)
    console.log(`Backing up file: ${src}`)
  } catch (error) {
    console.error(`Backing up file failed: ${src}`)
    console.error(error.message)
  }
}

async function writeFile(absolutePath, lines) {
  const data = lines.join('\n')

  try {
    await fsPromises.writeFile(absolutePath, data, {
      encoding: 'utf8',
      //mode: 600,
    })
    //console.log(`Wrote file: ${absolutePath}`)
  } catch (error) {
    //console.error(`Writing file failed: ${absolutePath}`)
    console.error(error.message)
  }
}

async function writeResponse(req, res, next) {
  const fp = path.resolve(req.body.path);
  const data = req.body.lines.join('\n');

  try {
    await fsPromises.writeFile(fp, data, { encoding: 'utf8' });
    console.log(`Wrote to ${fp}.`);
    return res.sendStatus(201);
  }
  catch (error) {
    console.error(`Writing to ${fp} failed.`);
    console.error(error.message);
    return res.sendStatus(500);
  }
}

// *NOTE* may require raised privs for read/write access to system files.
function readProjectFile(fileName) {
  const projectDir = path.resolve(process.cwd())
  const publicDir = path.join(projectDir, 'public')
  const fp = path.join(publicDir, fileName)
  const str = fs.readFileSync(fp).toString('utf8')
  return str;
}

// *NOTE* may require raised privs for read/write access to system files.
async function readResponse(req, res, next) {
  const fp = req.body.path
  let lines = [];

  try {
    console.log(`Reading system file: ${fp}`)
    const str = await fsPromises.readFile(fp, 'utf8')
    const lines = str.split('\n')
    return res.json({ path: fp, lines })
  } catch (error) {
    console.error(`Reading system file failed: ${fp}`)
  }
}

function devMiddlewareAssets(devMiddleware) {
  const stats = devMiddleware.context.stats.toJson()
  const clientAssets = stats.assetsByChunkName.client;

  const css = normalizeAssets(clientAssets)
    .filter((p) => p.endsWith('.css'))
    .map((p) => `<link rel="stylesheet" type="text/css" href="/static/${p}" />`)

  const js = normalizeAssets(clientAssets)
    .filter((p) => p.endsWith('.js'))
    .map((p) => `<script type="text/javascript" src="/static/${p}"></script>`)

  return { css, js }
}

function createDevRenderResponse(devMiddleware) {
  return (req, res, next) => {
    res.send(htmlDocument(devMiddlewareAssets(devMiddleware)))
  }
}

function createProRenderResponse() {
  return (req, res, next) => {
    // Render the app.
    //const { renderForServer } = require('./build/renderForServer.js')
    //const { html, state, helmet } = renderForServer(req.url)
    //const meta = helmet.meta.toString()
    //const link = helmet.link.toString()
    //const title = helmet.title.toString()

    // Construct the static html document for our SPA.
    const css = [
      '<link rel="stylesheet" type="text/css" href="/static/client.css" />',
    ]
    const js = [
      '<script type="text/javascript" src="/static/client.js"></script>',
    ]

    // Return the doc
    res.send(htmlDocument({ css, js }))
  }
}

// rendered = {
//  doc: {
//    css,
//    style,
//    state,
//    html,
//    helmet: { title, meta, link, style }
// }
//
function toHtmlString(obj, key) {
  if (!(obj.hasOwnProperty(key))) {
    return '';
  }

  const value = obj[key];
  if (Array.isArray(value)) {
    return value.join("\n")
  }
  if (isObject(value)) {
    return JSON.stringify(value)
  }
  return value
}

function htmlDocument(opts) {
  const state = JSON.stringify(toHtmlString(opts, 'state') || {})

  const lines = [
    '<!DOCTYPE html>',
    '<html lang="en">',
    '<head>',
      '<meta charset="utf-8">',
      '<meta name="viewport" content="width=device-width, initial-scale=1">',
      '<meta http-equiv="x-ua-compatible" content="ie=edge">',
      toHtmlString(opts, 'link'),
      toHtmlString(opts, 'meta'),
      toHtmlString(opts, 'style'),
      toHtmlString(opts, 'title'),
      toHtmlString(opts, 'css'),
      `<script type="application/json">window.__STATE__ = ${state};</script>`,
    '</head>',
    '<body>',
      `<div id="root">${toHtmlString(opts, 'html')}</div>`,
      '<script type="text/javascript" src="/static/runtime.js"></script>',
      toHtmlString(opts, 'js'),
    '</body>',
    '</html>',
  ]

  const doc = lines.join("\n")

  return doc
}

async function useWebpack(app, clientConfig) {
  //const clientConfig = require('webpack.client')
  const webpack = (await import('webpack')).default
  const webpackDevMiddleware = (await import('webpack-dev-middleware')).default
  const webpackHotMiddleware = (await import('webpack-hot-middleware')).default

  const compiler = webpack(clientConfig)
  const devMiddleware = webpackDevMiddleware(compiler, {
    publicPath: clientConfig.output.publicPath,
  })
  const hotMiddleware = webpackHotMiddleware(compiler, {
    heartbeat: clientConfig.watchOptions.poll,
    path: '/__webpack_hmr',
  })

  app.use(devMiddleware)
  app.use(hotMiddleware)

  return {
    devMiddleware,
    hotMiddleware,
  }
}

export default {
  writeResponse,
  useWebpack,
  htmlDocument,
  normalizeAssets,
  devMiddlewareAssets,
  createProRenderResponse,
  createDevRenderResponse,
  readResponse,
  runResponse,
}
