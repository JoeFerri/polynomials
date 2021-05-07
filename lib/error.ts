/**
 * @author Giuseppe Ferri
 */



export class UndefinedError extends Error {
  constructor(message?: string) {
    super(message);

    // only available on V8
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, UndefinedError);
    }

    this.name = 'UndefinedError'
  }
}