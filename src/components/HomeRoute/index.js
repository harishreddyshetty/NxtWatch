import {Component} from 'react'
import {Link} from 'react-router-dom'
import {BsX} from 'react-icons/bs'
import {HiSearch} from 'react-icons/hi'
import Cookie from 'js-cookie'
import Header from '../Header'
import Navbar from '../Navbar'

import './index.css'

class HomeRoute extends Component {
  state = {banner: true, homePageVideos: [], searchInput: ''}

  componentDidMount() {
    this.getHomeVideoDetails()
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

  renderVideosSection = () => {
    const {homePageVideos, searchInput} = this.state

    return (
      <div>
        <div>
          <input
            value={searchInput}
            onChange={this.updateSearch}
            type="search"
            placeholder="search"
          />
          <button onClick={this.onClickSearch} type="button">
            <HiSearch />
          </button>
        </div>

        <ul className="home-page-videos-list">
          {homePageVideos.map(eachVideo => (
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
                      <p>{eachVideo.title}</p>
                      <p>{eachVideo.channel.name}</p>
                      <p>{eachVideo.viewCount}</p>
                      <p>{eachVideo.publishedAt}</p>
                    </div>
                  </div>
                </div>
              </li>
            </Link>
          ))}
        </ul>
      </div>
    )
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
            {this.renderVideosSection()}
          </div>
        </div>
      </div>
    )
  }
}

export default HomeRoute
