import React from 'react';
import { Link } from 'react-router-dom'

import { getPosts } from '../utils/api'

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
function Post({ post }) {
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

export default class Posts extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      error: null,
      loading: true,
      posts: []
    }

    this.fetchPosts = this.fetchPosts.bind(this)
  }

  async fetchPosts() {

    const posts = await getPosts(this.props.match.url)
    
    this.setState({
      loading: false,
      posts: posts,
      error: null
    })
  }

  componentDidMount() {
    try {
      this.fetchPosts()
    } catch(error) {
      this.setState({
        error,
        loading: false
      })
    }
  }

  render() {
    const { posts, loading, error } = this.state

    if (loading) {
      return <div>LOADING</div>
    }
    if (error) {
      return <div></div>
    }
    return posts.length ? (posts.map(post => (
        <Post key={post.id.toString()} post={post} />
      ))) : (<div>LOADING</div>)
    }
}

