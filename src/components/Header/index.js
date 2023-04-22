import './index.css'
import {withRouter, Link} from 'react-router-dom'
import {BsMoon, BsBrightnessHigh} from 'react-icons/bs'
import Cookie from 'js-cookie'

import {CgFormatJustify} from 'react-icons/cg'
import {FiLogOut} from 'react-icons/fi'
import NxtWatchContext from '../../NxtWatchContext/NxtWatchContext'

const Header = props => (
  <NxtWatchContext.Consumer>
    {value => {
      const {darkMode, onClickThemeBtn} = value

      const onClickLogout = () => {
        const {history} = props
        history.replace('/login')
        Cookie.remove('jwt_token')
      }

      const changeTheme = () => {
        onClickThemeBtn()
      }

      const headerThemeColor = darkMode ? 'nav-bar-dark' : 'nav-bar-light'
      const headerIconsColor = darkMode && 'theme-btn-color'

      const headerLogo = darkMode
        ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
        : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'

      const logoutButtonColor = darkMode ? 'btn-dark' : 'btn-light'

      return (
        <nav className={`nav-bar ${headerThemeColor}`}>
          <Link to="/">
            <img className="header-logo" alt="website logo" src={headerLogo} />
          </Link>

          <div className="header-details-container">
            <button
              data-testid="theme"
              onClick={changeTheme}
              className="header-btns"
              type="button"
            >
              {darkMode ? (
                <BsBrightnessHigh className="header-icons theme-btn-color" />
              ) : (
                <BsMoon className="header-icons" />
              )}
            </button>

            <img
              className="profile"
              alt="profile"
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
            />

            <button className="header-btns hamburger-icon" type="button">
              <CgFormatJustify className={`header-icons ${headerIconsColor}`} />
            </button>
            <button className="header-btns logout-icon" type="button">
              <FiLogOut className={`header-icons ${headerIconsColor}`} />
            </button>

            <button
              onClick={onClickLogout}
              className={`logout-btn ${logoutButtonColor}`}
              type="button"
            >
              Logout
            </button>
          </div>
        </nav>
      )
    }}
  </NxtWatchContext.Consumer>
)

export default withRouter(Header)
