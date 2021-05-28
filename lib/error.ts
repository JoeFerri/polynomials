/**
 * @author Giuseppe Ferri
 * @license LGPL-3.0
 *
 * Copyright (c) 2021, Giuseppe Ferri (joeferri83prog@libero.it)
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


export class OperationError extends Error {
  constructor(message?: string) {
    super(message);

    // only available on V8
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, OperationError);
    }

    this.name = 'OperationError'
  }
}


export class NumericError extends TypeError {
  constructor(message?: string) {
    super(message);

    // only available on V8
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, NumericError);
    }

    this.name = 'NumericError'
  }
}


export class InternalError extends Error {
  constructor(message?: string) {
    super(message);

    // only available on V8
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, InternalError);
    }

    this.name = 'InternalError'
  }
}