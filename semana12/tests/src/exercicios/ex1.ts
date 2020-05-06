export function anoBissexto(ano: number) {
  return ano % 400 === 0 || (ano % 4 === 0 && ano % 100 !== 0);
}
