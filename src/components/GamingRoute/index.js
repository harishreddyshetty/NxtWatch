import {Component} from 'react'
import Cookie from 'js-cookie'
import {Link} from 'react-router-dom'
import {MdPlaylistAdd} from 'react-icons/md'
import Header from '../Header'
import Navbar from '../Navbar'

// import NxtWatchContext from '../../NxtWatchContext/NxtWatchContext'

import './index.css'

class GamingRoute extends Component {
  state = {videosList: []}

  componentDidMount() {
    this.getGamingDetails()
  }

  getGamingDetails = async () => {
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

      this.setState({videosList: updatedData})
    }
  }

  renderGamingVideos = () => {
    const {videosList} = this.state

    return (
      <div>
        <div>
          <div>
            <MdPlaylistAdd className="trending-icon" />
          </div>
          <h1>Gaming</h1>
        </div>

        <ul className="gamingVideos-container">
          {videosList.map(eachVideo => (
            <Link to={`/videos/${eachVideo.id}`} className="text">
              <li key={eachVideo.id} className="gamingVideo-list-item">
                <img
                  className="gamingThumbnail"
                  alt="game"
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
  }

  render() {
    return (
      <div>
        <Header />

        <div className="home-nav-section">
          <Navbar />
          <div>{this.renderGamingVideos()}</div>
        </div>
      </div>
    )
  }
}

export default GamingRoute
