import React, { ReactElement } from 'react';
import classNames from 'classnames';

import './index.scss';
import Input from '../Input';
interface IAutocompleteInputProps {
  readonly placeholder: string | undefined;
  readonly data: string[];
  readonly addDataHandler: (newData: string) => void;
}

const lazyFilter = (value: string, filtredArray: string[]): string[] => {
  const newValue = value.toLowerCase();
  const foundedValues = filtredArray.filter(el => el.slice(0, newValue.length).includes(newValue));  //TODO: need a better way to find 
  const lastValues = filtredArray.filter(el => el.includes(newValue) && !foundedValues.includes(el));  // matched values
  foundedValues.push(...lastValues);
  return foundedValues;
}

const AutocompleteInput: React.FC<IAutocompleteInputProps> = (props) => {

  const { placeholder, data, addDataHandler } = props;

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
        addDataHandler(inputValue.toLocaleLowerCase());
        setInputValue('');
      }
    } else if ((event.keyCode === 40 || event.keyCode ===9) && filtredValues && inputValue) {
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
    const choosenFiltredValue = (event.target as Element).id;
    console.log(choosenFiltredValue)
    clearFilter();
    setInputValue(choosenFiltredValue);
    console.log(filtredValues)
    inputRef.current?.focus();
  }

  const handleBlur = () => {
    clearFilter();
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
        //onBlur={handleBlur}
        // onFocus={handleFocus}
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
