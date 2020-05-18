function runApp4(year: number, era: string = "DC"): string {
  if (year < 0) return "Invaled Year";

  let returnVal = "";

  switch (era.toUpperCase()) {
    case "DC":
      if (year < 476) returnVal = "Idade Antiga";
      else if (year < 1453) returnVal = "Idade Média";
      else if (year < 1789) returnVal = "Idade Moderna";
      else returnVal = "Idade Contemporânea";
      break;
    case "AC":
      if (year > 4000) returnVal = "Pré-história";
      else returnVal = "Idade Antiga";
      break;
    default:
      returnVal = "Invalid era.";
      break;
  }

  return returnVal;
}

console.log("=====Exercício 4=====");
console.log(runApp4(4994, "AC"));
