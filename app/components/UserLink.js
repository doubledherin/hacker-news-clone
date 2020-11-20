import React from 'react'
import { Link } from 'react-router-dom'

export default function UserLink ({ userName }) {
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
}