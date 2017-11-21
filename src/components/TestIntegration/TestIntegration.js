import React from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { actions } from './index.js'
// import cors from 'cors'
// import functions from '../../functions'

const mapStateToProps = state => {
  return {
    ...state.TestIntegration,
    ...state.App,
    ...state.Builder
  }
}
const mapDispatchToProps = dispatch => {
  return {
    dummyAction: () => {
      dispatch(actions.dummyAction())
    }
  }
}

class TestIntegration extends React.Component {
  constructor (props) {
    super(props)
    this.handleTestInit = this.handleTestInit.bind(this)
  }

  handleTestInit () {
    // axios.post(
    //   'https://api.travis-ci.org/auth/github',
    //   {
    //     'github_token': '588e8c523b69cb0107e546e751b93b784cde4d9c'
    //   },
    //   {
    //     headers: {
    //       'Content-Type': 'application/json' }
    //   }
    // )
    //   .then(console.log)
    //   .catch(console.error)

    axios
      .put(
        'https://api.travis-ci.org/hooks',
        { hook: { id: 16284034, active: false } },
        {
          headers: {
            Authorization: 'token _-9IKX8v3b8wI5yO2H059A',
            'Content-Type': 'application/json'
          }
        }
      )
      .then(res => console.log(res))
  }

  render () {
    return (
      <div>
        <button onClick={this.handleTestInit} className='button'>
          Integrate with Travis Testing
        </button>
      </div>
    )
  }
}

const connectedTestIntegration = connect(mapStateToProps, mapDispatchToProps)(TestIntegration)

export default connectedTestIntegration

// console.log('check', this.props.user)
// axios.get('https://us-central1-boilerplate-pro.cloudfunctions.net/helloWorld').then(data => console.log('data: ', data))
//   axios
//     .post(
//       `https://us-central1-boilerplate-pro.cloudfunctions.net/travisRequest`,
//       { 'token': 'hello world' }
//     )
//     .then(res => console.log('token data: ', res.data))
// }

// const repoName = this.props.repoName
// const { githubToken } = this.props.user

// const config = {
//   headers: {
//     // 'Accept': 'application/vnd.travis-ci.2+json',
//     // 'User-Agent': 'MyClient/1.0.0',
//     // 'Host': 'api.travis-ci.org',
//     'Content-Type': 'application/json'
//   }
// }

// const data = {
//   github_token: githubToken
// }
// console.log(githubToken)
// axios.post(`https://api.travis-ci.org/auth/github`, data, config).then(result => {
//   console.log('result: ', result)
//   // cors(request, response, () => {
//   //   response.send(result.data)
//   // })
// })
//   .catch(console.error)
// const instance = axios.create()
// instance.defaults.headers.common['User-Agent'] = navigator.userAgent
// global.axios = instance
