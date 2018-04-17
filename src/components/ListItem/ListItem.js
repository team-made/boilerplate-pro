import React from 'react'
import { Link } from 'react-router-dom'

const ListItem = ({ boilerplate }) => {
  console.log('boilerplate', boilerplate)
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
          <span className='tag is-light'>...</span>
          {boilerplate.uses &&
            boilerplate.uses.dependencies &&
            Object.keys(boilerplate.uses.dependencies)
              .slice(0, 3)
              .map(dep => <span className='tag is-light'>{dep}</span>)}
          {boilerplate.license && (
            <span className='tag is-info'>{boilerplate.license.name}</span>
          )}
          {boilerplate.language && (
            <span className='tag is-primary'>{boilerplate.language}</span>
          )}
        </span>
      </span>
    </Link>
  )
}

export default ListItem
