/**
 * Created by Maktub on 2018/1/24
 */
const path = require('path')
const axios = require('axios')
const proxy = require('http-proxy-middleware')
const webpack = require('webpack')
const MemoryFs = require('memory-fs')

const serverRender = require('./server-render')

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

// `(funtion(exports, require, module, __filename, __dirname){...bundle code}`
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
let serverBundle
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
  serverBundle = m.exports
})

module.exports = function (app) {
  app.use('/public', proxy({
    target: 'http://localhost:8888'
  }))
  app.get('*', function (req, res, next) {
    if (!serverBundle) {
      return res.send('waiting for compile, refresh later')
    }
    getTemplate().then(template => {
      return serverRender(serverBundle, template, req, res)
    }).catch(next)
  })
}
