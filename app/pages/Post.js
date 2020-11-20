import React from 'react'
import queryString from 'query-string'

import { getPost } from '../utils/api'
import PostItem from '../components/PostItem'
import Loading from '../components/Loading'
import Comment from '../components/Comment'

function postReducer(state, action) {
  if (action.type === "success") {
    return {
      error: null,
      post: action.post
    }
  }
  if (action.type === "error") {
    return {
      error: error.message,
      post: null
    }
  }
  throw new Error(`Action type ${action.type} not supported.`)
}

export default function Post ({ location }) {

  React.useEffect(
    () => {
      const { id } = queryString.parse(location.search)
      getPost(id)
        .then(post => dispatch({ type: "success", post }))
        .catch(error => dispatch({ type: "error", error }))
    },
    [location]
  )

  const [ state, dispatch ] = React.useReducer(postReducer, {
    error: null,
    post: null
  })
  
  if (!state.error && !state.post) {
    return <Loading />
  }

  return (
    <React.Fragment>
      <PostItem post={state.post} />
      { state.post.kids && state.post.kids.slice(0, 50).map(comment => <Comment key={comment} comment={comment}/>)}
    </React.Fragment>
  )
}