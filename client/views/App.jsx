import React from 'react'
import Routes from '../config/route'
import MainAppBar from './layout/app-bar'

export default class App extends React.Component {
  componentDidMount() {
    // dosomething
  }

  render() {
    return (
      <div>
        <MainAppBar />
        <Routes />
      </div>
    )
  }
}
