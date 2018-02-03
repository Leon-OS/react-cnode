/* eslint-disable react/require-default-props */
import React from 'react'
import {
  observer,
  inject,
} from 'mobx-react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import Tabs, { Tab } from 'material-ui/Tabs'
import List from 'material-ui/List'
import { CircularProgress } from 'material-ui/Progress'
import Container from '../layout/container'
import AppState from '../../store/app-state'
import TopicListItem from './list-item'
import TopicStore from '../../store/topic-store';

@inject(stores => ({
  appState: stores.appState,
  topicStore: stores.topicStore,
})) @observer
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
    const { topicStore } = this.props
    topicStore.fetchTopics()
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
    const { topics, syncing } = this.props.topicStore
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
        <List>
          {
            topics.map(topic => (
              <TopicListItem
                key={topic.id}
                onClick={this.onTopicItemClick}
                topic={topic}
              />))
          }
        </List>
        {
          syncing ?
            (
              <div>
                <CircularProgress size={100} />
              </div>
            ) : null
        }
      </Container>
    )
  }
}

TopicList.wrappedComponent.propTypes = {
  appState: PropTypes.instanceOf(AppState).isRequired,
  topicStore: PropTypes.instanceOf(TopicStore).isRequired,
}

