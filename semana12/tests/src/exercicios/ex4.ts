export function removeItensDuplicados<T>(array: T[]) {
  for (let i = array.length - 1; i > 0; i--) {
    for (let j = i - 1; j >= 0; j--) {
      if (array[i] === array[j]) {
        array.splice(i, 1);
      }
    }
  }
  return array;
}
