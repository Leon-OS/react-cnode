/**
 * Created by Maktub on 2018/2/3
 */

export const tabs = {
  all: '全部',
  share: '分享',
  job: '工作',
  ask: '问答',
  good: '精品',
  dev: '测试',
}

export const topicSchema = {
  id: '',
  author_id: '',
  tab: 'ask',
  content: '',
  title: '',
  last_reply_at: '',
  good: false,
  top: false,
  reply_count: 0,
  visit_count: 0,
  create_at: '',
  author: {
    loginname: '',
    avatar_url: '',
  },
  replies: [],
}

export const replySchema = {
  id: '',
  author: {
    loginname: '',
    avatar_url: '',
  },
  content: '',
  ups: [],
  create_at: '',
  reply_id: null,
  is_uped: false,
}

export default topicSchema
