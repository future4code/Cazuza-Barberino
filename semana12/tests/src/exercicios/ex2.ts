export function checaPalindromo(frase: string) {
  return frase === frase.split("").reverse().join("");
}
