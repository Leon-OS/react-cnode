/**
 * Created by Maktub on 2018/2/2
 */
import React from 'react'
import PropTypes from 'prop-types'
import { ListItem, ListItemAvatar, ListItemText } from 'material-ui/List'
import Avatar from 'material-ui/Avatar'
import ImageIcon from 'material-ui-icons/Image';
import { withStyles } from 'material-ui/styles'
import { topicPrimaryStyle, topicSecondaryStyle } from './style'

const Primary = ({ classes, topic }) => (
  <div className={classes.root}>
    <span className={classes.tab}>{topic.tab}</span>
    <span className={classes.title}>{topic.title}</span>
  </div>
)

const Secondary = ({ classes, topic }) => (
  <div className={classes.root}>
    <span className={classes.userName}>{topic.username}</span>
    <span className={classes.count}>
      <span className={classes.accentColor}>{topic.reply_count}</span>
      <span>/</span>
      <span>{topic.visit_count}</span>
    </span>
    <span>创建时间：{topic.create_at}</span>
  </div>
)

const TopicPrimaryStyle = withStyles(topicPrimaryStyle)(Primary)
const TopicSecondaryStyle = withStyles(topicSecondaryStyle)(Secondary)

const TopicListItem = ({ onClick, topic }) => (
  <ListItem button onclick={onClick}>
    <ListItemAvatar>
      <Avatar src={topic.image}>
        <ImageIcon />
      </Avatar>
    </ListItemAvatar>
    <ListItemText
      primary={<TopicPrimaryStyle topic={topic} />}
      secondary={<TopicSecondaryStyle topic={topic} />}
    />
  </ListItem>
)

Primary.propTypes = {
  topic: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
}

Secondary.propTypes = {
  topic: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
}

TopicListItem.propTypes = {
  onClick: PropTypes.func.isRequired,
  topic: PropTypes.object.isRequired,
}

export default TopicListItem
