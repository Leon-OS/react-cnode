/**
 * Created by Maktub on 2018/1/18
 */

const express = require('express');
const ReactSSR = require('react-dom/server');
const fs = require('fs');
const path = require('path');
const serverEntry = require('../dist/server-entry').default;

const template = fs.readFileSync(path.join(__dirname, '../dist/index.html'), 'utf8');

const app = express();

// 区分什么返回静态文件夹，什么返回动态
app.use('/public', express.static(path.join(__dirname, '../dist')));

app.get('*', function (req, res) {
	const appString = ReactSSR.renderToString(serverEntry);
	console.log(appString)
	res.send(template.replace('<!--app-->', appString))
});


app.listen(3333, function () {
	console.log('server is listening on 3333')
});
