import {Link} from 'react-router-dom'

import {AiFillHome} from 'react-icons/ai'
import {HiFire} from 'react-icons/hi'
import {SiYoutubegaming} from 'react-icons/si'
import NxtWatchContext from '../../NxtWatchContext/NxtWatchContext'
import './index.css'

const navItems = [
  {
    icon: <AiFillHome className="nav-icon" />,
    id: 'HOME',
    name: 'Home',
    path: '/',
  },
  {
    icon: <HiFire className="nav-icon" />,
    id: 'TRENDING',
    name: 'Trending',
    path: '/trending',
  },
  {
    icon: <SiYoutubegaming className="nav-icon" />,
    id: 'GAMING',
    name: 'Gaming',
    path: '/gaming',
  },
  {
    icon: <SiYoutubegaming className="nav-icon" />,
    id: 'SAVED VIDEOS',
    name: 'Saved videos',
    path: '/saved-videos',
  },
]

const Navbar = () => (
  <NxtWatchContext.Consumer>
    {value => {
      const {darkMode} = value

      const navBackground = darkMode ? 'nav-bg-dark' : 'nav-bg-light'
      const navItemsText = darkMode ? 'text-light' : 'text-dark'

      return (
        <nav className={`${navBackground} nav-bar-container`}>
          <ul className="nav-items-list">
            {navItems.map(eachItem => (
              <Link className="text" to={eachItem.path}>
                <li className="nav-item">
                  {eachItem.icon}
                  <p className={`${navItemsText} nav-item-name`}>
                    {eachItem.name}
                  </p>
                </li>
              </Link>
            ))}
          </ul>
        </nav>
      )
    }}
  </NxtWatchContext.Consumer>
)

export default Navbar

//  <nav className={`${navBackground} nav-bar-container`}>
//           <ul className="nav-items-list">
//             <Link to="/" className="text">
//               <li className="nav-item">
//                 <AiFillHome className="nav-icon" />
//                 <p className={`${navItemsText} nav-item-name`}>Home</p>
//               </li>
//             </Link>
//           </ul>
//         </nav>
