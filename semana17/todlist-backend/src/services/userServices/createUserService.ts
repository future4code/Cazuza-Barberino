import { uuid } from "uuidv4";
import AppError from "../../err";
import UseRepository from "../../repositories/UserRepository";
import checkIfValueAlreadyRegistered from "./util/checkIfValueAlreadyRegistered";

interface Request {
  name: string;
  email: string;
  nickname: string;
  password: string;
}

export default async function createUserService({
  nickname,
  password,
  email,
  name,
}: Request) {
  if (nickname.trim() === "") throw new AppError("Invalid or missing Nickname");
  if (password.trim() === "") throw new AppError("Invalid or missing Password");
  if (name.trim() === "") throw new AppError("Invalid or missing Name");
  if (email.trim() === "") throw new AppError("Invalid or missing Email");

  await Promise.all([
    checkIfValueAlreadyRegistered("email", email),
    checkIfValueAlreadyRegistered("nickname", nickname),
  ]);

  const newUser = {
    id: uuid(),
    nickname,
    password,
    email,
    name,
  };

  await UseRepository.addNewUser(newUser);

  delete newUser.password;

  return newUser;
}
