"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const accounts = require("../data/accounts.json");
const accountMock = {
    name: "Cazuza",
    bithDate: "21/21/14",
    cpf: "123.456.789-10",
    balance: 100,
};
const createAccount = (newAccount) => {
    const result = accounts.find((acc) => acc.cpf === newAccount.cpf);
    if (result) {
        console.log("Usuário já cadastrado");
        return;
    }
    accounts.push(newAccount);
    fs_1.default.writeFileSync("data/accounts.json", JSON.stringify(accounts), "utf8");
};
createAccount(accountMock);
