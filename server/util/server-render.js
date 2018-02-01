/**
 * Created by Maktub on 2018/2/1
 */

const ejs = require('ejs')
const serialize = require('serialize-javascript')
const asyncBootstrap = require('react-async-bootstrapper').default
const ReactDomServer = require('react-dom/server')
const Helmet = require('react-helmet').default
const SheetsRegistry = require('react-jss').SheetsRegistry
const createMuiTheme = require('material-ui').createMuiTheme
const colors = require('material-ui/colors')
const createGenerateClassName = require('material-ui/styles').createGenerateClassName

const getStoreState = (stores) => {
  return Object.keys(stores).reduce((result, storeName) => {
    result[storeName] = stores[storeName].toJson()
    return result
  }, {})
}

module.exports = (bundle, template, req, res) => {
  return new Promise((resolve, reject) => {
    const sheetsRegistry = new SheetsRegistry()
    const generateClassName = createGenerateClassName()
    const theme = createMuiTheme({
      palette: {
        primary: colors.lightBlue,
        accent: colors.pink,
        type: 'light'
      }
    })
    const createStoreMap = bundle.createStoreMap
    const createApp = bundle.default
    const stores = createStoreMap()
    const routerContext = {}
    const app = createApp(stores, routerContext, req.url, sheetsRegistry, generateClassName, theme)

    // 异步加载数据，在渲染前
    asyncBootstrap(app)
      .then(() => {
        if (routerContext.url) {
          res.status(302)
            .setHeader('Location', routerContext.url)
          res.end()
          return
        }
        const helmet = Helmet.rewind()
        const state = getStoreState(stores)
        const content = ReactDomServer.renderToString(app)

        const html = ejs.render(template, {
          appString: content,
          initialState: serialize(state),
          meta: helmet.meta.toString(),
          title: helmet.title.toString(),
          style: helmet.style.toString(),
          link: helmet.link.toString(),
          materialCss: sheetsRegistry.toString()
        })
        res.send(html)
        resolve()
      }).catch(reject)
  })
}
