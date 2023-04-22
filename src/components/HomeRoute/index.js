import {Component} from 'react'
import {Link} from 'react-router-dom'
import {formatDistanceToNow} from 'date-fns'
import {BsX} from 'react-icons/bs'
import {HiSearch} from 'react-icons/hi'
import Loader from 'react-loader-spinner'
import Cookie from 'js-cookie'
import Header from '../Header'
import Navbar from '../Navbar'

import NxtWatchContext from '../../NxtWatchContext/NxtWatchContext'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class HomeRoute extends Component {
  state = {
    banner: true,
    homePageVideos: [],
    searchInput: '',
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getHomeVideoDetails()
  }

  getHomeVideoDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {searchInput} = this.state
    const jwtToken = Cookie.get('jwt_token')
    const url = `https://apis.ccbp.in/videos/all?search=${searchInput}`
    const options = {
      method: 'GET',
      headers: {
        authorization: `bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)

    if (response.ok) {
      const videosData = await response.json()
      console.log(videosData)
      const updatedVideosData = videosData.videos.map(eachVideo => ({
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

      this.setState({
        homePageVideos: updatedVideosData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  closeBanner = () => {
    this.setState({banner: false})
  }

  renderBanner = () => (
    <div data-testid="banner" className="banner-section">
      <div className="banner-top-section">
        <img
          className="home-website-logo"
          alt="nxt watch logo"
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
        />
        <button
          data-testid="close"
          onClick={this.closeBanner}
          className="cross-icon-btn"
          type="button"
        >
          <BsX className="cross-icon" />
        </button>
      </div>
      <p>Buy Nxt Watch Premium</p>
      <button type="button">GET IT NOW</button>
    </div>
  )

  updateSearch = event => {
    this.setState({searchInput: event.target.value})
  }

  onClickSearch = () => {
    this.getHomeVideoDetails()
  }

  onClickRetry = () => {
    this.getHomeVideoDetails()
  }

  renderVideosSection = () => (
    <NxtWatchContext.Consumer>
      {value => {
        const {darkMode} = value
        const {homePageVideos, searchInput} = this.state

        const videosContainerBg = darkMode ? 'bg-dark' : 'bg-light'

        const videoNameText = darkMode ? 'title-light' : 'title-dark'
        const videoDetailsText = darkMode
          ? 'details-text-light'
          : 'details-text-dark'

        return (
          <div className={`videos-section ${videosContainerBg}`}>
            <div>
              <input
                className="search-input"
                value={searchInput}
                onChange={this.updateSearch}
                type="search"
                placeholder="Search"
              />
              <button
                data-testid="searchButton"
                className="search-btn"
                onClick={this.onClickSearch}
                type="button"
              >
                <HiSearch />
              </button>
            </div>

            {homePageVideos.length === 0 && searchInput !== '' ? (
              <div className="noVideosContainer">
                <img
                  className="noSavedVideoImg"
                  alt="no videos"
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
                />
                <h1>No Search results found</h1>
                <p>Try different keyword or remove search filter</p>
                <button
                  className="retry-btn"
                  type="button"
                  onClick={this.onClickRetry}
                >
                  Retry
                </button>
              </div>
            ) : (
              <ul className="home-page-videos-list">
                {homePageVideos.map(eachVideo => {
                  const dateTime = new Date(eachVideo.publishedAt)

                  const year = dateTime.getFullYear()
                  const date = dateTime.getDate()
                  const month = dateTime.getMonth()

                  const publishedAt = formatDistanceToNow(
                    new Date(year, month, date),
                  )

                  return (
                    <Link to={`/videos/${eachVideo.id}`} className="text">
                      <li className="home-video-list-item">
                        <div>
                          <img
                            className="thumbnail-img"
                            alt="video thumbnail"
                            src={eachVideo.thumbnailUrl}
                          />

                          <div className="video-bottom-section">
                            <img
                              className="home-channel-logo"
                              alt="channel logo"
                              src={eachVideo.channel.profileImageUrl}
                            />
                            <div>
                              <p className={videoNameText}>{eachVideo.title}</p>
                              <div
                                className={`${videoDetailsText} channelViews`}
                              >
                                <p className="channel-name">
                                  {eachVideo.channel.name}
                                </p>
                                <p className="view-count">
                                  {eachVideo.viewCount}
                                </p>
                                <p className="published-at">.{publishedAt}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    </Link>
                  )
                })}
              </ul>
            )}
          </div>
        )
      }}
    </NxtWatchContext.Consumer>
  )

  renderNoSearchResults = () => (
    <div>
      <img
        alt="no saved videos"
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
      />
      <h1>No Search results found</h1>
      <p>Try different keyword or remove search filter</p>
      <button type="button" onClick={this.onClickRetry}>
        Retry
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#4f46e5" height="50" width="50" />
    </div>
  )

  onClickRetry = () => {
    this.getHomeVideoDetails()
  }

  renderFailureView = () => {
    const {searchInput} = this.state

    return (
      <div>
        <div>
          <input
            className="search-input"
            value={searchInput}
            onChange={this.updateSearch}
            type="search"
            placeholder="Search"
          />
          <button
            data-testid="searchButton"
            className="search-btn"
            onClick={this.onClickSearch}
            type="button"
          >
            <HiSearch />
          </button>
        </div>
        <img
          alt="failure view"
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
        />
        <h1>Oops! Something Went Wrong</h1>
        <p>
          We are having some trouble to complete your request.
          <br /> Please try again.
        </p>

        <button type="button" onClick={this.onClickRetry}>
          Retry
        </button>
      </div>
    )
  }

  renderHomeVideosDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderVideosSection()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    const {banner} = this.state
    return (
      <div>
        <Header />

        <div className="home-nav-section">
          <Navbar />
          <div>
            {banner && this.renderBanner()}
            {this.renderHomeVideosDetails()}
          </div>
        </div>
      </div>
    )
  }
}

export default HomeRoute
