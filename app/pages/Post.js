import React from 'react'
import queryString from 'query-string'

import { getPost } from '../utils/api'
import PostItem from '../components/PostItem'
import Loading from '../components/Loading'
import Comment from '../components/Comment'

export default class Post extends React.Component {
  constructor(props) {
    super(props)
    
    this.state = {
      post: null,
      error: null
    }

    this.fetchPost = this.fetchPost.bind(this)
    this.isLoading = this.isLoading.bind(this)
  }

  isLoading() {
    return !this.state.post && !this.state.error
  }

  async fetchPost(postId) {
    const post = await getPost(postId)
    this.setState({ post })
  }

  componentDidMount() {
    try {
      const { id } = queryString.parse(this.props.location.search)
      this.fetchPost(id)
    } catch(error) {
      this.setState({ error, post: null })
    }
  }

  render() {
    if (this.isLoading()) {
      return <Loading />
    }
    const { post } = this.state
    return (
      <React.Fragment>
        <PostItem post={post} />
        { post.kids.slice(0, 50).map(comment => <Comment key={comment} comment={comment}/>)}
      </React.Fragment>
    )
  }
}