import React from 'react';

import './index.scss';

import {IBookmark} from '../../interfaces/bookmark';

interface IBookmarkFormProps extends React.HTMLAttributes<HTMLDivElement> {
  bookmarks: IBookmark[];
}

const BookmarkForm: React.FC<IBookmarkFormProps> = ({bookmarks, ...props}) => {

  return (
    <div className="bookmarks-list" {...props}>
      {bookmarks.map(bookmark => (
        <div className='bookmark-item'>
          <a href={bookmark.url} className="bookmark-item__link" target='__blank'>{bookmark.title}</a>
        </div>
      ))}
    </div>
  )
}

export default BookmarkForm;