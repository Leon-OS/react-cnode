/* eslint-disable react/require-default-props */
import React from 'react'
import {
  observer,
  inject,
} from 'mobx-react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import queryString from 'query-string'

import Tabs, { Tab } from 'material-ui/Tabs'
import List from 'material-ui/List'
import { CircularProgress } from 'material-ui/Progress'
import Container from '../layout/container'
import AppState from '../../store/app-state'
import TopicListItem from './list-item'
import TopicStore from '../../store/topic-store'
import { tabs } from '../../util/varibale-schema'


@inject(stores => ({
  appState: stores.appState,
  topicStore: stores.topicStore,
})) @observer
export default class TopicList extends React.Component {
  constructor() {
    super()
    this.onTabclick = this.onTabclick.bind(this)
    this.onTopicItemClick = this.onTopicItemClick.bind(this)
  }

  componentDidMount() {
    const tab = this.getTab()
    this.props.topicStore.fetchTopics(tab)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.search !== this.props.location.search) {
      const tab = this.getTab(nextProps.location.search)
      this.props.topicStore.fetchTopics(tab)
    }
  }

  onTabclick(e, value) {
    this.props.history.push({
      pathname: '/list',
      search: `?tab=${value}`,
    })
  }

  onTopicItemClick(topic) {
    this.props.history.push({
      pathname: `/detail/${topic.id}`,
    })
  }

  getTab(search) {
    const tabQ = search || this.props.location.search
    const query = queryString.parse(tabQ)
    return query.tab || 'all'
  }

  asyncBootstrap() {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.props.appState.count = 3
        resolve(true)
      })
    })
  }

  render() {
    const { topics, syncing } = this.props.topicStore
    const currentTab = this.getTab()
    return (
      <Container>
        <Helmet>
          <title>This is topic list</title>
          <meta name="description" content="This is description" />
        </Helmet>
        <Tabs value={currentTab} onChange={this.onTabclick}>
          {
            Object.keys(tabs).map(tab => (<Tab label={tabs[tab]} value={tab} key={tab} />))
          }
        </Tabs>
        <List>
          {
            topics.map(topic => (
              <TopicListItem
                key={topic.id}
                onClick={() => this.onTopicItemClick(topic)}
                topic={topic}
              />))
          }
        </List>
        {
          syncing ?
            (
              <div style={{
                display: 'flex',
                justifyContent: 'space-around',
              }}
              >
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

TopicList.propTypes = {
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
}

