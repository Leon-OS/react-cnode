/**
 * Created by Maktub on 2018/2/4
 */
import React from 'react'
import PropTypes from 'prop-types'
import marked from 'marked'
import dateFormat from 'dateformat'
import { withStyles } from 'material-ui/styles'
import Avatar from 'material-ui/Avatar'

import { replyStyle } from './style'


const Reply = ({ reply, classes }) => (
  <div className={classes.root}>
    <div className={classes.left}>
      <Avatar src={reply.author.avatar_url} />
    </div>
    <div className={classes.right}>
      <span>{`${reply.author.loginname} ${dateFormat(reply.create_at, 'yy-mm-dd')}`}</span>
      <p dangerouslySetInnerHTML={{ __html: marked(reply.content) }} />
    </div>
  </div>
)

Reply.propTypes = {
  classes: PropTypes.object.isRequired,
  reply: PropTypes.object.isRequired,
}

export default withStyles(replyStyle)(Reply)
