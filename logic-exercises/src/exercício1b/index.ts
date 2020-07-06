export interface Result {
  min: number;
  max: number;
}

export function minmax(vals: number[]): Result {
  vals.sort((a, b) => a - b);
  return {
    min: vals[0],
    max: vals[vals.length - 1],
  };
}
