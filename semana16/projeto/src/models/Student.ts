import User from "./User";
import moment, { Moment } from "moment";

export default class Student implements User {
  constructor(
    public id: string,
    public name: string,
    public email: string,
    public birthDate: Moment,
    public hobbies: string[]
  ) {}

  public getAge(): number {
    return moment().diff(this.birthDate, "years");
  }
}
