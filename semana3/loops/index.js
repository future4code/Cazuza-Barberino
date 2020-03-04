// 1) O código está somando todos os números de 0 à 14 e imprimindo
//o resultado no console. 105.

// 2)
// a. o push adiciona um elemento no final da array.
// b. [10, 15, 25, 30]
// c. [12, 15, 18, 21, 27, 30] , [12]

// Desafio 1)
// 0
// 00
// 000
// 0000

// 3)

// const arrayOriginal = [80, 30, 130, 40, 60, 21, 70, 120, 90, 103, 110, 55]

// a.

// let maior = arrayOriginal[0], menor = arrayOriginal[0];
// for(let i = 1; i < arrayOriginal.length; i++) 
//     if(arrayOriginal[i] > maior) maior = arrayOriginal[i];
//     else if(arrayOriginal[i] < menor) menor = arrayOriginal[i]; 

// console.log("O maior número é ", maior," e o menor é ", menor);

// b.

// let newArray = arrayOriginal;
// for (let i = 0; i < newArray.length; i++) newArray[i] /= 10;
// console.log(newArray);

// c.

// let newArray = [];
// for (let i = 0; i < arrayOriginal.length; i++)
//     if(!(arrayOriginal[i] % 2)) newArray.push(arrayOriginal[i]);
// console.log(newArray);

// d.

// let newArray = arrayOriginal;
// for (let i = 0; i < newArray.length; i++) 
//     newArray[i] = "O elemento do índex " + i + " é " + newArray[i];
// console.log(newArray);

// Desafio 2)

// console.log("Vamor Jogar!");
// let secretNum = Number(prompt("Digite o Número secreto"));
// let chuteNum;
// let tentativas = 0;

// for(;;){

//     chuteNum = Number(prompt("Chute um Número"));
//     console.log("O número chutado foi: ",chuteNum);
//     tentativas++;

//     if(chuteNum != secretNum) 
//         console.log("Errou, é " + (secretNum > chuteNum ? "maior" : "menor"));
//     else {
//         console.log("Acertou!!");
//         break;
//     } 
// }

// console.log("O número de tentativas foi: ", tentativas);

// Desafio 3)

// console.log("Vamor Jogar!");
// let secretNum = Math.floor((Math.random() * 100) + 1);
// let chuteNum;
// let tentativas = 0;

// for(;;){

//     chuteNum = Number(prompt("Chute um Número"));
//     console.log("O número chutado foi: ",chuteNum);
//     tentativas++;

//     if(chuteNum != secretNum) 
//         console.log("Errou, é " + (secretNum > chuteNum ? "maior" : "menor") + ".");
//     else {
//         console.log("Acertou!!");
//         break;
//     } 
// }

// console.log("O número de tentativas foi: ", tentativas);

//foi fácil fazer a alteração ao inves da variavel receber um valor
// pelo promp ela passou a receber pelo valor retornado da função 
