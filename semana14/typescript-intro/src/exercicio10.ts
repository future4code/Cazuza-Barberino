import { factor } from "./exercicio9";

function numberOfAnagramsNonRepeatingLetters(text: string): number {
  return factor(text.length);
}

function numberOfAnagramsRepeatingLetters(text: string): number {
  let nOfRepeatingLetter = 1;

  const letterList: string[] = [];

  for (let i = 0; i < text.length; i++) {
    if (letterList.indexOf(text[i].toUpperCase()) < 0)
      letterList.push(text[i].toUpperCase());
    else nOfRepeatingLetter++;
  }

  return factor(text.length) / factor(nOfRepeatingLetter);
}

console.log("=====Execício 10=====");
console.log(numberOfAnagramsNonRepeatingLetters("mesa"));
console.log(numberOfAnagramsRepeatingLetters("Anagrama"));
