import React, { ReactElement } from 'react';
import classNames from 'classnames';

import './index.scss';
import Input from '../Input';
interface IAutocompleteInputProps {
  readonly placeholder: string | undefined;
  readonly data: string[];
  readonly addDataHandler: (newData: string) => void;
}

const AutocompleteInput: React.FC<IAutocompleteInputProps> = (props) => {

  const { placeholder, data, addDataHandler } = props;

  const inputRef = React.useRef<HTMLInputElement>(null);

  const [inputValue, setInputValue] = React.useState<string>('');
  const [filtredValues, setFiltredValues] = React.useState<string[]>([]);
  const [currentFiltredValue, setCurrentFiltredValue] = React.useState<string>('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    const newValue = event.target.value.toLowerCase();
    const foundedValues = data.filter(el => el.slice(0, newValue.length).includes(newValue));  //TODO: need a better way to find 
    const lastValues = data.filter(el => el.includes(newValue) && !foundedValues.includes(el));  // matched values
    foundedValues.push(...lastValues);
    setFiltredValues(foundedValues);
    setCurrentFiltredValue('');
  }

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if(event.key === 'Enter' && inputValue) {
      event.preventDefault();
      if(currentFiltredValue) {
        setInputValue(currentFiltredValue);
        setCurrentFiltredValue('');
        setFiltredValues([]);
      } else {
        addDataHandler(inputValue.toLocaleLowerCase());
        setInputValue('');
      }
    } else if (event.keyCode === 40 && filtredValues) {
      filtredValues.indexOf(currentFiltredValue) + 1 === filtredValues.length
        ? setCurrentFiltredValue(filtredValues[0])
        : setCurrentFiltredValue(filtredValues[filtredValues.indexOf(currentFiltredValue) + 1])
    } else if (event.keyCode === 38 && filtredValues) {
      event.preventDefault();
      filtredValues.indexOf(currentFiltredValue) === 0
        ? setCurrentFiltredValue(filtredValues[filtredValues.length - 1])
        : setCurrentFiltredValue(filtredValues[filtredValues.indexOf(currentFiltredValue) - 1])
    }
  }

  const handleMouseClick = (event: React.MouseEvent<HTMLDivElement>) => {
    console.log((event.target as Element).id)
    const choosenFiltredValue = (event.target as Element).id;
    setInputValue(choosenFiltredValue);
    setFiltredValues([]);
    setCurrentFiltredValue('');
    console.log(inputRef)
    inputRef.current?.focus();
  }

  return (
    <div className="autocomplete-input">
      <Input 
        type='text'
        autoComplete='off'
        placeholder={placeholder}
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
        autoFocus={true}
        inputref={inputRef}
        //ref={inputRef}
      />
      <div className="item-container">
        {(filtredValues.length && inputValue) ?
          filtredValues.map(filtredValue => 
              <div 
                key={filtredValue}
                className={classNames('item-container__item',{
                  'item-container__item--selected': filtredValue === currentFiltredValue
                })}
                onClick={handleMouseClick}
                id={filtredValue}
              >
                {filtredValue}
              </div>
            )
          : undefined
        }
      </div>
    </div>
  )
}

export default AutocompleteInput;
