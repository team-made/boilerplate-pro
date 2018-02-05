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

  }
}
class Bookmark extends Component {
  constructor (props) {
    super(props)
    this.state = {
      repo: null,
      isBookmarked: null
    }
    this.bookMarkCheck = this.bookMarkCheck.bind(this)
    this.isBookmarked = this.isBookmarked.bind(this)
  }
  bookMarkCheck (doc) {
    console.log(doc)
    if (doc.exists) {
      this.setState({isBookmarked: true})
    } else {
      this.setState({isBookmarked: false})
    }
  }

  isBookmarked () {
    firebase
      .firestore()
      .collection('users')
      .doc(this.props.user.uid)
      .collection('bookmarkedRepos')
      .doc(this.props.currentRepo.name)
      .get()
      .then(
        doc => {
          console.log('hey')
          this.bookMarkCheck(doc)
        }
      )
  }

  render () {
    if (this.props.user.uid && this.state.isBookmarked === null) {
      this.isBookmarked()
    }
    return (
      this.state.isBookmarked
        ? <i className='fa fa-bookmark' style={{ padding: '7px' }} /> : <i className='fa fa-bookmark-o' style={{ padding: '7px' }} />
    )
  }
}

const connectedBookmark = connect(mapStateToProps, mapDispatchToProps)(Bookmark)

export default connectedBookmark
