/**
 * Created by Maktub on 2018/2/6
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Avatar from 'material-ui/Avatar'
import { withStyles } from 'material-ui/styles'
import AvatarIcon from 'material-ui-icons/AccountCircle'
import Container from '../layout/container'
import userStyle from './styles/user-style'

class User extends Component {
  componentDidMount() {
    // do something
  }

  render() {
    const { classes } = this.props
    const user = {}
    return (
      <Container>
        <div className={classes.avatar}>
          <div className={classes.bg} />
          {
            user.avatar_url ? <Avatar className={classes.avatarImg} src={user.avatar_url} /> : (
              <Avatar className={classes.avatarImg}>
                <AvatarIcon />
              </Avatar>
            )
          }
          <span className={classes.userame}>未登录</span>
        </div>
        {this.props.children}
      </Container>
    )
  }
}

User.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.element.isRequired,
}

export default withStyles(userStyle)(User)
