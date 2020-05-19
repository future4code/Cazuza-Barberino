type Dishe = {
  name: string;
  cost: number;
  price: number;
};

let dishes: Dishe[] = [];

type Sale = {
  dishe: Dishe;
  quantity: number;
};

const sales: Sale[] = [];

function newDishe(dishe: Dishe): void {
  dishes.push(dishe);
}

function dishePrice(name: string): number {
  return dishes.filter((dishe) => dishe.name === name)[0].price;
}

function sellDishe(dishe: Dishe) {
  let index = sales.reduce(
    (value: number, sale: Sale, index: number) =>
      sale.dishe.name === dishe.name ? index : value,
    -1
  );

  //sales.find((sale) => sale.dishe.name === dishe.name);

  if (index < 0) {
    sales.push({
      quantity: 0,
      dishe,
    });
    index = sales.length - 1;
  }

  sales[index].quantity++;
}

function getProfit(): number {
  return sales.reduce(
    (total, sale) =>
      total + sale.quantity * (sale.dishe.price - sale.dishe.cost),
    0
  );
}

console.log("=====Exercício 6=====");

sellDishe({ cost: 10, price: 30, name: "Scargot" });
sellDishe({ cost: 10, price: 30, name: "Scargot" });
sellDishe({ cost: 10, price: 30, name: "Scargot" });

console.log(getProfit());
