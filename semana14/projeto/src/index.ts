import fs from "fs";
import { Account } from "./models/account";

const accounts: Account[] = require("../data/accounts.json");

const accountMock: Account = {
  name: "Cazuza",
  bithDate: "21/21/14",
  cpf: "123.456.789-10",
  balance: 100,
};

const createAccount = (newAccount: Account) => {
  const result = accounts.find((acc) => acc.cpf === newAccount.cpf);

  if (result) {
    console.log("Usuário já cadastrado");
    return;
  }

  accounts.push(newAccount);
  fs.writeFileSync("data/accounts.json", JSON.stringify(accounts), "utf8");
};

createAccount(accountMock);

