/**
 * Created by Maktub on 2018/2/3
 */
import {
  observable,
  extendObservable,
  action,
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

  constructor({ syncing, topics } = { syncing: false, topics: [] }) {
    this.syncing = syncing
    this.topics = topics.map(topic => new Topic(createTopic(topic)))
  }

  addTopic(topic) {
    this.topics.push(new Topic(createTopic(topic)))
  }

  @action fetchTopics(tab) {
    this.topics = []
    return new Promise((resolve, reject) => {
      this.syncing = true
      get('topics', {
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
}
