/**
 * Created by Maktub on 2018/2/6
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Avatar from 'material-ui/Avatar'
import { withStyles } from 'material-ui/styles'
import AvatarIcon from 'material-ui-icons/AccountCircle'
import { inject, observer } from 'mobx-react'
import { AppState } from '../../store/store'
import Container from '../layout/container'
import userStyle from './styles/user-style'

@inject(stores => ({
  appState: stores.appState,
}))
@observer
class User extends Component {
  componentDidMount() {
    // do something
  }

  render() {
    const { classes, appState } = this.props
    const { info, isLogin } = appState.user
    return (
      <Container>
        <div className={classes.avatar}>
          <div className={classes.bg} />
          {
            info.avatar_url ?
              <Avatar className={classes.avatarImg} src={info.avatar_url} /> :
              (
                <Avatar className={classes.avatarImg}>
                  <AvatarIcon />
                </Avatar>
              )
          }
          <span className={classes.userName}>{isLogin ? info.loginname : '未登录'}</span>
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

User.wrappedComponent.propTypes = {
  appState: PropTypes.instanceOf(AppState).isRequired,
}

export default withStyles(userStyle)(User)
