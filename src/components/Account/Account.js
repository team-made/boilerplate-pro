import React, { Component } from 'react'
import { connect } from 'react-redux'
import { components } from '../components'
import { actions } from './index.js'

const mapStateToProps = (state) => {
  return {
    ...state.Account,
    ...state.App
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    dummyAction: () => {
      dispatch(actions.dummyAction())
    }
  }
}
class Account extends React.Component {
  constructor (props) {
    super(props)
    this.state = {

    }
  }
  render () {
    console.log(this.props)
    return (
      <div>
        <div className='tile is-ancestor'>
          <div className='tile'>
            <div className='tile'>
              <div className='tile is-parent'>
                <article className='tile is-child notification is-primary'>
                  <p className='title'>Information</p>

                </article>
                <article className='tile is-child notification is-info'>
                  <p className='title'>Your email</p>

                  <figure style={{fontSize: 25 + 'px'}}>
                    {this.props.user.email}
                  </figure>
                </article>
                <article className='tile is-child notification is-info'>
                  <p className='title'>Your Github Username</p>
                  <figure style={{fontSize: 25 + 'px'}}>
                    {this.props.user.githubUsername}
                  </figure>
                </article>
              </div>

            </div>

          </div>

        </div>
      </div>

    )
  }
}

const connectedAccount = connect(mapStateToProps, mapDispatchToProps)(Account)

export default connectedAccount

// <div>
//   <div>
//   Your Email Address
//     <p>{this.props.user.email}</p>
//   </div>

//   <div>
//   Your Github Username
//   <p>{this.props.user.githubUsername}</p>
//   </div>
// </div>
