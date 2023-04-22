import Header from '../Header'
import Navbar from '../Navbar'

import './index.css'

const NotFoundRoute = () => (
  <div>
    <Header />

    <div className="home-nav-section">
      <Navbar />
      <div className="notfound-container">
        <img
          className="not-found-image"
          alt="not found"
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png"
        />
        <h1>Page Not Found</h1>
        <p>we are sorry, the page you requested could not be found.</p>
      </div>
    </div>
  </div>
)

export default NotFoundRoute
