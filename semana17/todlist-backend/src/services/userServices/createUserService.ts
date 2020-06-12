import { uuid } from "uuidv4";
import AppError from "../../err";
import UseRepository from "../../repositories/UserRepository";

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
  if (nickname.trim() === "") throw new AppError("Invalid Nickname");
  if (password.trim() === "") throw new AppError("Invalid Password");
  if (name.trim() === "") throw new AppError("Invalid Name");
  if (email.trim() === "") throw new AppError("Invalid Email");

  const userExists = await UseRepository.userExists(nickname, email);

  if (userExists) {
    throw new AppError("Email or nickname already registered");
  }

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
