function stringCompressor(text) {
  let compText = text[0];

  let count = 1;

  for (let i = 1; i < text.length; i++) {
    if (text[i] !== compText[compText.length - 1]) {
      compText += count.toString() + text[i];
      count = 1;
    } else {
      count++;
    }
  }
  compText += count.toString();

  return compText.length <= text.length ? compText : text;
}

console.log(stringCompressor("aabbb"));
console.log(stringCompressor("aabcccccaaa"));
console.log(stringCompressor("accurate"));
console.log(stringCompressor("escola"));
console.log(stringCompressor("accuraaaaaaaaaate"));
