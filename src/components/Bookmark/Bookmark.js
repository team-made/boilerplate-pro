import React, { Component } from 'react'
import { connect } from 'react-redux'
import firebase from 'firebase'
import 'firebase/firestore'
import { actions } from './index.js'
// TODO:
// 1. check to see if user bookmark list includes currentRepo which will come in from props
// 2. set state to bookmarked: true or bookmarked: false
// 2. if currentRepo does exist on the user's list, render fa-bookmark else render fa-bookmark-o
// 3. onClick the bookmark button should add currentRepo reference to user's db/firestore/whatever or remove it, depending
// 4. this should also set the state which will cause a re-render.
const mapStateToProps = (state) => {
  return {
    ...state.Bookmark,
    ...state.App,
    ...state.SingleRepo
  }
}
const mapDispatchToProps = dispatch => {
  return {
    makeBookmark: () => {
      dispatch(actions.userBookmarkAction())
    },
    getBookmark: (userName, currentRepo) => {
      return firebase
        .firestore()
        .collection('users')
        .where('githubUsername', '==', userName)
        .collection('bookmarkedRepos')
        .where('name', '==', currentRepo.name)
        .get()
        .then(snapshot => {
          console.log(snapshot)
          snapshot.forEach(doc => {
            if (doc) {
              dispatch(actions.getBookmark({
                isBookmarked: true
              }))
            } else {
              dispatch(actions.getBookmark({
                isBookmarked: false
              }))
            }
          })
        })
        .catch(console.error)
        // currentRepo and userName are passed in.
    }
  }
}
class Bookmark extends Component {
  constructor (props) {
    super(props)
    this.state = {
      repo: null
    }
  }
  componentDidMount () {
    this.props.getBookmark(
      this.props.user,
      this.props.currentRepo
    )
  }
  render () {
    console.log(this.state)
    return (
      <i className='fa fa-bookmark' style={{ padding: '7px' }} />
    )
  }
}

const connectedBookmark = connect(mapStateToProps, mapDispatchToProps)(Bookmark)

export default connectedBookmark
