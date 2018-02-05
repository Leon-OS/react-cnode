import React from 'react'
import Helmet from 'react-helmet'
import PropTypes from 'prop-types'
import marked from 'marked'
import {
  inject,
  observer,
} from 'mobx-react'
import { withStyles } from 'material-ui/styles'
import { CircularProgress } from 'material-ui/Progress'
import Paper from 'material-ui/Paper'
import Container from '../layout/container'
import { TopicStore } from '../../store/store'
import { topicDetailStyle } from './style'

@inject(stores => ({
  topicStore: stores.topicStore,
})) @observer
class TopicDetail extends React.Component {
  componentDidMount() {
    // do something here
    // this.props.topicStore.fetchTopics('all')
  }

  render() {
    const topic = this.props.topicStore.topics[0]
    const { classes } = this.props
    if (!topic) {
      return (
        <Container>
          <section className={classes.loadingContainer}>
            <CircularProgress />
          </section>
        </Container>
      )
    }
    return (
      <div>
        <Container>
          <Helmet>
            <title>{topic.title}</title>
          </Helmet>
          <header className={classes.header}>{topic.title}</header>
          <section className={classes.body}>
            <p dangerouslySetInnerHTML={{ __html: marked(topic.content) }} />
          </section>
        </Container>
        <Paper elevation={4} className={classes.replies}>
          <header className={classes.replyHeader}>
            <span>{topic.reply_count} 回复</span>
            <span>最新回复{topic.last_reply_at}</span>
          </header>
          <section>
            {
              topic.replies.map(reply => (
                <p dangerouslySetInnerHTML={{ __html: marked(reply.content) }} />
              ))
            }
          </section>
        </Paper>
      </div>
    )
  }
}

TopicDetail.wrappedComponent.propTypes = {
  topicStore: PropTypes.instanceOf(TopicStore).isRequired,
}

TopicDetail.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(topicDetailStyle)(TopicDetail)
