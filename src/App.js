import {Route, Switch} from 'react-router-dom'
import {Component} from 'react'
import LoginRoute from './components/LoginRoute'
import HomeRoute from './components/HomeRoute'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import TrendingRoute from './components/TrendingRoute'
import GamingRoute from './components/GamingRoute'
import VideoItemDetailsRoute from './components/VideoItemDetailsRoute'
import SavedVideosRoute from './components/SavedVideosRoute'
import NotFoundRoute from './components/NotFoundRoute'

import './App.css'
import NxtWatchContext from './NxtWatchContext/NxtWatchContext'

// Replace your code here
class App extends Component {
  state = {
    darkMode: false,
    activeTab: 'HOME',
    savedVideos: [],
    likedVideosList: [],
    unLikedVideosList: [],
  }

  onClickThemeBtn = () => {
    this.setState(prevState => ({darkMode: !prevState.darkMode}))
  }

  onClickSave = video => {
    const {savedVideos} = this.state

    const checkVideo = savedVideos.filter(
      eachVideo => eachVideo.id === video.id,
    )

    // console.log(checkVideo, 'app.js')

    if (checkVideo.length === 0) {
      this.setState(prevState => ({
        savedVideos: [...prevState.savedVideos, video],
      }))
    } else {
      const removeVideo = savedVideos.filter(
        eachVideo => eachVideo.id !== video.id,
      )

      this.setState({savedVideos: removeVideo})
    }
  }

  onClickLikeBtn = data => {
    const {likedVideosList} = this.state
    const videoIndex = likedVideosList.findIndex(
      eachItem => eachItem.id === data.id,
    )

    console.log(videoIndex)
    if (videoIndex === -1) {
      this.setState(prevState => ({
        likedVideosList: [...prevState.likedVideosList, data],
      }))
    } else {
      likedVideosList[videoIndex] = data
      this.setState({likedVideosList})
    }
  }

  onClickDisLikeButton = data => {
    const {unLikedVideosList} = this.state
    const videoIndex = unLikedVideosList.findIndex(
      eachItem => eachItem.id === data.id,
    )

    console.log(videoIndex)
    if (videoIndex === -1) {
      this.setState(prevState => ({
        unLikedVideosList: [...prevState.unLikedVideosList, data],
      }))
    } else {
      unLikedVideosList[videoIndex] = data
      this.setState({unLikedVideosList})
    }
  }

  updateNavItem = NavItem => {
    this.setState({activeTab: NavItem})
  }

  render() {
    const {
      darkMode,
      activeTab,
      savedVideos,
      likedVideosList,
      unLikedVideosList,
    } = this.state
    return (
      <NxtWatchContext.Provider
        value={{
          darkMode,
          activeTab,
          onClickThemeBtn: this.onClickThemeBtn,
          savedVideos,
          onClickSaveBtn: this.onClickSave,
          likedVideosList,
          onClickLikeDislike: this.onClickLikeBtn,
          unLikedVideosList,
          onClickDislikeBtn: this.onClickDisLikeButton,
          updateNavItem: this.updateNavItem,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginRoute} />
          <ProtectedRoute exact path="/" component={HomeRoute} />
          <ProtectedRoute exact path="/trending" component={TrendingRoute} />
          <ProtectedRoute exact path="/gaming" component={GamingRoute} />
          <ProtectedRoute
            exact
            path="/saved-videos"
            component={SavedVideosRoute}
          />
          <ProtectedRoute
            exact
            path="/videos/:id"
            component={VideoItemDetailsRoute}
          />
          <Route component={NotFoundRoute} />
        </Switch>
      </NxtWatchContext.Provider>
    )
  }
}

export default App
