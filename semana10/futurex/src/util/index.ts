export const capitalize = (name: string): string =>
  name.charAt(0).toUpperCase() + name.slice(1);

export const validNumberInput = (inputValue: string): [boolean, string] => [
  inputValue === "" || /^[0-9\b]+$/.test(inputValue),
  "field must contain only numbers.",
];

export const validNotEmptyInput = (inputValue: string): [boolean, string] => [
  inputValue.trim() !== "",
  "field can't be empty.",
];
