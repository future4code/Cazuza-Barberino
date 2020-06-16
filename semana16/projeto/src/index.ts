import process from "process";
import Student from "./models/Student";
import { getUser } from "./services/randomUser";

console.log("Hello World");

console.log(process.argv);

async function populate() {
  const alunos: Student[] = [];

  for (let i = 0; i < 10; i++) {}

  console.log(await getUser(2));
}

populate();
