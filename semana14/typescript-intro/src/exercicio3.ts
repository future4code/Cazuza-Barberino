type post = {
  author: string;
  text: string;
};

const posts: post[] = [
  { author: "Goli", text: "Quack" },
  { author: "Cazuza", text: "Diverção" },
  { author: "Ricardo", text: "Vou Roubar seus memes" },
  { author: "Soter", text: "Bananinha" },
  { author: "Soter", text: "Respira fundo" },
];

function runApp3(posts: post[], author: string): post[] {
  return posts.filter((post) => post.author === author);
}

console.log("=====Exercício 3=====");
console.log(runApp3(posts, "Soter"));
