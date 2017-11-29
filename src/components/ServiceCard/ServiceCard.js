import React from 'react'
import './ServiceCard.css'

const ServiceCard = ({ name, logo, handleSwitchState, description }) => {
  return (
    <article className='media'>
      <figure className='media-left'>
        <p className='image is-64x64'>
          <img src={logo} />
        </p>
      </figure>
      <div className='media-content'>
        <div className='content'>
          <p>
            <strong>{name}</strong>
            <br />
            {description}
          </p>
        </div>
      </div>
      <div className='media-right'>
        <label className='switch'>
          <input type='checkbox' onChange={handleSwitchState} />
          <span className='slider round' />
        </label>
      </div>
    </article>
  )
}

export default ServiceCard
