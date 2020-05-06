import { sorteiaNumero } from "./ex3";

describe("Sorteia Número", () => {
  it("Primeiro teste", () => {
    const m = 1;
    const M = 100;

    const result = sorteiaNumero(m, M);

    expect(result).toBeLessThan(M);
    expect(result).toBeGreaterThanOrEqual(m);
  });
});
