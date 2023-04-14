import {Route, Switch} from 'react-router-dom'
import {Component} from 'react'
import LoginRoute from './components/LoginRoute'
import HomeRoute from './components/HomeRoute'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import TrendingRoute from './components/TrendingRoute'

import './App.css'
import NxtWatchContext from './NxtWatchContext/NxtWatchContext'

// Replace your code here
class App extends Component {
  state = {darkMode: false, activeTab: 'HOME'}

  onClickThemeBtn = () => {
    this.setState(prevState => ({darkMode: !prevState.darkMode}))
  }

  render() {
    const {darkMode, activeTab} = this.state
    return (
      <NxtWatchContext.Provider
        value={{
          darkMode,
          activeTab,
          onClickThemeBtn: this.onClickThemeBtn,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginRoute} />
          <ProtectedRoute exact path="/" component={HomeRoute} />
          <ProtectedRoute exact path="/trending" component={TrendingRoute} />
        </Switch>
      </NxtWatchContext.Provider>
    )
  }
}

export default App
