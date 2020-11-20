import React from 'react';

import PostItem from '../components/PostItem'
import Loading from '../components/Loading'
import { getPosts } from '../utils/api'

const feedReducer = (state, action) => {
  if (action.type === "success") {
    return {
      posts: action.posts,
      error: null
    }
  }
  if (action.type === "error") {
    return {
      error: error.message,
      posts: null
    }
  }
} 

export default function Feed ({ match }) {
  React.useEffect(() => {
    getPosts(match.url)
      .then(posts => dispatch({ type: "success", posts }))
      .catch(error => dispatch({ type: "error", error }))
    },
    [match]
  )

  const [ state, dispatch ] = React.useReducer(feedReducer, {
    posts: null,
    error: null,
  })

  const isLoading = () => !state.posts && !state.error 

  return (
    <React.Fragment>
      { isLoading() && <Loading /> }
      { state.error && <p className='center-text error'>{error}</p>}
      { !isLoading() &&  state.posts.map(post => (
      <PostItem key={post.id.toString()} post={post} />
      ))}
    </React.Fragment>
  )
}