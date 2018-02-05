import React from 'react'
import Helmet from 'react-helmet'
import PropTypes from 'prop-types'
import marked from 'marked'
import dateFormat from 'dateformat'
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
import Reply from './reply';

@inject(stores => ({
  topicStore: stores.topicStore,
})) @observer
class TopicDetail extends React.Component {
  componentDidMount() {
    // do something here
    const { id } = this.props.match.params
    this.props.topicStore.getTopicDetial(id)
  }

  render() {
    const { id } = this.props.match.params
    const topic = this.props.topicStore.detailMap[id]
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
        <Paper elevation={4}>
          <header className={classes.replyHeader}>
            <span>{topic.reply_count} 回复</span>
            <span>最新回复 {dateFormat(topic.last_reply_at, 'yy-mm-dd HH:MM:ss')}</span>
          </header>
          <section>
            {
              topic.replies.map(reply => (
                <Reply reply={reply} key={reply.id} />
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
  match: PropTypes.object.isRequired,
}

export default withStyles(topicDetailStyle)(TopicDetail)
