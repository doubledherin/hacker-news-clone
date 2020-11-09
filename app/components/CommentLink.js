import React from 'react';
import { Link } from 'react-router-dom'

const CommentLink = (props) => {
  const { id, kids } = props.post
  return (
    <Link 
      to={{ 
        pathname: '/post', 
        search: `?id=${id}`
      }}
    >
      { kids && kids.length || 0 }
    </Link>
  )
};

export default CommentLink