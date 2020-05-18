const n1 = 5;
const n2 = 7;

function runApp1(num1: number, num2: number) {
  console.log("sum: ", num1 + num2);
  console.log("diff: ", num1 - num2);
  console.log("mult: ", num1 * num2);
  console.log("bigger: ", Math.max(num1, num2));
}

console.log("=====Exercício 1=====");
runApp1(n1, n2);
