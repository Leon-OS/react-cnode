/* eslint-disable no-param-reassign */
/**
 * Created by Maktub on 2018/2/3
 */
import {
  observable,
  extendObservable,
  action,
  computed,
} from 'mobx'
import { topicSchema } from '../util/varibale-schema';
import { get } from '../util/http'

const createTopic = topic => Object.assign({}, topicSchema, topic)

class Topic {
  constructor(data) {
    extendObservable(this, data)
  }
  @observable syncing = false
}

export default class TopicStore {
  @observable syncing
  @observable topics
  @observable details

  constructor({ syncing = false, topics = [], details = [] } = {}) {
    this.syncing = syncing
    this.topics = topics.map(topic => new Topic(createTopic(topic)))
    this.details = details.map(topic => new Topic(createTopic(topic)))
  }

  addTopic(topic) {
    this.topics.push(new Topic(createTopic(topic)))
  }

  @computed get detailMap() {
    return this.details.reduce((result, detail) => {
      result[detail.id] = detail
      return result
    }, {})
  }

  @action fetchTopics(tab) {
    this.topics = []
    return new Promise((resolve, reject) => {
      this.syncing = true
      get('/topics', {
        mdrender: false, // markdown不转译
        tab,
      }).then((resp) => {
        if (resp.success) {
          resp.data.forEach(topic => this.addTopic(topic))
          resolve()
        } else {
          reject()
        }
        this.syncing = false
      }).catch((err) => {
        reject(err)
        this.syncing = false
      })
    })
  }

  @action getTopicDetial(id) {
    return new Promise((resolve, reject) => {
      if (this.detailMap[id]) {
        resolve(this.detailMap[id])
      } else {
        get(`/topic/${id}`, {
          mdrender: false,
        }).then((resp) => {
          const topic = new Topic(createTopic(resp.data))
          if (resp.success) {
            this.details.push(topic)
            resolve(resp.data)
          } else {
            reject()
          }
        }).catch((err) => {
          reject(err)
        })
      }
    })
  }
}
