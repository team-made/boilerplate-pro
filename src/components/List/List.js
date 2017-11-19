import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { actions } from './index.js'

const mapStateToProps = state => {
  return {
    ...state.List
  }
}
const mapDispatchToProps = dispatch => {
  return {
    dummyAction: () => {
      dispatch(actions.dummyAction())
    }
  }
}
const List = () => {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 12, 3]
  return (
    <div className='container'>
      <nav className='panel'>
        <p className='panel-heading'>repositories</p>
        <div className='panel-block'>
          <p className='control has-icons-left'>
            <input
              className='input is-small'
              type='text'
              placeholder='search'
            />
          </p>
        </div>
        <p className='panel-tabs'>
          <a className='is-active'>all</a>
          <a>Javascript</a>
          <a>CSS</a>
          <a>PHP</a>
          <a>HTML</a>
          <a>Python</a>
          <a>TypeScript</a>
          <a>Ruby</a>
        </p>
        <Link to='/builder' className='panel-block is-active'>
          <span className='panel-icon'>
            <i className='fa fa-book' />
          </span>
          test: CLICK THIS ONE
        </Link>
        <a className='panel-block'>
          <span className='panel-icon'>
            <i className='fa fa-book' />
          </span>
          marksheet
        </a>
        <a className='panel-block'>
          <span className='panel-icon'>
            <i className='fa fa-book' />
          </span>
          minireset.css
        </a>
        <a className='panel-block'>
          <span className='panel-icon'>
            <i className='fa fa-book' />
          </span>
          jgthms.github.io
        </a>
        <a className='panel-block'>
          <span className='panel-icon'>
            <i className='fa fa-code-fork' />
          </span>
          daniellowtw/infboard
        </a>
        <a className='panel-block'>
          <span className='panel-icon'>
            <i className='fa fa-code-fork' />
          </span>
          mojs
        </a>
        {arr.map((el, idx) => (
          <a key={idx} className='panel-block'>
            <span className='panel-icon'>
              <i className='fa fa-code-fork' />
            </span>
            mojs
          </a>
        ))}
      </nav>
    </div>
  )
}

const connectedList = connect(mapStateToProps, mapDispatchToProps)(List)

export default connectedList
