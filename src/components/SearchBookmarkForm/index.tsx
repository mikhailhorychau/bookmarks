import React, { useEffect } from 'react';

import './index.scss';

import { IBookmark } from '../../interfaces/bookmark';
import Input from '../Input';
import TagsForm from '../TagsForm';
import BookmarksList from '../BookmarksList';
import { lazyFilter } from '../../utils/lazyFIlter';

interface ISearchBookmarkFormProps {
  
}

const SearchBookmarkForm: React.FC<ISearchBookmarkFormProps> = () => {

  const [titleInput, setTitleInput] = React.useState('');
  const [tags, setTags] = React.useState<string[]>([]);
  const [bookmarkTags, setBookmarkTags] = React.useState<string[]>([]);
  const [bookmarks, setBookmarks] = React.useState<IBookmark[]>([]);
  const [filtredBookmarks, setFiltredBookmarks] = React.useState<IBookmark[]>([]);

  const handleTitleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitleInput(event.target.value)
  }

  const removeBookmarkTag = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    const target = event.target as Element;
    setBookmarkTags(bookmarkTags.filter(tag => tag !== target.id))
  }

  const addTagToBookmarkHandler = (tag: string) => {
    if(!bookmarkTags.includes(tag)) {
      setBookmarkTags([...bookmarkTags, tag]);
    }
  }

  useEffect(() => {
    setTags(JSON.parse(localStorage.getItem('tags') || "[]"))
    setBookmarks(JSON.parse(localStorage.getItem('bookmarks') || "[]"))
  }, []);

  useEffect(() => {
    const foundByTitleBookmarks = bookmarks.filter(bookmark => 
      lazyFilter(titleInput, bookmarks.map(filteredBookmark => filteredBookmark.title)).includes(bookmark.title));
    if(bookmarkTags.length) {
      const foundByTitleAndTagsBookmarks = foundByTitleBookmarks.filter(bookmark => 
      bookmarkTags.every(tag => bookmark.tags.includes(tag)));
      setFiltredBookmarks(foundByTitleAndTagsBookmarks)
    } else {
      setFiltredBookmarks(foundByTitleBookmarks)
    }
  }, [bookmarkTags, titleInput, bookmarks]);

  return (
    <div className='searchBookmark-form'>
      <div className="searchBookmark-form__header">
        Search bookmark
      </div>
      <div className="searchBookmark-form__title-input">
        <Input 
          type='text' 
          placeholder='Bookmark Title'
          value={titleInput}
          onChange={handleTitleInputChange}
        />
      </div>
      <TagsForm 
        tags={tags} 
        removeTagHandler={removeBookmarkTag} 
        addTagHandler={addTagToBookmarkHandler} 
        selectedTags={bookmarkTags}
        onlyMatchedValues  
      />
      <div className="searchBookmark-form__header">
        Bookmarks list
      </div>
      <BookmarksList bookmarks={filtredBookmarks}/>
    </div>
  )
}

export default SearchBookmarkForm;