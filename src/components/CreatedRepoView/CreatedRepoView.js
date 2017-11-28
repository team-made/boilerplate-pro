import React from 'react'
import './CreatedRepoView.css'
const CreatedRepoView = (props) => {
  return (
    <div className='box'>
      <article className='media'>
        <div className='media-content'>
          <div className='content'>
            <p>
              <strong>{props.userRepo.name}</strong>
              <span className='icon has-text-warning'>
                <i className='fa fa-star' /></span>{props.userRepo.stars}
              <br />
              {props.userRepo.description}
            </p>
          </div>
          <nav className='level is-mobile'>
            <div className='level-left'>
              <a href={`${props.githubLink}`} className='level-item'>
                <span className='icon is-small'>
                  <i className='fa fa-github' />
                </span>
              </a>
              <span className='ci-badge'>
                <img src={`https://travis-ci.org/${props.userName}/${props.userRepo.name}.svg?branch=master`} />
              </span>
              <a className='level-item'>
                <span className='icon is-small'>
                  <i className='fa fa-heart' />
                </span>
              </a>
            </div>
          </nav>
        </div>
      </article>
    </div>
  )
}

export default CreatedRepoView
