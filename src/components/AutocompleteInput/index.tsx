import React, { ReactElement } from 'react';
import classNames from 'classnames';

import './index.scss';
import Input from '../Input';

interface IAutocompleteInputProps {
  readonly placeholder: string | undefined;
  readonly data: string[];
  readonly addDataHandler?: (newData: string) => void;
  readonly onlyMatchedValues?: boolean;
}

const lazyFilter = (value: string, filtredArray: string[]): string[] => {
  if(filtredArray.length) {
    const newValue = value.toLowerCase();
    const foundedValues = filtredArray.filter(el => el.slice(0, newValue.length).includes(newValue));  //TODO: need a better way to find 
    const lastValues = filtredArray.filter(el => el.includes(newValue) && !foundedValues.includes(el));  // matched values
    foundedValues.push(...lastValues);
    return foundedValues;
  } else return [];
}

const AutocompleteInput: React.FC<IAutocompleteInputProps> = (props) => {

  const { placeholder, data, addDataHandler, onlyMatchedValues } = props;

  const inputRef = React.useRef<HTMLInputElement>(null);

  const [inputValue, setInputValue] = React.useState<string>('');
  const [filtredValues, setFiltredValues] = React.useState<string[]>([]);
  const [currentFiltredValue, setCurrentFiltredValue] = React.useState<string>('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    setFiltredValues(lazyFilter(event.target.value, data));
    setCurrentFiltredValue('');
  }

  const clearFilter = ():void => {
    setCurrentFiltredValue('');
    setFiltredValues([]);
  }

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if(event.key === 'Enter' && inputValue) {
      event.preventDefault();
      if(currentFiltredValue) {
        setInputValue(currentFiltredValue);
        clearFilter();
      } else {
        if(addDataHandler) {
          if (onlyMatchedValues) {
            if(data.includes(inputValue.toLowerCase())) {
              addDataHandler(inputValue.toLocaleLowerCase());
            }
          } else {
            addDataHandler(inputValue.toLocaleLowerCase());
          }
        } 
        setInputValue('');
      }
    } else if ((event.keyCode === 40 || event.keyCode ===9) && filtredValues.length && inputValue) {
      event.preventDefault();
      filtredValues.indexOf(currentFiltredValue) + 1 === filtredValues.length
        ? setCurrentFiltredValue(filtredValues[0])
        : setCurrentFiltredValue(filtredValues[filtredValues.indexOf(currentFiltredValue) + 1])
    } else if (event.keyCode === 38 && filtredValues) {
      event.preventDefault();
      filtredValues.indexOf(currentFiltredValue) === 0
        ? setCurrentFiltredValue(filtredValues[filtredValues.length - 1])
        : setCurrentFiltredValue(filtredValues[filtredValues.indexOf(currentFiltredValue) - 1])
    } else if (event.keyCode === 27) {
      clearFilter();
    }
  }

  const handleMouseClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    const choosenFiltredValue = (event.target as Element).id;
    clearFilter();
    setInputValue(choosenFiltredValue);
    inputRef.current?.focus();
  }

  const handleBlur = () => {
    setTimeout(() => {setFiltredValues([]);}, 100)
  }

  const handleFocus = () => {
    if(inputValue) {
      setFiltredValues(lazyFilter(inputValue, data));
      setCurrentFiltredValue('');
    }
  }

  return (
    <div className="autocomplete-input">
      <Input 
        type='text'
        autoComplete='off'
        placeholder={placeholder}
        value={inputValue}
        onChange={handleInputChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        onKeyDown={handleKeyPress}
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
