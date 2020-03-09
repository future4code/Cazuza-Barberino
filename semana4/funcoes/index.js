// 1)
// a. []
// b. [0, 1, 0, 1, 2, 3]
// c. [0, 1, 0, 1, 2, 3, 0, 1, 2, 3, 4, 5]

// 2)
// a. A sáide é o index daquele nome dentro da array.
// b. sim.

// 3) ela retorna uma array com dois elesmentos,
// a soma de todos os elementos da array do argumento e
// o produto de todos os elementos da array do argumento.

// 4)
// a.
// const AgeConverterDogToHuman = dogAge => {
//   return dogAge * 7;
// };

// b.

// const PrintPerson = (name, age, adress, student) => {
//   return (
//     "Eu sou " +
//     name +
//     ", tenho " +
//     age +
//     " anos, moro em " +
//     adress +
//     " e " +
//     (student ? "sou" : "não sou") +
//     " estudante."
//   );
// };

// 5)

// const DefSeculo = ano => {
//   let sec = ~~(ano / 100);
//   if (Boolean(ano - sec * 100)) sec++;

//   return "O ano " + ano + " pertence ao século " + RomanConverter(sec);
// };

// let nums = [1000, 500, 100, 50, 10, 5, 1];
// let romanSymbols = ["M", "D", "C", "L", "X", "V", "I"];

// const RomanConverter = num => {
//   if (num > 3999 || num < 0) return null;

//   let romanNum = "";

//   for (let i = 0; i < 4; i++) {
//     let temp = ~~(num / nums[2 * i]);

//     switch (temp) {
//       case 4:
//         romanNum += romanSymbols[2 * i] + romanSymbols[2 * i - 1];
//         break;
//       case 9:
//         romanNum += romanSymbols[2 * i] + romanSymbols[2 * i - 2];
//         break;
//       default:
//         if (temp > 5) {
//           romanNum += romanSymbols[2 * i - 1];
//           temp -= 5;
//         }
//         for (let j = 0; j < temp; j++) romanNum += romanSymbols[2 * i];
//         break;
//     }

//     num %= nums[2 * i];
//   }

//   return romanNum;
// };

// console.log(RomanConverter(789));

// for (let i = 1; i < 20; i++) console.log(RomanConverter(i));

// 6)

// const array = [10, 23, 45, 78, 90, 52, 35, 67, 84, 22];

// // a.

// const ArraySize = array => {
//   return array.length;
// };

// // b.

// const IsEven = num => {
//   return !Boolean(num % 2);
// };

// // c.

// const EvenSize = array => {
//   let num = 0;
//   for (let i = 0; i < ArraySize(array); i++) if (IsEven(array[i])) num++;
//   return num;
// };

// // d.

// const EvenSize = array => {
//   let num = 0;
//   for (let i = 0; i < ArraySize(array); i++) if (IsEven(array[i])) num++;
//   return num;
// };
