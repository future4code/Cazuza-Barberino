import { anoBissexto } from "./ex1";

describe("Ano bissexto", () => {
  it("Primeiro teste", () => {
    const anos = [1600, 2000, 2400, 2800];

    const result = anos.map((ano) => anoBissexto(ano));

    expect(result).toStrictEqual(anos.map(() => true));
  });
  it("Segundo teste", () => {
    const anos = [1996, 2000, 2004, 2008, 2012, 2016];

    const result = anos.map((ano) => anoBissexto(ano));

    expect(result).toStrictEqual(anos.map(() => true));
  });
  it("Terceiro teste", () => {
    const anos = [1997, 2001, 2005, 2009, 2013, 2017];

    const result = anos.map((ano) => anoBissexto(ano));

    expect(result).toStrictEqual(anos.map(() => false));
  });
});
