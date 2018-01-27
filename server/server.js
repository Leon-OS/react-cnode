/**
 * Created by Maktub on 2018/1/18
 */

const express = require('express')
const favicon = require('serve-favicon')
const ReactSSR = require('react-dom/server')
const bodyParser = require('body-parser')
const session = require('express-session')
const fs = require('fs')
const path = require('path')

const isDev = process.env.NODE_ENV === 'development'

const app = express()

app.use(bodyParser.json())
// parsing the URL-encoded data with the querystring library (when false)
app.use(bodyParser.urlencoded({extended: false}))

app.use(session({
  maxAge: 10 * 60 * 1000,
  name: 'tid',
  resave: false, // 每次请求是否要生成cookieID
  saveUninitialized: false,
  secret: 'react cnode js' // 加密cookie
}))

app.use(favicon(path.join(__dirname, '../favicon.ico')))

app.use('/api/user', require('./util/user-login'))
app.use('/api', require('./util/proxy'))

if (!isDev) {
  const serverEntry = require('../dist/server-entry').default
  const template = fs.readFileSync(path.join(__dirname, '../dist/index.html'), 'utf8')
  // 区分什么返回静态文件夹，什么返回动态
  app.use('/public', express.static(path.join(__dirname, '../dist')))
  app.get('*', function (req, res) {
    const appString = ReactSSR.renderToString(serverEntry)
    res.send(template.replace('<!--app-->', appString))
  })
} else {
  const devStatic = require('./util/dev-static')
  devStatic(app)
}

app.listen(3333, function () {
  console.log('server is listening on 3333')
})
