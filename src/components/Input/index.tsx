import React, { InputHTMLAttributes } from 'react';

import './index.scss';
const Input: React.FC<InputHTMLAttributes<HTMLInputElement>> = (props) => {

  return (
    <input className="input" {...props}/>
  )
}

export default Input;
