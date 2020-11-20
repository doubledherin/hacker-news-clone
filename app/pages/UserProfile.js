import React, { Component } from 'react';
import queryString from 'query-string'

import PostItem from '../components/PostItem'
import Loading from '../components/Loading'
import { getUser, getPost } from '../utils/api'
import { createMarkup } from '../utils/helpers'

function userReducer(state, action) {
  if (action.type === "fetchUserSuccess") {
    return {
      ...state,
      error: null,
      user: action.user
    }
  }

  if (action.type === "fetchPostsSuccess") {
    return {
      ...state,
      error: null,
      posts: action.posts
    }
  }

  if (action.type === "error") {
    return {
      ...state,
      error: action.error.message
    }
  }
  throw new Error(`Action type ${action.type} is not supported.`)
}

export default function UserProfile({ location }) {
  const { id } = queryString.parse(location.search)
  const [ state, dispatch ] = React.useReducer(userReducer, {
    error: null,
    user: null,
    posts: []
  })

  React.useEffect(
    () => {
      getUser(id)
      .then(user => { 
        dispatch({ type: "fetchUserSuccess", user })
        Promise.all(user.submitted.slice(0, 50).map(getPost))
          .then(posts => dispatch({ type: "fetchPostsSuccess", posts: posts.filter(post => post.type === 'story')  }))
          .catch(error => dispatch({ type: "error", error }))
      })
      .catch(error => dispatch({ type: "error", error }))
    },
    [location]
  )


  const dateJoined = (created) => {
    const date = new Date(created * 1000)
    return date.toLocaleDateString()
  }

  const timeJoined = (created) => {
    const date = new Date(created * 1000)
    return date.toLocaleString()
  }

  if (!state.user && !state.error) {
    return <Loading />
  }
  else {
    const { user, posts } = state
    const { created, karma, about } = user
  
    return (
      <React.Fragment>
        <h1 className='header'>
          {id}
        </h1>
        <div className='meta-info-light'>
          joined <strong>{dateJoined(created)}</strong>, <strong>{timeJoined(created)}</strong> has <strong>{karma.toLocaleString()}</strong> karma
        </div>
        { about && <p dangerouslySetInnerHTML={createMarkup(about)}/> }
        <h2>Posts</h2>
        { posts.length && posts.map(post => <PostItem key={post.id.toString()} post={post} />)}
      </React.Fragment>
    )
  }
}
