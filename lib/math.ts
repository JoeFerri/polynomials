/**
 * @author Giuseppe Ferri
 * @license LGPL-3.0
 *
 * Copyright (c) 2021, Giuseppe Ferri (joeferri83prog@libero.it)
 */

import { UndefinedError } from "./error";
import { undnumber } from "./type";



declare global {

  interface Math  {
    /**
     * Calculate the nth root of a value.
     */
     nthRoot: (n: number, root: number) => number;
  }

}

Math.nthRoot = function (n: number, root: number) : number {
  return Math.pow(n,1/root);
}


/**
 * Euclid's algorithm
 * 
 * @param {Number} a an integer
 * @param {Number} b an integer
 * @param {Object} opt options
 * 
 * @returns
 *   opt = "GCD" → Greatest Common Divisor;
 * 
 *   opt = "LCD" → Least Common Multiple;
 */
export function euclAlg(a: number, b: number, opt: EuclFlag = EuclFlag.GCD) : number {
  if (a == 0 && b == 0)
    throw new UndefinedError();

  let [at,bt] = [a,b]; // temp per il mcm
  if (a < b)
    [a,b] = [b,a];
  // 0 ≤ b < a
  while (b != 0) {
    let
      // q = a/b, //? not used
      r = a%b;
    a = b;
    b = r;
  }
  return opt == EuclFlag.GCD ? a : at*bt/a;
}

export enum EuclFlag {
  GCD, // Greatest Common Divisor
  LCD  // Least Common Multiple
}

export interface Evaluable {
  value() : number;
}

export interface UndEvaluable {
  value() : undnumber;
}


/**
 * isInteger(Infinity) → false
 */
export function isInteger(n: number|Evaluable|UndEvaluable, res: {value: number} = {value: 0}) {
  res.value = typeof n === "number" ? n : (n.value() != undefined ? (n.value() as number) : 1.1); 
  return Number(res.value) === res.value && res.value % 1 === 0;
}

/**
 * isNatural(Infinity) → false
 */
export function isNatural(n: number|Evaluable|UndEvaluable, res: {value: number} = {value: 0}) {
  return isInteger(n,res) && res.value >= 0;
}


export interface Summable<T> {
  
  /**
   * Implement the sum operation.
   */
  sum(t: T) : T;

  /**
   * Implement the subtraction operation.
   */
  subtr(t: T) : T;

  /**
   * Implement the opposite operation.
   * 
   * E.g. (-2).opp() → +2
   */
  opp() : T;
}