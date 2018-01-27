import React from 'react'
import { Link } from 'react-router-dom'
import Routes from '../config/route'

export default class App extends React.Component {
  componentDidMount() {
    // dosomething
  }

  render() {
    return (
      <div>
        <div>
          <Link to="/list">首页</Link>
          <br />
          <Link to="/detail">最终页</Link>
        </div>
        <Routes />
      </div>
    )
  }
}
