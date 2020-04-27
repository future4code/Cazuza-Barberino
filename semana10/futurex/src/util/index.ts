export const capitalize = (name: string): string =>
  name.charAt(0).toUpperCase() + name.slice(1);

export const validNumberInput = (inputValue: string): [boolean, string] => [
  inputValue === "" || /^[0-9\b]+$/.test(inputValue),
  "must contain only numbers.",
];

export const validNotEmptyInput = (inputValue: string): [boolean, string] => [
  inputValue.trim() !== "",
  "can't be empty.",
];

export const validMinLetters = (min: number) => (
  inputValue: string
): [boolean, string] => [
  inputValue.trim().length >= min,
  `must contain ate least ${min} characters.`,
];

export const validMinValue = (min: number) => (
  inputValue: string
): [boolean, string] => [+inputValue >= min, `minimun value is ${min}.`];
