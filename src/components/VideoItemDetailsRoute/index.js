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
    const {videoItemDetails} = this.state
    const dateTime = new Date(videoItemDetails.publishedAt)
    const year = dateTime.getFullYear()
    const date = dateTime.getDate()
    const month = dateTime.getMonth()

    const publishedAt = formatDistanceToNow(new Date(year, month, date))

    return (
      <NxtWatchContext.Consumer>
        {value => {
          const {
            onClickSaveBtn,
            savedVideos,
            darkMode,
            onClickLikeDislike,
            likedVideosList,
            unLikedVideosList,
            onClickDislikeBtn,
          } = value

          const isVideoPresent = likedVideosList.filter(
            eachVideo => eachVideo.id === videoItemDetails.id,
          )

          const isDislikeVideoPresent = unLikedVideosList.filter(
            eachVideo => eachVideo.id === videoItemDetails.id,
          )

          const onClickLike = () => {
            if (isVideoPresent.length === 1) {
              onClickLikeDislike({id: videoItemDetails.id, liked: false})
            } else {
              onClickLikeDislike({id: videoItemDetails.id, liked: true})
            }
          }

          const onClickDislike = () => {
            if (isDislikeVideoPresent.length === 1) {
              onClickDislikeBtn({id: videoItemDetails.id, Disliked: false})
            } else {
              onClickDislikeBtn({id: videoItemDetails.id, Disliked: true})
            }
          }

          let isVideoLiked = null
          if (isVideoPresent.length === 1 && isVideoPresent[0].liked) {
            isVideoLiked = true
          } else {
            isVideoLiked = false
          }

          let isVideoDisliked = null

          if (
            isDislikeVideoPresent.length === 1 &&
            isDislikeVideoPresent[0].Disliked
          ) {
            isVideoDisliked = true
          } else {
            isVideoDisliked = false
          }

          const likeBtnColor = isVideoLiked ? 'btn-liked-dislike' : null
          const disLikeBtnColor = isVideoDisliked ? 'btn-liked-dislike' : null

          const textColor = darkMode ? 'text-white-vdi' : null
          const countColor = darkMode ? 'count-dark-vdi' : null

          const videoPresent = savedVideos.filter(
            eachItem => eachItem.id === videoItemDetails.id,
          )

          const clickSave = () => {
            onClickSaveBtn(videoItemDetails)
          }

          const VideoPageBg = darkMode
            ? 'video-details-bg-dark'
            : 'video-details-bg-light'

          const likeBtnText = isVideoLiked ? 'Liked' : 'Like'
          const DislikeBtnText = isVideoDisliked ? 'Disliked' : 'Dislike'

          return (
            <div className={`video-details-container ${VideoPageBg}`}>
              <ReactPlayer
                url={videoItemDetails.videoUrl}
                controls
                width="80vw"
                height="500px"
                className="video-player-xs"
              />
              <p className={textColor}>{videoItemDetails.title}</p>
              <div className="views-buttons-container">
                <div className="views-published-container">
                  <p className={countColor}>
                    {videoItemDetails.viewCount} views
                  </p>
                  <p className={countColor}>. {publishedAt}</p>
                </div>
                <ul className="buttons-container">
                  <li className="single-btn-container">
                    <button
                      onClick={onClickLike}
                      className={`btn ${likeBtnColor}`}
                      type="button"
                    >
                      <BiLike className="btn-icon" /> {likeBtnText}
                    </button>
                  </li>

                  <li className="single-btn-container">
                    <button
                      onClick={onClickDislike}
                      className={`btn ${disLikeBtnColor}`}
                      type="button"
                    >
                      <BiDislike className="btn-icon" /> {DislikeBtnText}
                    </button>
                  </li>

                  <li className="single-btn-container">
                    <button
                      onClick={clickSave}
                      className={`btn ${
                        videoPresent.length === 1 && 'btn-liked-dislike'
                      }`}
                      type="button"
                    >
                      <MdPlaylistAdd className="btn-icon" />
                      {videoPresent.length === 1 ? 'saved' : 'save'}
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
                  <p className={textColor}>{videoItemDetails.channel.name}</p>
                  <p className={countColor}>
                    {videoItemDetails.channel.subscriberCount} subscribers
                  </p>
                </div>
              </div>

              <p className={textColor}>{videoItemDetails.description}</p>
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
