import React from 'react'

const NxtWatchContext = React.createContext({
  darkMode: false,
  onClickThemeBtn: () => {},
  activeTab: 'HOME',
  savedVideos: [],
  onClickSaveBtn: () => {},
  likedVideosList: [],
  unLikedVideosList: [],
  onClickLikeDislike: () => {},
  onClickDislikeBtn: () => {},
  updateNavItem: () => {},
})

export default NxtWatchContext
