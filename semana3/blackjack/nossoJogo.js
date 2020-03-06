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

const names = ["Player", "Computador"];
let playerCards = [];
let npcCards = [];
let cards = [];
let score = [];

cards.push(playerCards);
cards.push(npcCards);

console.log("Bem vindo ao jogo de BlackJack!");

for(;;){
   if (confirm("Quer iniciar uma nova rodada?")) {
      for (let i = 0; i < 2; i++) {
        playerCards[i] = comprarCarta();
        npcCards[i] = comprarCarta();
      }
    
      for (let i = 0; i < 2; i++) {
        score[i] = cards[i][0].valor + cards[i][1].valor;
        console.log(
          names[i],
          " - cartas: ",
          cards[i][0].texto,
          cards[i][1].texto,
          " - pontuação ",
          score[i]
        );
      }
    
      if(score[0] > score[1]) console.log("O ", names[0], " ganhou!" );
      else if(score[0] < score[1]) console.log("O ", names[1], " ganhou!" );
      else console.log("Empate");
    
    } else {
      console.log("O jogo acabou");
      break;
    }
}


