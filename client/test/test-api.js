/* eslint-disable */
/**
 * Created by Maktub on 2018/1/28
 */
import React from 'react'
import axios from 'axios'

export default class TestApi extends React.Component {
  getTopic() {
    axios.get('/api/topics').then((res) => {
      console.log(res.data)
    }).catch((err) => {
      console.log(err)
    })
  }
  login() {
    axios.post('/api/user/login',{
      accessToken: '0bb5408f-f83f-4c53-9f0e-f76d30e23f05'
    }).then((res) => {
      console.log(res.data)
    }).catch((err) => {
      console.log(err)
    })
  }
  markall() {
    axios.post('/api/message/mark_all?needAccessToken=ture').then((res) => {
      console.log(res.data)
    }).catch((err) => {
      console.log(err)
    })
  }
  render() {
    return (
      <div>
        <button onClick={() => this.getTopic()} >topic</button>
        <button onClick={() => this.login()} >login</button>
        <button onClick={() => this.markall()} >markall</button>
      </div>
    )
  }
}

/* eslint-enabel */
