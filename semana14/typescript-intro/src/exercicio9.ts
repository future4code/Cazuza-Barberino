export function factor(num: number): number {
  if (num <= 1) return 1;
  let result = 1;

  for (let i = 1; i <= num; i++) result *= i;

  return result;
}

console.log("=====Execício 9=====");
console.log(factor(6));
