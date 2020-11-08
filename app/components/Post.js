import React from 'react';
import { Link } from 'react-router-dom'

function UserLink(props) {
  const { userName } = props
  return (
    <Link 
      className='' 
      to={{ 
        pathname: '/user', 
        search: `?id=${userName}`
      }}
    >
      {userName}
    </Link>
  )
}

export default class Post extends React.Component {
  render() {
    console.log("POST", this.props.post)
    const { post } = this.props
    const { by, kids, time, title } = post
    const date = new Date(time * 1000)
    const dateString = date.toLocaleDateString()
    const timeString = date.toLocaleTimeString()
    return (
      <li className='post'>
        <a className='link' href={post.url}>{title}</a>
        <div className='meta-info-light'>
          by <UserLink userName={by} /> on {dateString}, {timeString} with {kids && kids.length || 0} comments
        </div>
      </li>
    )  
  }
}
