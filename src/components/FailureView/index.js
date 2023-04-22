import './index.css'

import NxtWatchContext from '../../NxtWatchContext/NxtWatchContext'

const FailureView = props => {
  const {onClickRetry} = props

  const clickRetry = () => {
    onClickRetry()
  }

  return (
    <NxtWatchContext.Consumer>
      {value => {
        const {darkMode} = value

        const FailureBg = darkMode ? 'background-dark' : 'background-light'

        const failureHeading = darkMode
          ? 'failure-heading-light'
          : 'failure-heading-dark'

        return (
          <div className={`failure-view-container ${FailureBg}`}>
            <img
              className="failure-img"
              alt="failure"
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
            />
            <h1 className={failureHeading}>Oops! Something Went Wrong</h1>
            <p className="failure-para">
              We are having some trouble to complete your request.
              <br /> Please try again.
            </p>

            <button className="retry-btn" onClick={clickRetry} type="button">
              Retry
            </button>
          </div>
        )
      }}
    </NxtWatchContext.Consumer>
  )
}

export default FailureView
