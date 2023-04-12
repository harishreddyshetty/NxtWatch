import {Component} from 'react'
import {Link} from 'react-router-dom'
import {formatDistanceToNow} from 'date-fns'
import {BsX} from 'react-icons/bs'
import {HiSearch} from 'react-icons/hi'
import Cookie from 'js-cookie'
import Header from '../Header'
import Navbar from '../Navbar'

import NxtWatchContext from '../../NxtWatchContext/NxtWatchContext'

import './index.css'

class HomeRoute extends Component {
  state = {banner: true, homePageVideos: [], searchInput: ''}

  componentDidMount() {
    this.getHomeVideoDetails()
    console.log(formatDistanceToNow(new Date(2021, 8, 20)))
  }

  getHomeVideoDetails = async () => {
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

      this.setState({homePageVideos: updatedVideosData})

      console.log(updatedVideosData)
    }
  }

  closeBanner = () => {
    this.setState({banner: false})
  }

  renderBanner = () => (
    <div className="banner-section">
      <div className="banner-top-section">
        <img
          className="home-website-logo"
          alt="logo"
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
        />
        <button
          onClick={this.closeBanner}
          className="cross-icon-btn"
          type="button"
        >
          <BsX className="cross-icon" />
        </button>
      </div>
      <p>
        But Nxt Watch Premium prepaid plans with <br /> UPI
      </p>
      <button type="button">GET IT NOW</button>
    </div>
  )

  updateSearch = event => {
    this.setState({searchInput: event.target.value}, this.getHomeVideoDetails)
  }

  onClickSearch = () => {
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
                className="search-btn"
                onClick={this.onClickSearch}
                type="button"
              >
                <HiSearch />
              </button>
            </div>

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
                  <Link to={eachVideo.id} className="text">
                    <li className="home-video-list-item">
                      <div>
                        <img
                          className="thumbnail-img"
                          alt="thumbnail"
                          src={eachVideo.thumbnailUrl}
                        />

                        <div className="video-bottom-section">
                          <img
                            className="home-channel-logo"
                            alt="channel-logo"
                            src={eachVideo.channel.profileImageUrl}
                          />
                          <div>
                            <p className={videoNameText}>{eachVideo.title}</p>
                            <div className={`${videoDetailsText} channelViews`}>
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
          </div>
        )
      }}
    </NxtWatchContext.Consumer>
  )

  render() {
    const {banner} = this.state
    return (
      <div>
        <Header />

        <div className="home-nav-section">
          <Navbar />
          <div>
            {banner && this.renderBanner()}
            {this.renderVideosSection()}
          </div>
        </div>
      </div>
    )
  }
}

export default HomeRoute
