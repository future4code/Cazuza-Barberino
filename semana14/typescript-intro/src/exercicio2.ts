const arr = [2, 3, 4, 6, 10];

function runApp2(array: number[]) {
  console.log("size: ", array.length);
  console.log("n of even nums: ", array.filter((val) => val % 2 !== 0).length);
  console.log(
    "sum: ",
    array.reduce((prevVal, val) => prevVal + val),
    0
  );
}

console.log("=====Exercício 2=====");
runApp2(arr);
