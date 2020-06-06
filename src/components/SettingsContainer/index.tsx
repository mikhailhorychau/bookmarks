import React, { useEffect } from 'react';

import './index.scss';
import TagsForm from '../TagsForm';
interface ISettingsContainerProps {
  
}
const SettingsContainer: React.FC<ISettingsContainerProps> = () => {

  const [tags, setTags] = React.useState<string[]>([]);
  const [filtredTags, setFiltredTags] = React.useState<string[]>([]);

  useEffect(() => {
    const localTags = JSON.parse(localStorage.getItem('tags') || "[]");
    setTags(localTags);
    setFiltredTags(localTags);
  }, []);

  const changeSearchValueHandler = (searchValue: string) => {
    if(searchValue.length) {
      setFiltredTags(filtredTags.filter(tag => tag.includes(searchValue)))
    } else {
      setFiltredTags(tags);
    }
  }

  const removeTagHandler = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    const target = event.target as Element;
    const newTags = tags.filter(tag => tag !== target.id);
    const newFiltredTags = filtredTags.filter(filtredTag => filtredTag !== target.id)
    localStorage.setItem('tags', JSON.stringify(newTags));
    setTags(newTags);
    setFiltredTags(newFiltredTags);
  }

  return (
    <div className="settings-container">
      <div className="settings-container__header">
        Search tag
      </div>
      <TagsForm 
        tags={tags} 
        selectedTags={filtredTags} 
        formType="edit" 
        changeSearchValueHandler={changeSearchValueHandler}
        removeTagHandler={removeTagHandler}
      />
    </div>
  )
}

export default SettingsContainer;
