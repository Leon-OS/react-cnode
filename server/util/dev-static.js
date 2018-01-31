/**
 * Created by Maktub on 2018/1/24
 */
const path = require('path')
const axios = require('axios')
const proxy = require('http-proxy-middleware')
const webpack = require('webpack')
const MemoryFs = require('memory-fs')
const asyncBootstrap = require('react-async-bootstrapper').default
const ReactDomServer = require('react-dom/server')

const serverConfig = require('../../build/webpack.config.server')

const getTemplate = () => {
  return new Promise((resolve, reject) => {
    axios.get('http://localhost:8888/public/index.html')
      .then(res => {
        resolve(res.data)
      })
      .catch(reject)
  })
}

const Module = module.constructor

const mfs = new MemoryFs()
const serverComplier = webpack(serverConfig)
serverComplier.outputFileSystem = mfs
let serverBundle, createStoreMap
serverComplier.watch({}, (err, status) => {
  if (err) throw err
  status = status.toJson()
  status.errors.forEach(err => console.error(err))
  status.warnings.forEach(warn => console.warn(warn))

  const bundlePath = path.join(
    serverConfig.output.path,
    serverConfig.output.filename
  )
  const bundle = mfs.readFileSync(bundlePath, 'utf-8')
  const m = new Module()
  m._compile(bundle, 'server-entry.js') // 动态编译，指定文件名-> 无法在缓存中读取
  serverBundle = m.exports.default // exports==> network-localhost <div>为空
  createStoreMap = m.exports.createStoreMap
})

module.exports = function (app) {
  app.use('/public', proxy({
    target: 'http://localhost:8888'
  }))
  app.get('*', function (req, res) {
    getTemplate().then(template => {
      const stores = createStoreMap()
      const routerContext = {}
      const app = serverBundle(stores, routerContext, req.url)

      // 异步加载数据，在渲染前
      // new: 源代码数据 count=3, 渲染 count=0
      asyncBootstrap(app).then(() => {
        if (routerContext.url) {
          res.status(302).setHeader('Location', routerContext.url)
          res.end()
          return
        }
        console.log(stores)
        console.log(stores.appState.count)
        const content = ReactDomServer.renderToString(app)
        res.send(template.replace('<!--app-->', content))
      })
    })
  })
}
