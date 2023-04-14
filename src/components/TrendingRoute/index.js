import {Component} from 'react'
import Cookie from 'js-cookie'
import {Link} from 'react-router-dom'
import {formatDistanceToNow} from 'date-fns'
import {HiFire} from 'react-icons/hi'
import Header from '../Header'
import Navbar from '../Navbar'

import './index.css'

class TrendingRoute extends Component {
  state = {trendingVideosList: []}

  componentDidMount() {
    this.getTrendingVideosData()
  }

  getTrendingVideosData = async () => {
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
      console.log(updatedData)
      this.setState({trendingVideosList: updatedData})
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
      <ul className="trending-videos-list">
        {trendingVideosList.map(eachVideo => {
          const dateTime = new Date(eachVideo.publishedAt)

          const year = dateTime.getFullYear()
          const date = dateTime.getDate()
          const month = dateTime.getMonth()

          const publishedAt = formatDistanceToNow(new Date(year, month, date))

          return (
            <Link to={`/videos/${eachVideo.id}`} className="text">
              <li key={eachVideo.id} className="video-list-item">
                <div className="video-item-section">
                  <img
                    className="thumbnail-image"
                    alt=""
                    src={eachVideo.thumbnailUrl}
                  />

                  <div className="video-details-section">
                    <p className="video-title">{eachVideo.title}</p>
                    <p className="channel-name">{eachVideo.channel.name}</p>
                    <p className="views-count">{eachVideo.viewCount} Views</p>
                    <p className="publishedAt">. {publishedAt}</p>
                  </div>
                </div>
              </li>
            </Link>
          )
        })}
      </ul>
    )
  }

  render() {
    return (
      <div>
        <Header />

        <div className="home-nav-section">
          <Navbar />
          <div>
            {this.renderTrendingBanner()}
            {this.renderVideo()}
          </div>
        </div>
      </div>
    )
  }
}

export default TrendingRoute
