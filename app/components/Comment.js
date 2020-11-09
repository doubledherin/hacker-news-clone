import React from 'react'

import Loading from './Loading'
import PostItem from './PostItem'
import { getPost } from '../utils/api'

export default class Comment extends React.Component {

  constructor(props) {
    super(props)
    
    this.state = {
      comment: null,
      error: null
    }

    this.fetchComment = this.fetchComment.bind(this)
    this.isLoading = this.isLoading.bind(this)
  }

  isLoading() {
    return !this.state.comment && !this.state.error
  }

  async fetchComment(commentId) {
    const comment = await getPost(commentId)
    this.setState({ comment })
  }

  componentDidMount() {
    try {
      this.fetchComment(this.props.comment)
    } catch(error) {
      this.setState({ error, comment: null })
    }
  }
  render() {
    return (
      <React.Fragment>
        { !this.isLoading() && (
          <div className='comment'>
            <pre>{JSON.stringify(this.state.comment, null, 2)}</pre>
            <PostItem post={this.state.comment} />
          </div>
        )}
        { this.isLoading() && <Loading />}
      </React.Fragment>
    )
  }
}