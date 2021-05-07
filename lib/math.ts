/**
 * @author Giuseppe Ferri
 */

import { UndefinedError } from "./error";



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