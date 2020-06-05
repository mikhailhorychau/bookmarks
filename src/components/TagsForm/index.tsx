import React from 'react';

import './index.scss';

import AutocompleteInput from '../AutocompleteInput';
import Chip from '../Chip';

interface ITagsFormProps {
  readonly tags: string[];
  readonly selectedTags: string[]
  addTagHandler?: (tag: string) => void;
  removeTagHandler: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const TagsForm: React.FC<ITagsFormProps> = ({tags, selectedTags, addTagHandler, removeTagHandler}) => {


  return (
    <div className="tags-form">
      <div className="tags-form__input-container">
        <AutocompleteInput data={tags} addDataHandler={addTagHandler} placeholder='Tag'/>
      </div>
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