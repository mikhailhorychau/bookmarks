import React from 'react';
import classNames from 'classnames';

import './index.scss';

interface IChipProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
  selected?: boolean;
}

const Chip: React.FC<IChipProps> = (props) => {

  return (
    <button 
      className={classNames(
        'chip',
        {'chip--selected': props.selected}
      )} 
      onClick={(e) => e.preventDefault()} 
      {...props}
    >
      {props.children}
    </button>
  )
}

export default Chip;