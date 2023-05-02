import {Component} from 'react'
import Cookie from 'js-cookie'
import {Link} from 'react-router-dom'
import {formatDistanceToNow} from 'date-fns'
import {HiFire} from 'react-icons/hi'
// import Loader from 'react-loader-spinner'
import Header from '../Header'
import Navbar from '../Navbar'
import FailureView from '../FailureView'
import LoaderView from '../Loader'
import NxtWatchContext from '../../NxtWatchContext/NxtWatchContext'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class TrendingRoute extends Component {
  state = {trendingVideosList: [], apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getTrendingVideosData()
  }

  getTrendingVideosData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookie.get('jwt_token')
    const url = 'https://apis.ccbp.in/videos/trending'
    const options = {
      method: 'GET',
      headers: {
        authorization: `bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)

    if (response.ok) {
      const data = await response.json()
      const updatedData = data.videos.map(eachVideo => ({
        id: eachVideo.id,
        publishedAt: eachVideo.published_at,
        thumbnailUrl: eachVideo.thumbnail_url,
        title: eachVideo.title,
        viewCount: eachVideo.view_count,
        channel: {
          name: eachVideo.channel.name,
          profileImageUrl: eachVideo.channel.profile_image_url,
        },
      }))
      // console.log(updatedData)
      this.setState({
        trendingVideosList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderTrendingBanner = () => (
    <div className="trending-section">
      <div className="trending-section-icon">
        <HiFire className="trending-icon" />
      </div>
      <h1>Trending</h1>
    </div>
  )

  renderVideo = () => {
    const {trendingVideosList} = this.state

    return (
      <NxtWatchContext.Consumer>
        {value => {
          const {darkMode} = value

          const bannerBg = darkMode ? 'banner-dark' : 'banner-light'
          const VideosSectionBg = darkMode
            ? 'videoSection-dark'
            : 'videoSection-light'

          const trendingIconBg = darkMode ? 'icon-dark' : 'icon-light'
          const title = darkMode ? 'trend-title-light' : 'trend-title-dark'

          return (
            <>
              <div className={`trending-section ${bannerBg}`}>
                <div className={`trending-section-icon ${trendingIconBg}`}>
                  <HiFire className="trending-icon" />
                </div>
                <h1 className={`banner-heading ${title}`}>Trending</h1>
              </div>
              <ul className={`trending-videos-list ${VideosSectionBg}`}>
                {trendingVideosList.map(eachVideo => {
                  const dateTime = new Date(eachVideo.publishedAt)

                  const year = dateTime.getFullYear()
                  const date = dateTime.getDate()
                  const month = dateTime.getMonth()

                  const publishedAt = formatDistanceToNow(
                    new Date(year, month, date),
                  )

                  return (
                    <Link to={`/videos/${eachVideo.id}`} className="text">
                      <li key={eachVideo.id} className="video-list-item ">
                        <div className="video-item-section video-list-item-ex-small">
                          <img
                            className="thumbnail-image"
                            alt="video thumbnail"
                            src={eachVideo.thumbnailUrl}
                          />

                          <div className="video-details-section-exSmall">
                            <img
                              className="channel-logo-ex-small"
                              alt="channel logo"
                              src={eachVideo.channel.profileImageUrl}
                            />
                            <div>
                              <p className={`video-title-ex-small ${title}`}>
                                {eachVideo.title}
                              </p>
                              <div className="video-details-exSmall">
                                <p className="channel-name">
                                  {eachVideo.channel.name}
                                </p>
                                <p>. {eachVideo.viewCount} Views </p>
                                <p>. {publishedAt}</p>
                              </div>
                            </div>
                          </div>

                          <div className="video-details-section">
                            <p className={`video-title ${title}`}>
                              {eachVideo.title}
                            </p>
                            <p className="channel-name">
                              {eachVideo.channel.name}
                            </p>
                            <p className="views-count">
                              {eachVideo.viewCount} Views
                            </p>
                            <p className="publishedAt">. {publishedAt}</p>
                          </div>
                        </div>
                      </li>
                    </Link>
                  )
                })}
              </ul>
            </>
          )
        }}
      </NxtWatchContext.Consumer>
    )
  }

  renderLoadingView = () => <LoaderView />

  onClickRetry = () => {
    this.getTrendingVideosData()
  }

  renderTrendingVideosPage = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderVideo()
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
          <div>{this.renderTrendingVideosPage()}</div>
        </div>
      </div>
    )
  }
}

export default TrendingRoute

// {this.renderTrendingBanner()}
