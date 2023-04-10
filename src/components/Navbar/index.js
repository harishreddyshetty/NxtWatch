import {Link} from 'react-router-dom'

import {AiFillHome} from 'react-icons/ai'
import NxtWatchContext from '../../NxtWatchContext/NxtWatchContext'
import './index.css'

const Navbar = () => (
  <NxtWatchContext.Consumer>
    {value => {
      const {darkMode} = value

      const navBackground = darkMode ? 'nav-bg-dark' : 'nav-bg-light'
      const navItemsText = darkMode ? 'text-light' : 'text-dark'

      return (
        <nav className={`${navBackground} nav-bar-container`}>
          <ul className="nav-items-list">
            <Link to="/" className="text">
              <li className="nav-item">
                <AiFillHome className="nav-icon" />
                <p className={`${navItemsText} nav-item-name`}>Home</p>
              </li>
            </Link>
          </ul>
        </nav>
      )
    }}
  </NxtWatchContext.Consumer>
)

export default Navbar
