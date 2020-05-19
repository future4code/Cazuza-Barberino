const dna = "ATTGCTGCGCATTAACGACGCGTA";

function convertToRna(dna: string): string {
  return dna
    .split("")
    .map((val) => {
      switch (val) {
        case "A":
          return "U";
        case "T":
          return "A";
        case "C":
          return "G";
        case "G":
          return "C";
        default:
          return val;
      }
    })
    .join("");
}

console.log("=====Execício 7=====");
console.log(convertToRna(dna));
