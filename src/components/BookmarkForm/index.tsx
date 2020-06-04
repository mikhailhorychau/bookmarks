import React, { useEffect } from 'react';

import './index.scss';
import AutocompleteInput from '../AutocompleteInput';
import Input from '../Input';
import Chip from '../Chip';

interface IBookmarkFormProps {
  
}
const BookmarkForm: React.FC<IBookmarkFormProps> = () => {

  const [tags, setTags] = React.useState<string[]>([]);
  const [bookmarkTags, setBookmarkTags] = React.useState<string[]>([]);
  const [urlInput, setUrlInput] = React.useState('');
  const [titleInput, setTitleInput] = React.useState('');

  useEffect(() => {
    const localTags = JSON.parse(localStorage.getItem('tags') || "[]");
    setTags(localTags);
  }, [])

  const addBookmarkTag = (tag: string) => {
    if(!bookmarkTags.includes(tag)) {
      const newBookmarkTags = [...bookmarkTags, tag].sort();
      setBookmarkTags(newBookmarkTags);
    }
    if(!tags.includes(tag)) {
      const newTags = [...tags, tag].sort();
      setTags(newTags);
      localStorage.setItem('tags', JSON.stringify(newTags));
    };
  }

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    if(urlInput && titleInput) {
      const localBookmarks = JSON.parse(localStorage.getItem('bookmarks') || "[]");
      const newBookmark = {
        url: urlInput,
        title: titleInput,
        tags: bookmarkTags
      }
      localStorage.setItem('bookmarks', JSON.stringify([...localBookmarks, newBookmark]));
      setUrlInput('');
      setTitleInput('');
      setBookmarkTags([]);
    }
  }

  const handleUrlInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUrlInput(event.target.value)
  }

  const handleTitleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitleInput(event.target.value)
  }

  const removeBookmarkTag = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    const target = event.target as Element;
    setBookmarkTags(bookmarkTags.filter(tag => tag !== target.id))
  }

  return (
    <div className='bookmark-form'>
      <div className="bookmark-form__header">
        Add new bookmark
      </div>
      <div className="bookmark-form__input-wrapper">
        <Input 
          type='text' 
          placeholder='Bookmark URL'
          name='url'
          value={urlInput}
          onChange={handleUrlInputChange}
          autoComplete='off'
        />
      </div>
      <div className="bookmark-form__input-wrapper">
        <Input 
          type='text' 
          placeholder='Bookmark Title'
          name='title'
          value={titleInput}
          onChange={handleTitleInputChange}
          autoComplete='off'
        />
      </div>
      <div className="bookmark-form__input-wrapper">
        <AutocompleteInput data={tags} addDataHandler={addBookmarkTag} placeholder='Tag'/>
      </div>
      <button className="bookmark-form__button" onClick={handleSubmit}>
        Save Bookmark
      </button>
      {bookmarkTags.length ? 
        <div className='chip-container'>
          {/* <div className="chip-container__title">Tags:</div> */}
          <div className="chip-container__items">
            {bookmarkTags.map(tag => (
              <Chip selected key={tag} id={tag} onClick={removeBookmarkTag}>
                {tag}
              </Chip>
            ))}
          </div>
        </div> : undefined}
    </div>
  )
}

export default BookmarkForm;
