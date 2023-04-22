import {HiFire} from 'react-icons/hi'
import {formatDistanceToNow} from 'date-fns'
import {Link} from 'react-router-dom'
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

  const renderSavedVideos = (darkMode, savedVideos) => {
    const bannerBg = darkMode ? 'banner-dark' : 'banner-light'
    const fireIconBg = darkMode ? 'icon-dark' : 'icon-light'

    return (
      <div>
        <div className={`saved-videos-top-section ${bannerBg}`}>
          <div className={`trending-section-icon ${fireIconBg}`}>
            <HiFire className="trending-icon" />
          </div>
          <h1>Saved Videos</h1>
        </div>
        <ul className="saved-videos-container">
          {savedVideos.map(eachVideo => {
            const dateTime = new Date(eachVideo.publishedAt)

            const year = dateTime.getFullYear()
            const date = dateTime.getDate()
            const month = dateTime.getMonth()

            const publishedAt = formatDistanceToNow(new Date(year, month, date))

            return (
              <Link to={`/videos/${eachVideo.id}`}>
                <li key={eachVideo.id} className="video-list-item">
                  <div className="video-item-section">
                    <img
                      className="saved-thumbnail-image"
                      alt=""
                      src={eachVideo.thumbnailUrl}
                    />

                    <div className="video-details-section">
                      <p className="video-title">{eachVideo.title}</p>
                      <p className="channel-name">{eachVideo.channel.name}</p>
                      <div>
                        <p className="views-count">
                          {eachVideo.viewCount} Views
                        </p>
                        <p className="published-at">.{publishedAt}</p>
                      </div>
                    </div>
                  </div>
                </li>
              </Link>
            )
          })}
        </ul>
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
              {savedVideos.length === 0
                ? noVideos(darkMode)
                : renderSavedVideos(darkMode, savedVideos)}
            </div>
          </div>
        )
      }}
    </NxtWatchContext.Consumer>
  )
}

export default SavedVideosRoute
