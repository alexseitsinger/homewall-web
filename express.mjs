import path from "node:path"

import express from "express"
//import cors from "cors"
import bodyParser from "body-parser"

import utils from "./express.utils.mjs"

const CWD = path.resolve(process.cwd())
const PUBLIC_DIR = path.join(CWD, 'public')
const BUILD_DIR = path.join(CWD, 'build')

const app = express()

let renderResponse;
if (process.env.NODE_ENV === 'production') {
  //const renderForServer = (await import('./build/renderForServer')).default
  renderResponse = utils.createProRenderResponse();
} else {
  const clientConfig = (await import('./webpack.client.mjs')).default
  const { devMiddleware, hotMiddleware } = await utils.useWebpack(app, clientConfig)
  renderResponse = utils.createDevRenderResponse(devMiddleware)
}

app.use(bodyParser.json())
app.use('/static', express.static(BUILD_DIR))
app.use('/static', express.static(PUBLIC_DIR))
app.post('/write', utils.writeResponse)
app.post('/read', utils.readResponse)
app.post('/run', utils.runResponse)
app.get('/*', renderResponse)

app.listen(3000, '127.0.0.1', () => {
  console.log('Listening: http://127.0.0.1:3000/')
})
