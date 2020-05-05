export function primeirasLetrasParaMaiusculas(frase: string) {
  const newFrase = frase
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return newFrase;
}
