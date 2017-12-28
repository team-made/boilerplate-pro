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
    // makeBookmark: () => {
    //   dispatch(actions.userBookmarkAction())
    // },
    getBookmark: (userName, currentRepo) => {
      // dispatch(actions.findBookmark({
      //   isBookmarked: true
      // }))
      return firebase
        .firestore()
        .collection('users')
        .where('githubUsername', '==', userName)
        .collection('bookmarkedRepos')
        .then(console.log('got here'))
        .doc(currentRepo.name)
        .get()
        // get the document that is named after a repo
        .then(
          doc => {
            if (doc.exists) {
              console.log('it exists')
              dispatch(actions.findBookmark({
                isBookmarked: true
              }))
            } else {
              console.log('nope')
              dispatch(actions.findBookmark({
                isBookmarked: false
              }))
            }
          }
        )
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
    console.log(this.props)
    return (
      <i className='fa fa-bookmark' style={{ padding: '7px' }} />
    )
  }
}

const connectedBookmark = connect(mapStateToProps, mapDispatchToProps)(Bookmark)

export default connectedBookmark
