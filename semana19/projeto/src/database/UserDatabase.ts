import connection from "./connection";

interface CreateDTO {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
}

export default class UserDatabase {
  static TableName = "Lama_Users";

  public static async create(data: CreateDTO) {
    await connection.insert(data).into(this.TableName);
  }
}
