/**
 * Created by Maktub on 2018/1/27
 */
import {
  observable,
  action,
  transaction,
  extendObservable,
} from 'mobx'
import { get, post } from '../util/http'


export default class AppState {
  constructor({ user = {} } = {}) {
    this.user = extendObservable(this.user, user)
  }

  @observable
  user = {
    isLogin: false,
    info: {},
    collection: {
      syncing: false,
      list: [],
    },
    details: {
      syncing: false,
      topics: [],
      replies: [],
    },
  }

  @action login(accesstoken) {
    return new Promise((resolve, reject) => {
      post('/accesstoken', {}, { accesstoken }).then((resp) => {
        if (resp.success) {
          transaction(() => {
            this.user.isLogin = true
            this.user.info = resp
          })
          resolve(resp)
        } else {
          reject()
        }
      }).catch(reject)
    })
  }

  @action getCollections() {
    this.user.collection.syncing = true
    this.user.collection.list = []
    return new Promise((resolve, reject) => {
      get(`/topic_collect/${this.user.info.loginname}`)
        .then((resp) => {
          if (resp.success) {
            this.user.collection.list = resp.data
            resolve(resp)
          } else {
            reject()
          }
          this.user.collection.syncing = false
        })
        .catch((err) => {
          this.user.collection.syncing = false
          reject(err)
        })
    })
  }

  @action getUserInfo() {
    this.user.details.syncing = true
    this.user.details.topics = []
    this.user.details.replies = []
    return new Promise((resolve, reject) => {
      get(`/user/${this.user.info.loginname}`)
        .then((resp) => {
          if (resp.success) {
            this.user.details.topics = resp.data.recent_topics
            this.user.details.replies = resp.data.recent_replies
            resolve(resp)
          } else {
            reject()
          }
          this.user.details.syncing = false
        })
        .catch((err) => {
          this.user.details.syncing = false
          reject(err)
        })
    })
  }
}

