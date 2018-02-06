/**
 * Created by Maktub on 2018/1/28
 */
const router = require('express').Router()
const axios = require('axios')

const baseUrl = 'https://cnodejs.org/api/v1'

router.post('/login', function (req, res, next) {
  axios.post(`${baseUrl}/accesstoken`, {
    accesstoken: req.body.accessToken
  })
    .then(resq => {
      if (resq.status === 200 && resq.data.success) {
        req.session.user = {
          accessToken: req.body.accessToken,
          loginName: resq.data.loginname,
          avatarUrl: resq.data.avatar_url,
          id: resq.data.id
        }
      }
      res.json({
        success: true,
        data: resq.data
      })
    })
    .catch(err => {
      if (err.response) {
        req.json({
          success: false,
          data: err.response
        })
      } else {
        next(err) // 异常抛给全局处理器
      }
    })
})

module.exports = router
