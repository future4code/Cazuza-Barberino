import { ordenarArrayEmOrdemCrescente } from "./ex5";

describe("Ordena array em ordem crescente", () => {
  it("Primeiro teste", () => {
    const teste = [1, 2, 3, 2, 4];
    const result = ordenarArrayEmOrdemCrescente(teste);

    expect(result).toEqual([1, 2, 2, 3, 4]);
  });
});
