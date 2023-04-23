import {Component} from 'react'
import Cookie from 'js-cookie'
import {Link} from 'react-router-dom'
import {MdPlaylistAdd} from 'react-icons/md'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Navbar from '../Navbar'
import FailureView from '../FailureView'

import NxtWatchContext from '../../NxtWatchContext/NxtWatchContext'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class GamingRoute extends Component {
  state = {videosList: [], apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getGamingDetails()
  }

  getGamingDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookie.get('jwt_token')
    const url = 'https://apis.ccbp.in/videos/gaming'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      console.log(data)
      const updatedData = data.videos.map(eachVideo => ({
        id: eachVideo.id,
        thumbnailUrl: eachVideo.thumbnail_url,
        title: eachVideo.title,
        viewCount: eachVideo.view_count,
      }))

      this.setState({
        videosList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderGamingVideos = () => {
    const {videosList} = this.state

    return (
      <NxtWatchContext.Consumer>
        {value => {
          const {darkMode} = value

          const bannerBg = darkMode ? 'banner-dark' : 'banner-light'
          const gamingIconBg = darkMode
            ? 'gaming-icon-dark'
            : 'gaming-icon-light'

          const gamingVideosSectionBg = darkMode
            ? 'videoSection-dark'
            : 'videoSection-light'

          return (
            <div>
              <div className={`gaming-section ${bannerBg}`}>
                <div className={`gaming-icon-container ${gamingIconBg}`}>
                  <MdPlaylistAdd className="gaming-icon" />
                </div>
                <h1>Gaming</h1>
              </div>

              <ul className={`gamingVideos-container ${gamingVideosSectionBg}`}>
                {videosList.map(eachVideo => (
                  <Link to={`/videos/${eachVideo.id}`} className="text">
                    <li key={eachVideo.id} className="gamingVideo-list-item">
                      <img
                        className="gamingThumbnail"
                        alt="video thumbnail"
                        src={eachVideo.thumbnailUrl}
                      />
                      <p>{eachVideo.title}</p>
                      <p>{eachVideo.viewCount} Watching Worldwide</p>
                    </li>
                  </Link>
                ))}
              </ul>
            </div>
          )
        }}
      </NxtWatchContext.Consumer>
    )
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#4f46e5" height="50" width="50" />
    </div>
  )

  onClickRetry = () => {
    this.getGamingDetails()
  }

  renderGamingVideosPage = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderGamingVideos()
      case apiStatusConstants.failure:
        return <FailureView onClickRetry={this.onClickRetry} />
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <Header />

        <div className="home-nav-section">
          <Navbar />
          <div>{this.renderGamingVideosPage()}</div>
        </div>
      </div>
    )
  }
}

export default GamingRoute
