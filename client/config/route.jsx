import React from 'react'
import {
  Route,
  Redirect,
} from 'react-router-dom'
import TopicList from '../views/topic-list/index'
import TopocDetail from '../views/topic-detail/index'

export default () => [
  <Route path="/" render={() => <Redirect to="/list" />} exact key="first" />,
  <Route path="/list" component={TopicList} key="list" />,
  <Route path="/detail" component={TopocDetail} key="detail" />,
]
