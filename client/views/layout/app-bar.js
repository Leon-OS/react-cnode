/**
 * Created by Maktub on 2018/2/1
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'
import IconButton from 'material-ui/IconButton'
import HomeIcon from 'material-ui-icons/Home'

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

class MainAppBar extends Component {
  constructor() {
    super()
    this.loginButtonClick = this.loginButtonClick.bind(this)
    this.createButtonClick = this.createButtonClick.bind(this)
    this.onHomeIconClick = this.onHomeIconClick.bind(this)
  }

  /* eslint-disable*/
  onHomeIconClick() {
    // do
  }

  loginButtonClick() {
    // do
  }

  createButtonClick() {
    // do
  }

  render() {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu" onIconClicked={this.onHomeIconClick}>
              <HomeIcon />
            </IconButton>
            <Typography type="title" color="inherit" className={classes.flex} >
              JNode
            </Typography>
            <Button raised color="accent" onClick={this.createButtonClick}>新建话题</Button>
            <Button color="contrast" onClick={this.loginButtonClick}>登陆</Button>
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}


MainAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MainAppBar);
