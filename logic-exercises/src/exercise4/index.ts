export function haveOnlyNumbers(array: any[]) {
  for (let i = 0; i < array.length; i++)
    if (typeof array[i] !== "number") return false;

  return true;
}
