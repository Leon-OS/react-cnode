/**
 * Created by Maktub on 2018/2/6
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import TextFiled from 'material-ui/TextField'
import Button from 'material-ui/Button'
import { inject, observer } from 'mobx-react'
import { AppState } from '../../store/store'
import UserWrapper from './user'
import loginStyle from './styles/login-style'

@inject(stores => ({
  appState: stores.appState,
}))
@observer
class Login extends Component {
  constructor() {
    super()
    this.state = {
      accesstoken: '',
      helpText: '',
    }
    this.handleLogin = this.handleLogin.bind(this)
    this.handleInput = this.handleInput.bind(this)
  }

  componentDidMount() {
    if (this.props.appState.user.isLogin) {
      this.props.history.replace('/user/info')
    }
  }

  handleLogin() {
    if (!this.state.accesstoken) {
      this.setState({
        helpText: '必须填写',
      })
      return
    }
    this.setState({
      helpText: '',
    })
    this.props.appState.login(this.state.accesstoken)
      .then(() => {
        this.props.history.replace('/user/info')
      })
  }

  handleInput(event) {
    this.setState({
      accesstoken: event.target.value.trim(),
    })
  }

  render() {
    const { classes } = this.props
    return (
      <UserWrapper>
        <div className={classes.root}>
          <TextFiled
            label="请输入Cnode AccessToken"
            required
            helperText={this.state.helpText}
            value={this.state.accesstoken}
            onChange={this.handleInput}
            className={classes.input}
          />
          <Button
            raised
            className={classes.loginButton}
            onClick={this.handleLogin}
          >登陆
          </Button>
        </div>
      </UserWrapper>
    )
  }
}

Login.wrappedComponent.propTypes = {
  appState: PropTypes.instanceOf(AppState).isRequired,
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
}

export default withStyles(loginStyle)(Login)
