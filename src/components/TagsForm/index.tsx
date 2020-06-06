import React, { ChangeEvent } from 'react';

import './index.scss';

import AutocompleteInput from '../AutocompleteInput';
import Chip from '../Chip';
import Input from '../Input';

interface ITagsFormProps {
  readonly tags: string[];
  readonly selectedTags: string[]
  addTagHandler?: (tag: string) => void;
  removeTagHandler?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  changeSearchValueHandler?: (searchValue: string) => void;
  readonly onlyMatchedValues?: boolean;
  readonly formType?: 'add' | 'edit';
}

const TagsForm: React.FC<ITagsFormProps> = ({
  tags, 
  selectedTags, 
  addTagHandler, 
  removeTagHandler, 
  onlyMatchedValues,
  changeSearchValueHandler,
  formType
}) => {

  const [searchInputValue, setSearchInputValue] = React.useState('');

  const handleSeacrhInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchInputValue(event.target.value);
    if(changeSearchValueHandler) {
      changeSearchValueHandler(event.target.value);
    }
  } 

  return (
    <div className="tags-form">
      {formType === 'edit'? 
        <div className="tags-form__input-container">
          <Input value={searchInputValue} onChange={handleSeacrhInputChange}/>
        </div> : 
        <div className="tags-form__input-container">
          <AutocompleteInput data={tags} addDataHandler={addTagHandler} placeholder='Tag' onlyMatchedValues={onlyMatchedValues}/>
        </div>}
      {selectedTags.length ? 
        <div className='tags-form__chip-container'>
            {selectedTags.map(tag => (
              <Chip selected key={tag} id={tag} onClick={removeTagHandler} >
                {tag}
              </Chip>
            ))}
        </div> : undefined}
    </div>
  )
}

export default TagsForm;