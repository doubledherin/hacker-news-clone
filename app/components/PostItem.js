import React from 'react';

import UserLink from './UserLink'

export default class PostItem extends React.Component {

  render() {
    // debugger;
    const { post } = this.props
    const { by, kids, time, title } = post
    const date = new Date(time * 1000)
    const dateString = date.toLocaleDateString()
    const timeString = date.toLocaleTimeString()

    return (
      <React.Fragment> 
        <li className='post'>
          <a className='link' href={post.url}>{title}</a>
          <div className='meta-info-light'>
            by <UserLink userName={by} /> on {dateString}, {timeString} with {kids && kids.length || 0} comments
          </div>
        </li>
      </React.Fragment>
    )

  }
}
