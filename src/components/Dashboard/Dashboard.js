/* eslint-disable */
import React from 'react'
import { connect } from 'react-redux'

import { actions } from './index.js'

const mapStateToProps = state => {
  return {
    ...state.Dashboard
  }
}
const mapDispatchToProps = dispatch => {
  return {
    dummyAction: () => {
      dispatch(actions.dummyAction())
    }
  }
}

const Dashboard = () => {
  return (
    <div className="container">
      <div className="tabs is-centered">
        <ul>
          <li>
            <a>Account</a>
          </li>
          <li className="is-active">
            <a>Previous Builds</a>
          </li>
          <li>
            <a>Starred Boilerplates</a>
          </li>
          <li>
            <a>Saved Configurations</a>
          </li>
        </ul>
      </div>
      <div className="box">
        <article className="media">

          <div className="media-content">
            <div className="content">
              <p>
                <strong>Name of Project</strong> <small>date?</small>
                <br />
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
                efficitur sit amet massa fringilla egestas. Nullam condimentum
                luctus turpis.
              </p>
            </div>
            <nav className="level is-mobile">
              <div className="level-left">
                <a className="level-item">
                  <span className="icon is-small">
                    <i className="fa fa-github" />
                  </span>
                </a>
                <a className="level-item">
                  <span className="icon is-small">
                    <i className="fa fa-retweet" />
                  </span>
                </a>
                <a className="level-item">
                  <span className="icon is-small">
                    <i className="fa fa-heart" />
                  </span>
                </a>
              </div>
            </nav>
          </div>
        </article>
      </div>
    </div>
  )
}

const connectedDashboard = connect(mapStateToProps, mapDispatchToProps)(
  Dashboard
)

export default connectedDashboard
