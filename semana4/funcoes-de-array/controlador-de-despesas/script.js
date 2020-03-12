let domDespList = document.getElementById("desp-list");
let sections = [
  document.getElementById("ctr-desp"),
  document.getElementById("desp-details"),
  document.getElementById("extrato")
];

let despList = [];
let listOnDisplay = [];

const GoToSection = sectionID => {
  sections.forEach(sections => {
    sections.style.display = "none";
  });
  sections[sectionID].style.display = "flex";

  switch (sectionID) {
    case 1:
      LoadDesp(despList);
      break;
    case 2:
      CalcExtrato();
      break;
  }
};

class Despesa {
  constructor(desc, type, val) {
    this.desc = desc;
    this.type = type;
    this.val = Number(val);
  }
}

const AddDesp = () => {
  let val = document.getElementById("val");
  let type = document.getElementById("type");
  let desc = document.getElementById("desc");
  despList.push(new Despesa(desc.value, type.value, val.value));
  val.value = desc.value = "";
  alert("Despesa cadastrada!");
};

const LoadDesp = arr => {
  domDespList.innerHTML = "";
  arr.forEach(desp => {
    domDespList.innerHTML +=
      "<div class='desp'>" +
      "<p>" +
      desp.type +
      " - " +
      desp.desc +
      "</p>" +
      "<p> R$" +
      desp.val +
      ",00</p>" +
      "</div>";
  });
  listOnDisplay = arr;
};

const UpdateMinVal = () => {
  let minVal = document.getElementById("min-val");
  let maxVal = document.getElementById("max-val");
  minVal.max = maxVal.value;
};

const Filter = () => {
  let minVal = document.getElementById("min-val");
  let maxVal = document.getElementById("max-val");
  let type = document.getElementById("filter-type");

  let temp = despList.filter(desp => {
    if (
      desp.val > maxVal.value ||
      desp.val < minVal.value ||
      desp.type !== type.value
    )
      return false;

    return true;
  });

  LoadDesp(temp);
};

const ClearFilter = () => {
  document.getElementById("min-val").value = 0;
  document.getElementById("max-val").value = "";

  LoadDesp(despList);
};

const CalcExtrato = () => {
  let domExtatoVal = document.getElementById("extrato-val");
  domExtatoVal.innerHTML =
    "<p>R$ " +
    despList
      .map(desp => {
        return desp.val;
      })
      .reduce((total, num) => {
        return total + num;
      }) +
    ",00</p>";
};

const Sort = () => {
  let temp = listOnDisplay.sort((a, b) => {
    return a.val - b.val;
  });
  LoadDesp(temp);
};
