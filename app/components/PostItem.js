import React from 'react';


import CommentLink from './CommentLink'
import UserLink from './UserLink'
import { getDate, getTime } from '../utils/helpers'

export default class PostItem extends React.Component {

  render() {
    // debugger;
    const { post } = this.props
    const { by, kids, time, title } = post
    const dateString = getDate(time)
    const timeString = getTime(time)

    return (
      <React.Fragment> 
        <li className='post'>
          <a className='link' href={post.url}>{title}</a>
          <div className='meta-info-light'>
            by <UserLink userName={by} /> on {dateString}, {timeString} with <CommentLink post={post} /> comments
          </div>
        </li>
      </React.Fragment>
    )

  }
}
