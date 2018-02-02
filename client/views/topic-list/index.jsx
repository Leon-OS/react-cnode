/* eslint-disable react/require-default-props */
import React from 'react'
import {
  observer,
  inject,
} from 'mobx-react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
// import Button from 'material-ui/Button'
import Tabs, { Tab } from 'material-ui/Tabs'
import Container from '../layout/container'
import AppState from '../../store/app-state'
import TopicListItem from './list-item'

@inject('appState') @observer
export default class TopicList extends React.Component {
  constructor() {
    super()
    this.state = {
      tabIndex: 0,
    }
    this.onTabclick = this.onTabclick.bind(this)
    this.onTopicItemClick = this.onTopicItemClick.bind(this)
  }

  componentDidMount() {
    // do something here
  }

  onTabclick(e, index) {
    this.setState({
      tabIndex: index,
    })
  }

  /* eslint-disable */
  onTopicItemClick() {

  }
  /* eslint-enable */

  asyncBootstrap() {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.props.appState.count = 3
        resolve(true)
      })
    })
  }

  render() {
    const { tabIndex } = this.state
    const topic = {
      tab: 'ask',
      reply_count: 3,
      visit_count: 83,
      create_at: '2018-02-02T02:13:54.184Z',
      title: 'flv.js 如何做直播功能',
      username: 'Maktub',
    }
    return (
      <Container>
        <Helmet>
          <title>This is topic list</title>
          <meta name="description" content="This is description" />
        </Helmet>
        <Tabs value={tabIndex} onChange={this.onTabclick}>
          <Tab label="全部" />
          <Tab label="分享" />
          <Tab label="工作" />
          <Tab label="问答" />
          <Tab label="精品" />
          <Tab label="测试" />
        </Tabs>
        <TopicListItem onClick={this.onTopicItemClick} topic={topic} />
      </Container>
    )
  }
}

TopicList.propTypes = {
  appState: PropTypes.instanceOf(AppState),
}

