import React from 'react'
import {
  Route,
  Redirect,
} from 'react-router-dom'
import TopicList from '../views/topic-list/index'
import TopocDetail from '../views/topic-detail/index'
import TestApi from '../test/test-api'

export default () => [
  <Route path="/" render={() => <Redirect to="/list" />} exact key="first" />,
  <Route path="/list" component={TopicList} key="list" />,
  <Route path="/detail/:id" component={TopocDetail} key="detail" />,
  <Route path="/test" component={TestApi} key="test" />,
]
