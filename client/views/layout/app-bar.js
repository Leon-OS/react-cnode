/**
 * Created by Maktub on 2018/2/1
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import { withStyles } from 'material-ui/styles'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'
import IconButton from 'material-ui/IconButton'
import HomeIcon from 'material-ui-icons/Home'

import { AppState } from '../../store/store'

const styles = {
  root: {
    width: '100%',
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
}

@withRouter
@inject(stores => ({
  appState: stores.appState,
}))
@observer
class MainAppBar extends Component {
  constructor() {
    super()
    this.loginButtonClick = this.loginButtonClick.bind(this)
    this.createButtonClick = this.createButtonClick.bind(this)
    this.onHomeIconClick = this.onHomeIconClick.bind(this)
  }


  onHomeIconClick() {
    this.props.history.push('/list?tab=all')
  }

  loginButtonClick() {
    if (this.props.appState.user.isLogin) {
      this.props.history.push('/user/info')
    } else {
      this.props.history.push('/user/login')
    }
  }

  /* eslint-disable */
  createButtonClick() {
    // do
  }
  /* eslint-enable */

  render() {
    const { classes, appState } = this.props
    const { info, isLogin } = appState.user
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu" onClick={this.onHomeIconClick}>
              <HomeIcon />
            </IconButton>
            <Typography type="title" color="inherit" className={classes.flex} >
              JNode
            </Typography>
            <Button raised onClick={this.createButtonClick}>新建话题</Button>
            <Button onClick={this.loginButtonClick}>{isLogin ? info.loginname : '登录'}</Button>
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}


MainAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object,
};

MainAppBar.wrappedComponent.propTypes = {
  appState: PropTypes.instanceOf(AppState).isRequired,
}

export default withStyles(styles)(MainAppBar)
