export interface Result {
  sum: number;
  number: number;
  mult: number;
}

export function supress(vals: number[]): Result {
  return {
    sum: vals.reduce((total, val) => total + val, 0),
    number: vals.length,
    mult: vals.reduce((total, val) => total * val, 1),
  };
}
