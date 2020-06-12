export default class AppError {
  constructor(
    public readonly msg: string,
    public readonly status: number = 400
  ) {}
}
