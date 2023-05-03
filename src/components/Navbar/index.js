import {Link} from 'react-router-dom'
import {AiFillHome} from 'react-icons/ai'
import {HiFire} from 'react-icons/hi'
import {SiYoutubegaming} from 'react-icons/si'
import {MdPlaylistAdd} from 'react-icons/md'
import NxtWatchContext from '../../NxtWatchContext/NxtWatchContext'
import './index.css'

const Navbar = () => (
  <NxtWatchContext.Consumer>
    {value => {
      const {darkMode, activeTab, updateNavItem} = value

      const onClickHome = () => {
        updateNavItem('HOME')
      }

      const onClickTrending = () => {
        updateNavItem('TRENDING')
      }

      const onClickGaming = () => {
        updateNavItem('GAMING')
      }

      const onClickSaved = () => {
        updateNavItem('SAVED-VIDEOS')
      }

      const navBackground = darkMode ? 'nav-bg-dark' : 'nav-bg-light'
      // const navItemsText = darkMode ? 'text-light' : 'text-dark'

      const HomeBgLight =
        activeTab === 'HOME' && !darkMode ? 'nav-item-active-light' : null

      const HomeBgDark =
        activeTab === 'HOME' && darkMode ? 'nav-item-active-dark' : null

      const trendingBgLight =
        activeTab === 'TRENDING' && !darkMode ? 'nav-item-active-light' : null

      const trendingBgDark =
        activeTab === 'TRENDING' && darkMode ? 'nav-item-active-dark' : null

      const gamingBgLight =
        activeTab === 'GAMING' && !darkMode ? 'nav-item-active-light' : null

      const gamingBgDark =
        activeTab === 'GAMING' && darkMode ? 'nav-item-active-dark' : null

      const savedBgLight =
        activeTab === 'SAVED-VIDEOS' && !darkMode
          ? 'nav-item-active-light'
          : null

      const savedBgDark =
        activeTab === 'SAVED-VIDEOS' && darkMode ? 'nav-item-active-dark' : null

      const activeHomeIcon =
        activeTab === 'HOME' ? 'icon-active' : 'icon-non-active'

      const activeTrendingIcon =
        activeTab === 'TRENDING' ? 'icon-active' : 'icon-non-active'

      const activeGamingIcon =
        activeTab === 'GAMING' ? 'icon-active' : 'icon-non-active'

      const activeSavedIcon =
        activeTab === 'SAVED-VIDEOS' ? 'icon-active' : 'icon-non-active'

      const contactUsSectionText = darkMode ? 'contact-us-dark-mode' : null

      return (
        <nav className={`${navBackground} nav-bar-container`}>
          <ul className="nav-items-list">
            <li className={`nav-item ${HomeBgLight} ${HomeBgDark}`}>
              <Link to="/">
                <button
                  type="button"
                  onClick={onClickHome}
                  className="nav-item-btn"
                >
                  <AiFillHome className={`nav-icon ${activeHomeIcon}`} /> Home
                </button>
              </Link>
            </li>

            <li className={`nav-item ${trendingBgLight} ${trendingBgDark} `}>
              <Link to="/trending">
                <button
                  onClick={onClickTrending}
                  type="button"
                  className="nav-item-btn"
                >
                  <HiFire className={`nav-icon ${activeTrendingIcon}`} />
                  Trending
                </button>
              </Link>
            </li>

            <li className={`nav-item ${gamingBgLight} ${gamingBgDark} `}>
              <Link to="/gaming">
                <button
                  onClick={onClickGaming}
                  type="button"
                  className="nav-item-btn"
                >
                  <SiYoutubegaming className={`nav-icon ${activeGamingIcon}`} />
                  Gaming
                </button>
              </Link>
            </li>

            <li className={`nav-item ${savedBgLight} ${savedBgDark} `}>
              <Link to="/saved-videos">
                <button
                  onClick={onClickSaved}
                  type="button"
                  className="nav-item-btn"
                >
                  <MdPlaylistAdd className={`nav-icon ${activeSavedIcon}`} />{' '}
                  Saved Videos
                </button>
              </Link>
            </li>
          </ul>

          <div className={`contact-us-container ${contactUsSectionText}`}>
            <p className="contact-us-heading">CONTACT US</p>
            <img
              className="social-logos"
              alt="facebook logo"
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
            />
            <img
              className="social-logos"
              alt="twitter logo"
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
            />
            <img
              className="social-logos"
              alt="linked in logo"
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
            />

            <p>Enjoy! Now to see your channels and recommendations!</p>
          </div>
        </nav>
      )
    }}
  </NxtWatchContext.Consumer>
)

export default Navbar
