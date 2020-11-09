import React from 'react';
import { Link } from 'react-router-dom'

const UserLink = (props) => {
  const { userName } = props
  return (
    <Link 
      to={{ 
        pathname: '/user', 
        search: `?id=${userName}`
      }}
    >
      {userName}
    </Link>
  )
};

export default UserLink