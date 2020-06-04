import React, { useState, useEffect } from 'react';
import useWindowSize from '@rehooks/window-size';

import './index.scss';
import MenuButton from '../Buttons/MenuButton';
interface IHeaderProps {
  
}

const Header: React.FC<IHeaderProps> = () => {

  const [isMenuOpen, setMenuOpen] = useState(false);

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    console.log('clicked')
    setMenuOpen(!isMenuOpen);
  }

  let windowWidth = useWindowSize().innerWidth;

  return (
    <div className='header'>
      <div className="header__logo">
        Bookmarks
      </div>
      {windowWidth > 768 ? 
        <div className="links-container">
          <a href="/#" className="link">
            New Bookmark
          </a>
          <a href="/#" className="link">
            Bookmarks List
          </a>
          <a href="/#" className="link">
            Help
          </a>
        </div> :
        <div className='menu-container'>
          <MenuButton onClick={handleMenuClick}/>
        </div>
      }
      {(isMenuOpen && windowWidth < 768) ?      
       <div className="dropdown-container">
        <a href="/#" className="dropdown-container__link">
          New Bookmark
        </a>
        <a href="/#" className="dropdown-container__link">
          Bookmarks list
        </a>
        <a href="/#" className="dropdown-container__link">
          Help
        </a>
      </div> : undefined}
    </div>
  )
}

export default Header;