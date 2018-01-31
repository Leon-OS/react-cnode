/**
 * Created by Maktub on 2018/1/27
 */
import {
  observable,
  action,
  computed,
} from 'mobx'

export default class AppState {
  constructor({ count, name } = { count: 0, name: 'maktub' }) {
    this.count = count;
    this.name = name;
  }
  @observable count = 0
  @observable name = 'jack'

  @computed get msg() {
    return `${this.name} say count is ${this.count}`
  }

  @action add() {
    this.count += 1
  }

  @action changeName(name) {
    this.name = name
  }

  toJson() {
    return {
      count: this.count,
      name: this.name,
    }
  }
}

