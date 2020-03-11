let tableElements = [];

let table = document.getElementsByTagName("table")[0];

for (let i = 0; i < 24; i++) {
  let row = table.insertRow();
  tableElements.push(new Array());
  for (let j = 0; j < 8; j++) {
    let cell = row.insertCell();

    if (j !== 0) {
      let element = document.createElement("ul");
      cell.appendChild(element);
      tableElements[i].push(element);
    } else {
      cell.innerHTML = i + "h";
    }
  }
}

const AddToList = () => {
  let name = document.getElementById("name");
  let day = document.getElementById("date").value;
  let hour = document.getElementById("hour").value;

  tableElements[hour][day].innerHTML +=
    "<li onClick='CrossOut(this)'>" + name.value + "</li>";

  name.value = "";
};

const CrossOut = x => {
  x.style.textDecoration = "line-through";
};

const ClearList = () => {
  let lists = document.getElementsByTagName("ul");
  for (let i = 0; i < lists.length; i++) lists[i].innerHTML = "";
};

let menuStatus = false;

const ToggleMenu = menuButton => {
  menuStatus = !menuStatus;
  let menu = document.getElementsByClassName("menu")[0];
  menuButton.classList.toggle("animate");
  menu.style.right = menuStatus ? "0" : "-100%";
};

const OnWindowResize = x => {
  console.log("wtf");
  let menu = document.getElementsByClassName("menu")[0];
  if (x.matches) {
    menu.style.right = "-100%";
  } else {
    menu.style.right = "0";
  }

  if (menuStatus) {
    document
      .getElementsByClassName("menu-btn")[0]
      .classList.toggle("animate");
    menuStatus = false;
  }

};

let x = window.matchMedia("(max-width: 900px)");
OnWindowResize(x);
x.addListener(OnWindowResize);
