/* eslint-disable no-param-reassign */
/**
 * Created by Maktub on 2018/2/3
 */
import axios from 'axios'

const baseUrl = process.env.API_BASE || ''

const parseUrl = (url, params) => {
  if (!params) {
    return `${baseUrl}/api${url}`
  }
  const query = Object.keys(params).reduce((result, key) => {
    result += `${key}=${params[key]}&`
    return result
  }, '')
  return `${baseUrl}/api${url}?${query.substr(0, query.length - 1)}`
}

export const get = (url, params) => new Promise((resolve, reject) => {
  axios.get(parseUrl(url, params))
    .then((resp) => {
      const { data } = resp
      if (data && data.success === true) {
        resolve(data)
      } else {
        reject(data)
      }
    })
    .catch(reject)
})

export const post = (url, params, datas) => new Promise((resolve, reject) => {
  axios.post(parseUrl(url, params), datas)
    .then((resp) => {
      const { data } = resp
      if (data && data.success === true) {
        resolve(data)
      } else {
        reject(data)
      }
    })
    .catch(reject)
})
