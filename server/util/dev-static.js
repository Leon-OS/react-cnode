/**
 * Created by Maktub on 2018/1/24
 */
const path = require('path')
const axios = require('axios')
const proxy = require('http-proxy-middleware')
const webpack = require('webpack')
const MemoryFs = require('memory-fs')
const ejs = require('ejs')
const serialize = require('serialize-javascript')
const asyncBootstrap = require('react-async-bootstrapper').default
const ReactDomServer = require('react-dom/server')

const serverConfig = require('../../build/webpack.config.server')

const getTemplate = () => {
  return new Promise((resolve, reject) => {
    axios.get('http://localhost:8888/public/server.ejs')
      .then(res => {
        resolve(res.data)
      })
      .catch(reject)
  })
}

// 更加 hack
const NativeModule = require('module')
const vm = require('vm')

const getModuleFromString = (bundle, filename) => {
  const m = { exports: {} }
  const wrapper = NativeModule.wrap(bundle)
  const script = new vm.Script(wrapper, {
    filename: filename,
    displayErrors: true
  })
  const result = script.runInThisContext()
  result.call(m.exports, m.exports, require, m)
  return m
}

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
  // hack方式，但是无法require引入包
  // const m = new Module()
  // m._compile(bundle, 'server-entry.js') // 动态编译，指定文件名-> 无法在缓存中读取
  const m = getModuleFromString(bundle, 'server-entry.js')
  serverBundle = m.exports.default // exports==> network-localhost <div>为空
  createStoreMap = m.exports.createStoreMap
})

const getStoreState = (stores) => {
  return Object.keys(stores).reduce((result, storeName) => {
    result[storeName] = stores[storeName].toJson()
    return result
  }, {})
}

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
      asyncBootstrap(app).then(() => {
        if (routerContext.url) {
          res.status(302).setHeader('Location', routerContext.url)
          res.end()
          return
        }
        const state = getStoreState(stores)
        const content = ReactDomServer.renderToString(app)

        const html = ejs.render(template, {
          appString: content,
          initialState: serialize(state)
        })
        res.send(html)
        // res.send(template.replace('<!--app-->', content))
      })
    })
  })
}
