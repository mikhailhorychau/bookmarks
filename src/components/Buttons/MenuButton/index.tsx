import React, { ButtonHTMLAttributes } from 'react';

import './index.scss';

interface IMenuButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  
}

const MenuButton: React.FC<IMenuButtonProps> = (props) => {

  return (
    <button className="button-menu" {...props}>
      <svg width="48" height="48" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 9H27" stroke="white" strokeWidth="3"/>
        <path d="M5 23H27" stroke="white" strokeWidth="3"/>
        <path d="M5 16H27" stroke="white" strokeWidth="3"/>
      </svg>
    </button>
  )
}

export default MenuButton;