import React from 'react';

import Post from './Post'
import Loading from './Loading'
import { getPosts } from '../utils/api'

export default class Feed extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      error: null,
      posts: []
    }

    this.fetchPosts = this.fetchPosts.bind(this)
    this.isLoading = this.isLoading.bind(this)
  }

  async fetchPosts() {
    try {
      const posts = await getPosts(this.props.match.url)
    
      this.setState({
        posts: posts,
        error: null
      })
    } catch (error) {
      this.setState({ error })
    }

  }

  isLoading() {
    return !this.state.posts && !this.state.error
  }

  componentDidMount() {
    this.fetchPosts()
  }

  render() {
    const { posts, error } = this.state

    return (
      <React.Fragment>
        { this.isLoading() && <Loading /> }
        { error && <p className='center-text error'>{error}</p>}
        { !this.isLoading() &&  posts.map(post => (
        <Post key={post.id.toString()} post={post} />
        ))}
      </React.Fragment>
    )
  }
}