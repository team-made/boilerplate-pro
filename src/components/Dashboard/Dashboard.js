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
    <div class="container">
      <div class="tabs is-centered">
        <ul>
          <li>
            <a>Account</a>
          </li>
          <li class="is-active">
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
      <div class="box">
        <article class="media">

          <div class="media-content">
            <div class="content">
              <p>
                <strong>Name of Project</strong> <small>date?</small>
                <br />
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
                efficitur sit amet massa fringilla egestas. Nullam condimentum
                luctus turpis.
              </p>
            </div>
            <nav class="level is-mobile">
              <div class="level-left">
                <a class="level-item">
                  <span class="icon is-small">
                    <i class="fa fa-github" />
                  </span>
                </a>
                <a class="level-item">
                  <span class="icon is-small">
                    <i class="fa fa-retweet" />
                  </span>
                </a>
                <a class="level-item">
                  <span class="icon is-small">
                    <i class="fa fa-heart" />
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
