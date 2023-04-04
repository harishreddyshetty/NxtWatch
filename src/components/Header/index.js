import './index.css'

import {BsMoon} from 'react-icons/bs'
import {CgFormatJustify} from 'react-icons/cg'
import {FiLogOut} from 'react-icons/fi'
import NxtWatchContext from '../../NxtWatchContext/NxtWatchContext'

const Header = () => (
  <NxtWatchContext.Consumer>
    {value => {
      const {darkMode} = value

      const headerLogo = darkMode
        ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
        : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'

      return (
        <nav className="nav-bar">
          <img className="header-logo" alt="logo" src={headerLogo} />

          <div className="header-details-container">
            <button className="header-btns" type="button">
              <BsMoon className="header-icons" />
            </button>

            <img
              className="profile"
              alt="profile"
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
            />

            <button className="header-btns hamburger-icon" type="button">
              <CgFormatJustify className="header-icons" />
            </button>
            <button className="header-btns logout-icon" type="button">
              <FiLogOut className="header-icons" />
            </button>

            <button className="logout-btn" type="button">
              Logout
            </button>
          </div>
        </nav>
      )
    }}
  </NxtWatchContext.Consumer>
)

export default Header
