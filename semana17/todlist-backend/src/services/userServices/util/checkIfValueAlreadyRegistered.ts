import AppError from "../../../err";
import UserRepository from "../../../repositories/UserRepository";

export default async function checkIfValueAlreadyRegistered(
  name: string,
  value: string,
  id: string = ''
) {
  if (value && (await UserRepository.countUserWithData({ [name]: value }, id)))
    throw new AppError(name + " already registered");
}
