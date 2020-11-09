import React from 'react'

import Loading from './Loading'
import PostItem from './PostItem'
import { getPost } from '../utils/api'
import { createMarkup } from '../utils/helpers'

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
    const { comment } = this.state
    return (
      <React.Fragment>
        { !this.isLoading() && (
          <div className='comment'>
            <PostItem post={comment} />
            <p dangerouslySetInnerHTML={createMarkup(comment.text)}/>
         </div>
        )}
        { this.isLoading() && <Loading />}
      </React.Fragment>
    )
  }
}