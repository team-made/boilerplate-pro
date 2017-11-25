import React from 'react'
import ReactDOM from 'react-dom'
import ListItem from './ListItem'

// eslint-disable-next-line
it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<ListItem />, div)
})
