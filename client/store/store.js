/**
 * Created by Maktub on 2018/1/27
 */

import AppState from './app-state'
import TopicStore from './topic-store'


export default {
  AppState,
  TopicStore,
}

export { AppState, TopicStore }

// for server render
export const createStoreMap = () => ({
  appState: new AppState(),
  topicStore: new TopicStore(),
})
