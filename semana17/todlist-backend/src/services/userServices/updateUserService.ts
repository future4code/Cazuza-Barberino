import AppError from "../../err";
import UserRepository from "../../repositories/UserRepository";

interface Request {
  name: string;
  nickname: string;
  email: string;
  userId: string;
}

export default async function updateUserService({
  name,
  nickname,
  email,
  userId,
}: Request) {
  if (nickname.trim() === "") throw new AppError("Invalid Nickname");
  if (name.trim() === "") throw new AppError("Invalid Name");
  if (email.trim() === "") throw new AppError("Invalid Email");

  const userExists = await UserRepository.userExists(nickname, email, userId);

  if (userExists) throw new AppError("Email or nickname already registered");

  const updatedUser = {
    name,
    nickname,
    email,
  };

  await UserRepository.updateUserData(updatedUser, userId);
}
