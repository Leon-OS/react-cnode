/**
 * Created by Maktub on 2018/1/27
 */
import {
  observable,
  action,
  extendObservable,
} from 'mobx'
import { post } from '../util/http'

export default class AppState {
  constructor({ user = {} } = {}) {
    this.user = extendObservable(this.user, user)
  }

  @observable user = {
    isLogin: false,
    info: {},
  }

  @action login(accesstoken) {
    return new Promise((resolve, reject) => {
      post('/accesstoken', {}, { accesstoken }).then((resp) => {
        if (resp.success) {
          this.user.isLogin = true
          this.user.info = resp
          resolve(resp)
        } else {
          reject()
        }
      }).catch(reject)
    })
  }
}

