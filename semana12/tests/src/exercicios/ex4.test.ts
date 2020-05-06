import { removeItensDuplicados } from "./ex4";

describe("Remove itens duplicados", () => {
  it("Primeiro teste", () => {
    const teste = [1, 2, 3, 2, 4];
    const result = removeItensDuplicados(teste);

    expect(result).toEqual([1, 2, 3, 4]);
  });
});
