/**
 * Created by Maktub on 2018/2/2
 */
import React from 'react'
import PropTypes from 'prop-types'
import Paper from 'material-ui/Paper'
import { withStyles } from 'material-ui/styles'

const styles = {
  root: {
    margin: 14,
  },
}

const Container = ({ classes, children }) => (
  <Paper elevation={2} className={classes.root}>
    {children}
  </Paper>
)

Container.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
  ]),
}

export default withStyles(styles)(Container)
