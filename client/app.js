/**
 * Created by Maktub on 2018/1/18
 */
import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader' // eslint-disable-line
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'mobx-react'
import App from './views/App'
import AppState from './store/app-state'

// ReactDOM.hydrate(<App/>, document.getElementById('root'));

const root = document.getElementById('root');
const render = (Component) => {
  ReactDOM.hydrate(
    <AppContainer>
      <Provider appState={new AppState()}>
        <BrowserRouter>
          <Component />
        </BrowserRouter>
      </Provider>
    </AppContainer>,
    root,
  )
};

render(App);

if (module.hot) {
  module.hot.accept('./views/App', () => {
    const NextApp = require('./views/App').default;
    // ReactDOM.hydrate(<NextApp/>, document.getElementById("root"))
    render(NextApp)
  })
}
