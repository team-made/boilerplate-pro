import React from 'react'
import ReactDOM from 'react-dom'
import List from './List'

// eslint-disable-next-line
it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<List />, div)
})
