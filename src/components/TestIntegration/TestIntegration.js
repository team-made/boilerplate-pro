/* eslint-disable*/

import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { actions } from './index.js';
import {Link} from 'react-router-dom'

const mapStateToProps = state => {
  return {
    ...state.TestIntegration,
    ...state.App,
    ...state.Builder
  };
};
const mapDispatchToProps = dispatch => {
  return {
    dummyAction: () => {
      dispatch(actions.dummyAction());
    }
  };
};

class TestIntegration extends React.Component {
  componentDidMount () {
    let travisLoad = setInterval(() => {
      this.setState({enableBtn: true, btnMessage: 'Integrate With Travis Testing'});
  }, 1000)
  setTimeout(() => {
    clearInterval(travisLoad);
  }, 1100)
  }

  constructor(props) {
    super(props);
    this.state = {
      repoId: 1,
      btnMessage: 'Loading...',
      successMessage: '',
      enableBtn: false
    };
    this.handleTestInit = this.handleTestInit.bind(this);
    // this.repoNameTest = this.repoNameTest.bind(this)
  }

//   repoNameTest(){
//     console.log('Repo NAme: ', this.props.repoName)
// }
  async handleTestInit() {
    const { githubUsername, githubToken } = this.props.user;
    const repoName = this.props.repoName;
    const data = {token: githubToken,repo: repoName, username: githubUsername};
    console.log('github', githubToken);
    this.setState({btnMessage:'Loading...', enableBtn: false, successMessage: ''})
    await axios
      //.post(`https://boilerplate-pro-server.herokuapp.com/travis`, data)
      .post(`http://localhost:9090/travis`, data) //FOR LOCAL TESTING
      .then(travis => {
        console.log('Success: ', JSON.stringify(travis))
        this.setState({successMessage:'Successful Integration!', btnMessage: 'Complete', enableBtn: false})
    })
      .catch(err => {
        this.setState({successMessage:'Travis is still syncing, please try again!'})
        let travisLoad = setInterval(() => {
          this.setState({enableBtn: true, btnMessage: 'Integrate With Travis Testing'});
        }, 3000)
        setTimeout(() => {
          clearInterval(travisLoad);
        }, 3100)
        console.error('error caught: ', err) 
      });
  }

  render() {
    return (
      <div>
        <button type="button" disabled={!this.state.enableBtn} onClick={this.handleTestInit} className="button">
          {this.state.btnMessage}
        </button>
        <div>{this.state.successMessage}</div>
        <Link to="/deploy" className="button">
          To Deploy Page!
        </Link>
        {/* <button onClick={this.repoNameTest}>Check State Repo Name</button> */}
      </div>
    );
  }
}

const connectedTestIntegration = connect(mapStateToProps, mapDispatchToProps)(
  TestIntegration
);

export default connectedTestIntegration;
