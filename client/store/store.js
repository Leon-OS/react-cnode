/**
 * Created by Maktub on 2018/1/27
 */

import AppStateClass from './app-state'

export const AppState = AppStateClass

export default {
  AppState,
}

// for server render
export const createStoreMap = () => ({
  appState: new AppState(),
})
