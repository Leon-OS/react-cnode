import React from 'react'
import {
  Route,
  Redirect,
} from 'react-router-dom'
import TopicList from '../views/topic-list/index'
import TopocDetail from '../views/topic-detail/index'
import TestApi from '../test/test-api'
import Login from '../views/login/login'
import UserInfo from '../views/login/info'

export default () => [
  <Route path="/" render={() => <Redirect to="/list" />} exact key="first" />,
  <Route path="/list" component={TopicList} key="list" />,
  <Route path="/detail/:id" component={TopocDetail} key="detail" />,
  <Route path="/user/login" component={Login} key="userLogin" />,
  <Route path="/user/info" component={UserInfo} key="userInfo" />,
  <Route path="/test" component={TestApi} key="test" />,
]
