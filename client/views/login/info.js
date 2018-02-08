/**
 * Created by Maktub on 2018/2/6
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Grid from 'material-ui/Grid'
import Paper from 'material-ui/Paper'
import List, { ListItem, ListItemText } from 'material-ui/List'
import Avatar from 'material-ui/Avatar'
import Typography from 'material-ui/Typography'
import dateFormat from 'dateformat'
import { inject, observer } from 'mobx-react'
import { AppState } from '../../store/store'
import UserWrap from './user'
import userInfoStyle from './styles/user-info-style'

const TopicItem = ({ topic, onClick }) => (
  <ListItem button onClick={onClick}>
    <Avatar src={topic.author.avatar_url} />
    <ListItemText
      primary={topic.title}
      secondary={`最新回复：${dateFormat(topic.last_reply_at, 'yy-mm-dd')}`}
    />
  </ListItem>
)

TopicItem.propTypes = {
  topic: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
}

const TopicGrid = ({
  classes, title, topics = [], onClick,
}) => (
  <Grid item xs={4}>
    <Paper>
      <Typography className={classes.partTitle}>
        <span>{title}</span>
      </Typography>
      <List>
        { topics.map(topic => (<TopicItem
          topic={topic}
          key={topic.id}
          onClick={() => onClick(topic.id)}
        />)) }
      </List>
    </Paper>
  </Grid>
)

TopicGrid.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  topics: PropTypes.object,
  onClick: PropTypes.object.isRequired,
}

@inject(stores => ({
  appState: stores.appState,
})) @observer
class UserInfo extends Component {
  constructor() {
    super()
    this.goTopicDetail = this.goTopicDetail.bind(this)
  }

  componentDidMount() {
    const { appState } = this.props
    if (!appState.user.isLogin) {
      this.props.history.push('/user/login')
    } else {
      appState.getCollections()
      appState.getUserInfo()
    }
  }

  goTopicDetail(topicId) {
    this.props.history.push(`/detail/${topicId}`)
  }

  render() {
    const { classes, appState } = this.props
    const collections = appState.user.collection.list
    const { topics, replies } = appState.user.details

    return (
      <UserWrap>
        <div className={classes.root}>
          <Grid container spacing={24} align="stretch">
            <TopicGrid classes={classes} title="最近发布的话题" topics={topics} onClick={this.goTopicDetail} />
            <TopicGrid classes={classes} title="新的回复" topics={replies} onClick={this.goTopicDetail} />
            <TopicGrid classes={classes} title="收藏的话题" topics={collections} onClick={this.goTopicDetail} />
          </Grid>
        </div>
      </UserWrap>
    )
  }
}

UserInfo.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
}

UserInfo.wrappedComponent.propTypes = {
  appState: PropTypes.instanceOf(AppState).isRequired,
}

export default withStyles(userInfoStyle)(UserInfo)
