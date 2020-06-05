import React from 'react';

import './index.scss';
import SearchBookmarkForm from '../../components/SearchBookmarkForm';

interface IBookmarksProps {
  
}

const Bookmarks: React.FC<IBookmarksProps> = () => {

  return (
    <SearchBookmarkForm/>
  )
}

export default Bookmarks;