import AppError from "../../err";
import UserRepository from "../../repositories/UserRepository";
import checkIfValueAlreadyRegistered from "./util/checkIfValueAlreadyRegistered";

interface Request {
  [key: string]: string;
}

export default async function updateUserService(id: string, values: Request) {
  if (!(await UserRepository.getUserById(id)).length)
    throw new AppError("User does not exist");

  await Promise.all([
    checkIfValueAlreadyRegistered("nickname", values["nickname"], id),
    checkIfValueAlreadyRegistered("email", values["email"], id),
  ]);

  Object.entries(values).forEach(([key, val]) => {
    if (!val) delete values[key];
  });

  if (!Object.entries(values).length) throw new AppError("Nothing to update");

  await UserRepository.updateUserData(values, id);
}
