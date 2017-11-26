import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import firebase from 'firebase'
import 'firebase/firestore'

import { actions } from './index.js'
import { components } from '../components'

const mapStateToProps = state => {
  return {
    ...state.SingleRepo
  }
}
const mapDispatchToProps = dispatch => {
  return {
    setCurrentRepo: (name, owner) => {
      firebase
        .firestore()
        .collection('boilerplates')
        .where('name', '==', name)
        .where('owner.login', '==', owner)
        .get()
        .then(snapshot => {
          snapshot.forEach(doc =>
            dispatch(actions.setCurrentRepo({ currentRepo: doc.data() }))
          )
        })
        .catch(console.error)
    }
  }
}

class SingleRepo extends Component {
  componentDidMount () {
    this.props.setCurrentRepo(
      this.props.match.params.name,
      this.props.match.params.owner
    )
  }
  render () {
    const repo = this.props.currentRepo
    return !repo.name ? (
      <components.Spinner />
    ) : (
      <section className='section'>
        <div
          className='container'
          style={{
            textAlign: 'left',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}
        >
          <div>
            <h1 className='title'>{repo.name}</h1>
            <h2 className='subtitle'>{repo.owner.login}</h2>
            <p>{repo.description}</p>
          </div>
          <nav className='panel'>
            <p className='panel-heading'>Build Menu</p>
            <div className='panel-block'>Settings</div>
            <div className='panel-block'>
              <Link
                to={`/builder/${repo.owner.login}/${repo.name}`}
                className='button is-link is-outlined is-fullwidth'
              >
                BUILD
              </Link>
            </div>
          </nav>
        </div>
        <div className='container'>README GOES HERE</div>
      </section>
    )
  }
}

const connectedSingleRepo = connect(mapStateToProps, mapDispatchToProps)(
  SingleRepo
)

export default connectedSingleRepo
