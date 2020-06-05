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
        <div className='bookmarks-list__item'>
          <a href={bookmark.url} className="bookmarks-list__item-link" target='__blank'>{bookmark.title}</a>
        </div>
      ))}
    </div>
  )
}

export default BookmarkForm;