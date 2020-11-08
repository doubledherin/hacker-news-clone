import React from 'react';
import { Link } from 'react-router-dom'

function UserLink(props) {
  return (
    <Link 
      className='' 
      to={{ 
        pathname: '/user', 
        search: `?id=${props.userName}`
      }}
    />
  )
}

export default class Post extends React.Component {
  render() {
    const { post } = this.props
    const { by, kids, time, title } = post
    const date = new Date(time * 1000)
    const dateString = date.toLocaleDateString()
    const timeString = date.toLocaleTimeString()
    return (
      <li className='post'>
        <a className='link' href={post.url}>{title}</a>
        <div className='meta-info-light'>
          by <UserLink username={by} /> on {dateString}, {timeString} with {kids && kids.length || 0} comments
        </div>
      </li>
    )  
  }
}
