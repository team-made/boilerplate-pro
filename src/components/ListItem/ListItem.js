import React from 'react'
import { Link } from 'react-router-dom'

const ListItem = ({ boilerplate }) => {
  return (
    <Link to={`/repo/${boilerplate.full_name}`} className='panel-block'>
      <span className='panel-icon'>
        <i className='fa fa-code-fork' />
      </span>
      <span style={{ textAlign: 'left' }}>
        <h5 className='title is-5'>{boilerplate.name}</h5>
        <h6 className='subtitle is-6'>{boilerplate.owner.login}</h6>
      </span>
      <span style={{ marginLeft: 'auto', textAlign: 'right' }}>
        {boilerplate.stargazers_count}
        <span className='icon has-text-warning'>
          <i className='fa fa-star' />
        </span>
        <span className='tags'>
          <span className='tag is-light'>React</span>
          <span className='tag is-light'>Redux</span>
          <span className='tag is-light'>Other</span>
          <span className='tag is-light'>Etc</span>
          {boilerplate.language && (
            <span className='tag is-primary'>{boilerplate.language}</span>
          )}
        </span>
      </span>
    </Link>
  )
}

export default ListItem
