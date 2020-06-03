import React, { InputHTMLAttributes } from 'react';

import './index.scss';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  inputref?: React.Ref<HTMLInputElement>
}

const Input: React.FC<InputProps> = (props) => {

  return (
    <input className="input" {...props} ref={props.inputref}/>
  )
}

export default Input;
