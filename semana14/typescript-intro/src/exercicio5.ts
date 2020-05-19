enum productType {
  VERAO = "Verão",
  INVERNO = "Inverno",
  BANHO = "Banho",
  INTIMA = "Íntima",
}

type product = {
  name: string;
  price: number;
  type: productType;
  discountPrice?: number;
};

const products: product[] = [
  { name: "Biquini", type: productType.BANHO, price: 80 },
  { name: "Short", type: productType.VERAO, price: 40 },
  { name: "T-Shirt", type: productType.INTIMA, price: 20 },
  { name: "Casaco", type: productType.INVERNO, price: 120 },
];

function runApp5(produtcs: product[]): product[] {
  produtcs.forEach((product) => {
    let discount = 0;
    switch (product.type) {
      case productType.BANHO:
        discount = 0.04;
        break;
      case productType.INTIMA:
        discount = 0.07;
        break;
      case productType.INVERNO:
        discount = 0.1;
        break;
      case productType.VERAO:
        discount = 0.05;
        break;
    }

    product.discountPrice = product.price * (1 - discount);
  });

  return produtcs;
}

console.log("=====Exercício 5=====");
console.log(runApp5(products));
