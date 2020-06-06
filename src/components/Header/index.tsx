import React, { useState, useEffect } from 'react';
import useWindowSize from '@rehooks/window-size';
import {NavLink} from 'react-router-dom';

import './index.scss';
import MenuButton from '../Buttons/MenuButton';
interface IHeaderProps {
  
}

const Header: React.FC<IHeaderProps> = () => {

  const [isMenuOpen, setMenuOpen] = useState(false);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    console.log('clicked')
    setMenuOpen(!isMenuOpen);
  }

  let windowWidth = useWindowSize().innerWidth;

  return (
    <div className='header'>
      <div className="header__logo">
        Bookmarks
      </div>
      {windowWidth > 780 ? 
        <div className="links-container">
          <NavLink to="/new" className="link">
            New Bookmark
          </NavLink>
          <NavLink to="/list" className="link">
            Bookmarks List
          </NavLink>
          <NavLink to="/settings" className="link">
            Settings
          </NavLink>
        </div> :
        <div className='menu-container'>
          <MenuButton onClick={handleMenuClick}/>
        </div>
      }
      {(isMenuOpen && windowWidth < 768) ?      
       <div className="dropdown-container" onClick={handleMenuClick}>
        <NavLink to="/new" className="dropdown-container__link">
          New Bookmark
        </NavLink>
        <NavLink to="/list" className="dropdown-container__link">
          Bookmarks List
        </NavLink>
        <NavLink to="/settings" className="dropdown-container__link">
          Settings
        </NavLink>
      </div> : undefined}
    </div>
  )
}

export default Header;