import React from 'react'
import { history } from '../components'
import './Profit.css'

const Profit = () => {
  return (
    <ul
      className='Profit'
      style={{ cursor: 'pointer' }}
      onClick={() => history.push('/')}
    >
      <li className='Profit' />
      <li className='Profit' />
      <li className='Profit' />
      <li className='Profit' />
    </ul>
  )
}

export default Profit
