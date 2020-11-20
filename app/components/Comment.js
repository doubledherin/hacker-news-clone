import React from 'react'

import Loading from './Loading'
import PostItem from './PostItem'
import { getPost } from '../utils/api'
import { createMarkup } from '../utils/helpers'

const commentReducer = (state, action) => {
  if (action.type === "success") {
    return {
      error: null,
      comment: action.comment
    }
  }
  if (action.type === "error") {
    return {
      error: action.error.message,
      comment: null,
    }
  }
  throw new Error(`Action type ${action.type} not supported`)
}

export default function Comment (props) {

  const [ state, dispatch ] = React.useReducer(commentReducer, {
    error: null,
    comment: null,
  })

  React.useEffect(
    () => getPost(props.comment)
      .then(comment => dispatch({ type: "success", comment }))
      .catch(error => dispatch({ type: "error", error })),
    [props.comment]
  )

  const isLoading = () => !state.error && !state.comment

  return (
    <React.Fragment>
      { !isLoading() && (
        <div className='comment'>
          <PostItem post={state.comment} />
          <p dangerouslySetInnerHTML={createMarkup(state.comment.text)}/>
       </div>
      )}
      { isLoading() && <Loading />}
    </React.Fragment>
  )
}