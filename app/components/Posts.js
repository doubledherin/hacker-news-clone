import React from 'react';

import { getTopPosts, getPost } from '../utils/api'

function Post({ post }) {
  const { by, id, kids, time, title } = post
  const key = id.toString()
  const date = new Date(time * 1000)
  const dateString = date.toLocaleDateString()
  const timeString = date.toLocaleTimeString()
  return (
    <li className='post'>
      <a className='link' href={post.url}>{title}</a>
      <div className='meta-info-light'>
        by {by} on {dateString}, {timeString} with {kids && kids.length || 0} comments
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
  }

  componentDidMount() {
    getTopPosts()
      .then(postIds => {
        postIds.slice(0, 50).map(postId => {
          getPost(postId).then(post => this.setState(previousState => { return {
            ...previousState,
            posts: previousState.posts.concat(post)
          }}))
        })
      })
      .catch(err => {
        console.log("ERROR", err)
        this.setState({
          error: err
        })
      })

  }


  render() {
    return this.state.posts.length ? (this.state.posts.map(post => (
        <Post key={post.id.toString()} post={post} />
      ))) : (<div>LOADING</div>)
    }
}

