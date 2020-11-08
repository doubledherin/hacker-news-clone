import React, { Component } from 'react';
import queryString from 'query-string'

import { getUser } from '../utils/api'

class UserProfile extends Component {
  constructor(props) {
    super(props)

    this.state = {
      userId: null
    }

    this.fetchUser = this.fetchUser.bind(this)
  }

  async fetchUser(userId) {
    const user = await getUser(userId)
    console.log("USER: ", user)
  }

  componentDidMount() {
    const { id } = queryString.parse(this.props.location.search)
    this.fetchUser(id)
    this.setState({ userId: id })
  }

  render() {
    return (
      <React.Fragment>
        <h1 className='header'>
          {this.state.userId}
        </h1>
        <div className='meta-info-light'>
          joined on date, time has x karma
        </div>
      </React.Fragment>
    );
  }
}

export default UserProfile;