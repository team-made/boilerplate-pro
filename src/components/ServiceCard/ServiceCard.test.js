import React from 'react'
import ReactDOM from 'react-dom'
import ServiceCard from './ServiceCard'

// eslint-disable-next-line
it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<ServiceCard />, div)
})
