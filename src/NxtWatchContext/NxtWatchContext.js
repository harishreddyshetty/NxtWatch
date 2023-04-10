import React from 'react'

const NxtWatchContext = React.createContext({
  darkMode: false,
  onClickThemeBtn: () => {},
  activeTab: 'HOME',
})

export default NxtWatchContext
