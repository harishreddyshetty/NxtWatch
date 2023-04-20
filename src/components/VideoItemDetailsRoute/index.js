import {Component} from 'react'
import Cookie from 'js-cookie'
import ReactPlayer from 'react-player'
// import {formatDistanceToNow} from 'date-fns'

class VideoItemDetailsRoute extends Component {
  state = {videoItemDetails: {}}

  componentDidMount() {
    this.getVideoDetails()
  }

  getVideoDetails = async () => {
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

      this.setState({videoItemDetails: updatedData})

      console.log(updatedData)
    }
  }

  renderVideoPlayer = () => {
    const {videoItemDetails} = this.state
    // const {channel} = videoDetails
    // const {name} = channel
    console.log(videoItemDetails, 'render')

    return (
      <div>
        <ReactPlayer url={videoItemDetails.videoUrl} controls />
        {/* <h1>{name}</h1> */}
        {/* likes */}
        {/* <div>
          <div>
            <p>{videoDetails.viewCount} views</p>
            <p>{videoDetails.publishedAt}</p>
          </div>
        </div> */}
      </div>
    )
  }

  render() {
    return (
      <>
        <h1>Video</h1>
        {this.renderVideoPlayer()}
      </>
    )
  }
}

export default VideoItemDetailsRoute
