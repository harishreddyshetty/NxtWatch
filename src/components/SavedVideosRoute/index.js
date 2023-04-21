import Header from '../Header'
import Navbar from '../Navbar'

import NxtWatchContext from '../../NxtWatchContext/NxtWatchContext'
import './index.css'

const SavedVideosRoute = () => {
  const noVideos = mode => {
    const noSavedBg = mode ? 'no-saved-dark' : 'no-saved-light'
    const headingColor = mode ? 'heading-light' : 'heading-dark'
    const paraColor = mode ? 'para-light' : 'para-dark'
    return (
      <div className={`noSavedContainer ${noSavedBg}`}>
        <img
          className="noSavedImage"
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
          alt="no saved videos"
        />
        <h1 className={headingColor}>No saved videos found</h1>
        <p className={paraColor}>
          You can save your videos while watching them
        </p>
      </div>
    )
  }

  return (
    <NxtWatchContext.Consumer>
      {value => {
        const {savedVideos, darkMode} = value

        return (
          <div>
            <Header />

            <div className="home-nav-section">
              <Navbar />
              {savedVideos.length === 0 ? noVideos(darkMode) : null}
            </div>
          </div>
        )
      }}
    </NxtWatchContext.Consumer>
  )
}

export default SavedVideosRoute
