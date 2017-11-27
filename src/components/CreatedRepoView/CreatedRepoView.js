import React from 'react'

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
              <a className='level-item'>
                <span className='icon is-small'>
                  <i className='fa fa-retweet' />
                </span>
              </a>
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
