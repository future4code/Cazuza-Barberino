import comprarCarta from "./naoMexer.js";
// NÃO REMOVA ESTA LINHA

/**
 * EXEMPLO DE UTILIZAÇÃO DA 'comprarCarta'
 * 
 * 
    const carta = comprarCarta(); // Sorteia uma carta. Por exemplo, o rei de ouros
    
    console.log(carta.texto) // imprime o texto da carta. Exemplo: "K♦️" (indica "K" de ouros)
    console.log(carta.valor) // imprime o valor da carta (um número). Exemplo: 10 (dado que "K" vale 10)
 * 
 * 
 * 
 */

const names = ["User", "Computer"];
let userCards = [];
let npcCards = [];
let cards = [];
let score = [];

cards.push(userCards);
cards.push(npcCards);

console.log("Bem vindo ao jogo de BlackJack!");

for (;;) {
  score = [0, 0];
  cards = [[], []];

  if (confirm("Quer iniciar uma nova rodada?")) {
    for (let player = 0; player < 2; player++) {
      let aCheck = false;
      while (!aCheck) {
        for (let card = 0; card < 2; card++) {
          cards[player][card] = comprarCarta();
        }

        if (cards[player][0].valor != 11 || cards[player][1].valor != 11) {
          aCheck = true;
        } else {
          console.log(
            names[player],
            " comprou dois ases. Sorteando novas cartas..."
          );
        }
      }
      for (let i = 0; i < 2; i++) score[player] += cards[player][i].valor;
    }

    //User Draw phase
    while (score[0] <= 21) {
      let msg = "Suas cartas são: ";
      for (let i = 0; i < cards[0].length; i++) msg += cards[0][i].texto + " ";
      msg +=
        ". A carta revelada do computador é: " +
        cards[1][0].texto +
        ".\nDeseja comprar mais uma carta?";

      if (confirm(msg)) {
        let card = comprarCarta();
        cards[0].push(card);
        score[0] += card.valor;
      } else break;
    }

    //Computer draw phase
    if (score[0] <= 21)
      while (score[1] < score[0]) {
        let card = comprarCarta();
        cards[1].push(card);
        score[1] += card.valor;
      }

    for (let i = 0; i < 2; i++) {
      let msg = names[i] + " - cartas: ";
      for (let j = 0; j < cards[i].length; j++) msg += cards[i][j].texto + " ";
      msg += " - pontuação " + score[i];
      console.log(msg);
    }

    if ((score[1] <= 21 && score[1] > score[0]) || score[0] > 21)
      console.log("O ", names[1], " ganhou!");
    else if (score[0] > score[1] || score[1] > 21) console.log("O ", names[0], " ganhou!");
    else console.log("Empate");
  } else {
    console.log("O jogo acabou, dafuq");
    break;
  }
}
