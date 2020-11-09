import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { ThemeProvider } from './contexts/theme'
import Nav from './components/Nav'
import Feed from './pages/Feed'
import UserProfile from './pages/UserProfile'
import Post from './pages/Post'

import './index.css'

class App extends React.Component {
  state = {
    theme: 'light',
    toggleTheme: () => {
      this.setState(({ theme }) => ({
        theme: theme === 'light' ? 'dark' : 'light'
      }))
    }
  }

  render() {
    return (
      <Router>
        <ThemeProvider value={this.state}>
          <div className={this.state.theme}>
            <div className='container'>
              <Nav />
              <Route exact path="/" component={Feed} />
              <Route path="/new" component={Feed} />
              <Route path="/user" component={UserProfile} />
              <Route path="/post" component={Post} />
            </div>
          </div>
        </ThemeProvider>
      </Router>

    )
  }
}

ReactDOM.render(
  <App />, document.getElementById('app')
)