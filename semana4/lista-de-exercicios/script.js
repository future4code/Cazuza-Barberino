/*
INTERPRETAÇÃO

1)
retorna o valor em em real, multplicando um valor em dolar pela cotação inserida pelo usuário, o console imprimiá aproximadamente "R$500"

2)
a função retorna o valor apos um investir um determinado valor em um investimento, 
o console imprimirá: 165 e "Tipo de investimento informado incorreto"

3)
o codigo separa os numeros pares e impares de uma array original em duas arrays separadas, e imprime o tamanho dessas arrays para saber a quantidade de elementos
o console imprimirá: Quantidade total de numeros 14; 6; 8

4)
o codigo imprime o maior e o menor numero contigo em uma array;
-10 e 1590

*/

//LÓGICA

//1)

let arr = [1, 2, 3, 4, 5];

const Logica1 = () => {
  for (let i = 0; i < arr.length; i++) console.log(arr[i]);
  console.log("-----------------------------------");
  arr.forEach(element => {
    console.log(element);
  });
  console.log("-----------------------------------");
  for (element of arr) console.log(element);
  console.log("-----------------------------------");
  for (index in arr) console.log(arr[index]);
  console.log("-----------------------------------");
  let i = 0;
  while (i < arr.length) {
    console.log(arr[i]);
    i++;
  }
};

/** 2)
 * a) false
 * b) true
 * c) true
 * d) true
 * e) true
 */

//3)

const Logica3 = num => {
  for (let i = 0; i < num; i++) console.log(i * 2);
};

//O Código não funcionar porque:
//- a variável 'quantidadeDeNumerosPares'não estava recebendo nenhum valor
//- o i não estava sendo incrementado (loop infinito)
//- o while devia ser apenas menor e não menor-igual, ja que começamos do zero;

function NumeroPares(num) {
  const quantidadeDeNumerosPares = num;
  let i = 0;
  while (i < quantidadeDeNumerosPares) {
    console.log(i * 2);
    i++;
  }
}

//4)

const Logica4 = (a, b, c) => {
  let n = 0;
  if (a == b) n++;
  if (a == c) n++;
  if (b == c) n++;

  switch (n) {
    case 0:
      console.log("Escaleno");
      break;
    case 1:
      console.log("Isósceles");
      break;
    default:
      console.log("Equilátero");
      break;
  }
};

// 5)

const Logica5 = (num1, num2) => {
  if (num2 > num1) {
    let temp = num1;
    num1 = num2;
    num2 = temp;
  }

  console.log("O maior é: ", num1);

  console.log(
    num1 + (num1 % num2 == 0 ? " " : " não ") + "é divisível por " + num2
  );
  console.log(
    num2 + (num2 % num1 == 0 ? " " : " não ") + "é divisível por " + num1
  );

  console.log("A diferença entre eles é ", num1 - num2);
};

// FUNÇÕES

//1)

let array = [5, 1, 4, 2, 3];

const Funcoes1 = arr => {
  //   for (let i = 0; i < arr.length; i++)
  //     for (let j = i + 1; j < arr.length; j++)
  //       if (arr[i] < arr[j]) {
  //         let temp = arr[i];
  //         arr[i] = arr[j];
  //         arr[j] = temp;
  //       }

  arr.sort((a, b) => {
    return b - a;
  });

  console.log("O segundo maior numero é: ", arr[1]);
  console.log("O segundo menor numero é: ", arr[arr.length - 2]);
};

//2)

// (()=>{
//     alert("Hello Future4");
// })();

let funcaoBolada = function() {
  alert("Hello Future4");
};

// funcaoBolada();

// OBJETOS

/**1)
 * array são guardam varias variáves em uma lista, é muito util quando
 * queremos agrupar e iterar objetos semelhantes;
 *
 * objetos é uma forma de agrupar variáveis diferentes que juntas
 * representem uma abstração.
 *
 */

// 2)

const criarRetângulo = (lado1, lado2) => {
  return {
    lado1: lado1,
    lado2: lado2,
    perimetro: 2 * (lado1 + lado2),
    area: lado1 * lado2
  };
};

//3)

let filme = {
  titulo: "Pulp Fiction",
  ano: 1994,
  diretor: "Quentin Tarantino",
  atores: [
    "John Travolta",
    "Samuel L. Jackson",
    "Uma Thurman",
    "Harvey Keitel",
    "Tim Roth",
    "Amanda Plummer",
    "Maria de Medeiros",
    "Ving Rhames",
    "Eric Stoltz",
    "Rosanna Arquette",
    "Christopher Walken",
    "Bruce Willis"
  ]
};

// console.log(
//   "Venha assistir ao filme " +
//     filme.titulo +
//     ", de " +
//     filme.ano +
//     ", dirigido por " +
//     filme.diretor +
//     "e estrelado por " +
//     filme.atores.join(", ")
// );

// 4)

let pessoa = {
  nome: "Cazuza",
  idade: "99",
  email: "no@gmail.com",
  endereco: "r. dafuq"
};

const anonimizarPessoa = person => {
  return {
    ...person,
    nome: "ANÔNIMO"
  };
};

// FUNCOES DE ARRAY

//1)

let pessoas = [
  { nome: "Pedro", idade: 20 },
  { nome: "João", idade: 10 },
  { nome: "Paula", idade: 12 },
  { nome: "Artur", idade: 89 }
];

//a)

const adultsOnly = arr => {
  return arr.filter(pessoa => {
    if (pessoa.idade >= 20) return true;
    return false;
  });
};

// console.log(AdultsOnly(pessoas));

//b)

const childrenOnly = arr => {
  return arr.filter(pessoa => {
    if (pessoa.idade < 20) return true;
    return false;
  });
};

// console.log(ChildrenOnly(pessoas));

// 2)

const array2 = [1, 2, 3, 4, 5, 6];

// a)

const newArray = array2.map(value => {
  return value * 2;
});

// b)

const newArray2 = array2.map(value => {
  return `${value * 3}`;
});

// c)

const newArray3 = array2.map(value => {
  return `${value} é ${value % 2 == 0 ? "par" : "impar"}`;
});

// 3)

const pessoas2 = [
  { nome: "Paula", idade: 12, altura: 1.8 },
  { nome: "João", idade: 20, altura: 1.3 },
  { nome: "Pedro", idade: 15, altura: 1.9 },
  { nome: "Luciano", idade: 22, altura: 1.8 },
  { nome: "Artur", idade: 10, altura: 1.2 },
  { nome: "Soter", idade: 70, altura: 1.9 }
];

//a )

const pessoasComPermissao = pessoas2.filter(pessoa => {
  if (pessoa.altura <= 1.5 || pessoa.idade > 59 || pessoa.idade < 15)
    return false;

  return true;
});

// b)

const pessoasSemPermissao = pessoas2.filter(pessoa => {
  if (pessoa.altura <= 1.5 || pessoa.idade > 59 || pessoa.idade < 15)
    return true;

  return false;
});

// 4)

const consultas = [
  {
    nome: "João",
    genero: "masculino",
    cancelada: true,
    dataDaConsulta: "01/10/2019"
  },
  {
    nome: "Pedro",
    genero: "masculino",
    cancelada: false,
    dataDaConsulta: "02/10/2019"
  },
  {
    nome: "Paula",
    genero: "feminino",
    cancelada: true,
    dataDaConsulta: "03/11/2019"
  },
  {
    nome: "Márcia",
    genero: "feminino",
    cancelada: false,
    dataDaConsulta: "04/11/2019"
  }
];

const emails = consultas.map(pessoa => {
  return (
    "Olá, " +
    (pessoa.genero === "feminino" ? "Sra. " : "Sr. ") +
    pessoa.nome +
    (pessoa.cancelada
      ? ". Infelizmente, sua consulta marcada para o dia " +
        pessoa.dataDaConsulta +
        " foi cancelada. Se quiser, pode entrar em contato conosco para remarcá-la"
      : ". Estamos enviando esta mensagem para lembra-" +
        (pessoa.genero === "feminino" ? "la " : "lo ") +
        "da sua consulta no dia " +
        pessoa.dataDaConsulta +
        ". Por favor, acuse o recebimento deste e-mail.")
  );
});

// 5)

const contas = [
  { cliente: "João", saldoTotal: 1000, compras: [100, 200, 300] },
  { cliente: "Paula", saldoTotal: 7500, compras: [200, 1040] },
  { cliente: "Pedro", saldoTotal: 10000, compras: [5140, 6100, 100, 2000] },
  { cliente: "Luciano", saldoTotal: 100, compras: [100, 200, 1700] },
  { cliente: "Artur", saldoTotal: 1800, compras: [200, 300] },
  { cliente: "Soter", saldoTotal: 1200, compras: [] }
];

const atualizarSaldos = arr =>{
    arr.forEach(conta =>{
        conta.compras.forEach(compra=>{
            conta.saldoTotal -= compra;
        })
    })
}

atualizarSaldos(contas);

