import React from 'react';

import './index.scss';
import AutocompleteInput from '../AutocompleteInput';
import Input from '../Input';
import Chip from '../Chip';

let test_data = [
  'c',
  'c++',
  'c#',
  'java',
  'javascript'
]


interface IBookmarkFormProps {
  
}
const BookmarkForm: React.FC<IBookmarkFormProps> = () => {

  const [bookmarkTags, setBookmarkTags] = React.useState<string[]>([]);

  const addBookmarkTag = (tag: string) => {
    if(!bookmarkTags.includes(tag)) {
      const newBookmarkTags = [...bookmarkTags, tag].sort();
      setBookmarkTags(newBookmarkTags);
    }
    if(!test_data.includes(tag)) {
      test_data.push(tag);
      test_data.sort();
    };
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
        <Input type='text' placeholder='Bookmark Title'/>
      </div>
      <div className="bookmark-form__input-wrapper">
        <Input type='text' placeholder='Bookmark Title'/>
      </div>
      <div className="bookmark-form__input-wrapper">
        <AutocompleteInput data={test_data} addDataHandler={addBookmarkTag} placeholder='tag'/>
      </div>
      <div className='chip-container'>
        <div className="chip-container__title">Tags:</div>
        <div className="chip-container__items">
          {bookmarkTags.map(tag => (
            <Chip selected key={tag} id={tag} onClick={removeBookmarkTag}>
              {tag}
            </Chip>
          ))}
        </div>
      </div>
    </div>
  )
}

export default BookmarkForm;
