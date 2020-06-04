import React from 'react';

import './index.scss';
import NewBookmarkForm from '../../components/NewBookmarkForm';

interface INewBookmarkProps {
  
}

const NewBookmark: React.FC<INewBookmarkProps> = () => {

  return (
    <NewBookmarkForm/>
  )
}

export default NewBookmark;