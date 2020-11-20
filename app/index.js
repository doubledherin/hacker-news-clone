import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { ThemeProvider } from './contexts/theme'
import Nav from './components/Nav'
import Feed from './pages/Feed'
import UserProfile from './pages/UserProfile'
import Post from './pages/Post'

import './index.css'

function App() {
  const [ theme, setTheme ]  = React.useState('light')
  const toggleTheme = () => setTheme(theme => theme === 'light' ? 'dark' : 'light')

  return (
    <Router>
      <ThemeProvider value={theme}>
        <div className={theme}>
          <div className='container'>
            <Nav toggleTheme={toggleTheme}/>
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

ReactDOM.render(
  <App />, document.getElementById('app')
)