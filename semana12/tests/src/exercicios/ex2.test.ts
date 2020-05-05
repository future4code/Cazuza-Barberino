import { checaPalindromo } from "./ex2";

describe("Checa Palíndromo", () => {
  it("Primeiro teste", () => {
    const words = ["mirim", "arara", "asa"];

    const result = words.map((word) => checaPalindromo(word));

    expect(result).toStrictEqual(words.map(() => true));
  });
  it("Primeiro teste", () => {
    const words = ["biscoit", "cazuza", "beatriz"];

    const result = words.map((word) => checaPalindromo(word));

    expect(result).toStrictEqual(words.map(() => false));
  });
});
