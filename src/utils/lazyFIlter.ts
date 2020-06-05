export const lazyFilter = (value: string, filtredArray: string[]): string[] => {
  if(filtredArray.length) {
    const newValue = value.toLowerCase();
    const foundedValues = filtredArray.filter(el => el.slice(0, newValue.length).includes(newValue));  //TODO: need a better way to find 
    const lastValues = filtredArray.filter(el => el.includes(newValue) && !foundedValues.includes(el));  // matched values
    foundedValues.push(...lastValues);
    return foundedValues;
  } else return [];
}
