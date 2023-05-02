import Loader from 'react-loader-spinner'

import './index.css'

import NxtWatchContext from '../../NxtWatchContext/NxtWatchContext'

const LoaderView = () => (
  <NxtWatchContext.Consumer>
    {value => {
      const {darkMode} = value
      const loaderBg = darkMode ? 'loader-container-dark' : null

      return (
        <div
          className={`${loaderBg} loader-container-box`}
          data-testid="loader"
        >
          <Loader type="ThreeDots" color="#4f46e5" height="50" width="50" />
        </div>
      )
    }}
  </NxtWatchContext.Consumer>
)

export default LoaderView
