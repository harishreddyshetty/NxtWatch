import {Component} from 'react'
import Cookie from 'js-cookie'
import ReactPlayer from 'react-player'
import {formatDistanceToNow} from 'date-fns'
import {BiLike, BiDislike} from 'react-icons/bi'
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

class VideoItemDetailsRoute extends Component {
  state = {
    videoItemDetails: {},
    apiStatus: apiStatusConstants.initial,
    liked: false,
    dislike: false,
  }

  componentDidMount() {
    this.getVideoDetails()
  }

  getVideoDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookie.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/videos/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const videoDetails = data.video_details
      const updatedData = {
        channel: {
          name: videoDetails.channel.name,
          profileImageUrl: videoDetails.channel.profile_image_url,
          subscriberCount: videoDetails.channel.subscriber_count,
        },
        description: videoDetails.description,
        id: videoDetails.id,
        publishedAt: videoDetails.published_at,
        thumbnailUrl: videoDetails.thumbnail_url,
        title: videoDetails.title,
        videoUrl: videoDetails.video_url,
        viewCount: videoDetails.view_count,
      }

      this.setState({
        videoItemDetails: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderVideoPlayer = () => {
    const {videoItemDetails, liked, dislike} = this.state

    // console.log(videoItemDetails, 'video Details of player')

    const dateTime = new Date(videoItemDetails.publishedAt)

    const year = dateTime.getFullYear()
    const date = dateTime.getDate()
    const month = dateTime.getMonth()

    const publishedAt = formatDistanceToNow(new Date(year, month, date))

    const onClickLike = () => {
      this.setState(prevState => ({liked: !prevState.liked, dislike: false}))
    }

    const onClickDislike = () => {
      this.setState(prevState => ({
        dislike: !prevState.dislike,
        liked: false,
      }))
    }

    const likeBtnColor = liked ? 'btn-liked-dislike' : null
    const disLikeBtnColor = dislike ? 'btn-liked-dislike' : null

    return (
      <NxtWatchContext.Consumer>
        {value => {
          const {onClickSaveBtn, savedVideos, darkMode} = value

          const videoSaved = savedVideos.includes(videoItemDetails)

          const saveBtnText = videoSaved ? 'saved' : 'save'
          const saveBtnColor = videoSaved ? 'btn-liked-dislike' : null

          const clickSave = () => {
            onClickSaveBtn(videoItemDetails)
          }

          const VideoPageBg = darkMode
            ? 'video-details-bg-dark'
            : 'video-details-bg-light'

          return (
            <div className={` video-details-container ${VideoPageBg}`}>
              <ReactPlayer
                url={videoItemDetails.videoUrl}
                controls
                width="65vw"
                height="500px"
              />
              <p>{videoItemDetails.title}</p>
              <div className="views-buttons-container">
                <div className="views-published-container">
                  <p>{videoItemDetails.viewCount} views</p>
                  <p>. {publishedAt}</p>
                </div>
                <ul className="buttons-container">
                  <li className="single-btn-container">
                    <button
                      onClick={onClickLike}
                      className={`btn ${likeBtnColor}`}
                      type="button"
                    >
                      <BiLike className="btn-icon" /> Like
                    </button>
                  </li>

                  <li className="single-btn-container">
                    <button
                      onClick={onClickDislike}
                      className={`btn ${disLikeBtnColor}`}
                      type="button"
                    >
                      <BiDislike className="btn-icon" /> Dislike
                    </button>
                  </li>

                  <li className="single-btn-container">
                    <button
                      onClick={clickSave}
                      className={`btn ${saveBtnColor}`}
                      type="button"
                    >
                      <MdPlaylistAdd className="btn-icon" /> {saveBtnText}
                    </button>
                  </li>
                </ul>
              </div>

              <hr />

              <div className="channel-details-container">
                <img
                  className="channel-img"
                  src={videoItemDetails.channel.profileImageUrl}
                  alt="channel logo"
                />

                <div>
                  <p>{videoItemDetails.channel.name}</p>
                  <p>{videoItemDetails.channel.subscriberCount} subscribers</p>
                </div>
              </div>

              <p>{videoItemDetails.description}</p>
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
    this.getVideoDetails()
  }

  renderVideoDetailsPage = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderVideoPlayer()
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
          <div>{this.renderVideoDetailsPage()}</div>
        </div>
      </div>
    )
  }
}

export default VideoItemDetailsRoute

//  const isVideoSaved = savedVideos.find(
//             eachVideo => eachVideo.id === videoItemDetails.id,
//           )

// console.log(videoSaved, 'includes ')
//           console.log(isVideoSaved, 'find method ')
//           console.log(savedVideos, 'saved videos')
