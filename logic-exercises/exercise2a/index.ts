export function stringInfo(text: string) {
  return {
    size: text.length,
    firstChar: text[0],
    lastChar: text[text.length - 1],
  };
}
