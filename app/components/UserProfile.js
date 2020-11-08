import React, { Component } from 'react';
import queryString from 'query-string'

import Post from './Post'
import Loading from './Loading'
import { getUser, getPost } from '../utils/api'
import { createMarkup } from '../utils/helpers'

class UserProfile extends Component {
  constructor(props) {
    super(props)

    this.state = {
      user: null,
      error: null,
      posts: []
    }

    this.fetchUser = this.fetchUser.bind(this)
    this.isLoading = this.isLoading.bind(this)
  }

  async fetchUser(userId) {
    const user = await getUser(userId)
    console.log("USER: ", user)
    const posts = await Promise.all(
      user.submitted.slice(0, 50).map(
        async postId => await getPost(postId)
      )
    )

    this.setState({ user, posts: posts.filter(post => post.type === 'story') })

  }

  isLoading() {
    return !this.state.user && !this.state.error 
  }

  componentDidMount() {
    try {
      const { id } = queryString.parse(this.props.location.search)
      this.fetchUser(id)
    } catch(error) {
      this.setState({ error, user: null })
    }
  }

  render() {

    if (this.isLoading()) {
      return <Loading />
    }
    const { about, created, karma, id, submitted } = this.state.user
    console.log("USER PROFILE PROPS", this.props)
    const date = new Date(created * 1000)
    const dateString = date.toLocaleDateString()
    const timeString = date.toLocaleTimeString()
    return (
      <React.Fragment>
        <h1 className='header'>
          {id}
        </h1>
        <div className='meta-info-light'>
          joined <strong>{dateString}</strong>, <strong>{timeString}</strong> has <strong>{karma.toLocaleString()}</strong> karma
        </div>
        { about && <p dangerouslySetInnerHTML={createMarkup(about)}/> }
        <h2>Posts</h2>
        { this.state.posts.length && this.state.posts.map(post => <Post key={post.id.toString()} post={post} />)}
      </React.Fragment>
    )
  }
}

export default UserProfile;