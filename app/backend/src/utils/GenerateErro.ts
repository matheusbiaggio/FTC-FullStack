export default class GenerateErro extends Error {
  constructor(public status = 500, message: string) {
    super(message);
  }
}
