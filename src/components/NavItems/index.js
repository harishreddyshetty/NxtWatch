import {Link} from 'react-router-dom'

import './index.css'

const NavItems = props => {
  const {navItems} = props
  const {icon, name, path} = navItems

  //   const activeNavPath = activeNavItem ? '' : ''
  // const activeNavBtn = activeNavItem ? '' : ''

  return (
    <Link className="text" to={path}>
      <li className="nav-item">
        {icon}
        <p>{name}</p>
      </li>
    </Link>
  )
}

export default NavItems

// className={`${navItemsText} nav-item-name`}
