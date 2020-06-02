import React from 'react';

import './index.scss';
import AutocompleteInput from '../AutocompleteInput';

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

  const addTag = (tag: string) => {
    if(!test_data.includes(tag)) {
      test_data.push(tag);
      test_data.sort();
    };
    console.log(test_data);
  }

  return (
    <AutocompleteInput data={test_data} addDataHandler={addTag} placeholder='tag'/>
  )
}

export default BookmarkForm;
