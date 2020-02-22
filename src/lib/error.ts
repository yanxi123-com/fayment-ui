type codeAndMsg = [string, string];

export class AppError extends Error {
  code?: string;

  constructor(message: string);
  constructor(errorTuple: codeAndMsg);

  constructor(err: string | codeAndMsg) {
    if (typeof err === "string") {
      super(err);
    } else {
      super(err[1]);
      this.code = err[0];
    }

    this.name = "AppError";
  }
}
