/**
 * @author Giuseppe Ferri
 * @license LGPL-3.0
 *
 * Copyright (c) 2021, Giuseppe Ferri (joeferri83prog@libero.it)
 */

import { ExpRational } from ".";



/**
 * contract:
 *   if the exponent represents a natural number,
 *   then the type is number, otherwise it is ExpRational.
 */
export type Exp = number | ExpRational;

/**
 * check by value
 * <undefined>,<n> → false
 */
export function equalsExp(exp1: Exp, exp2: Exp) : boolean {
  let e1: number, e2: number;

  if (exp1 instanceof ExpRational)
    e1 = exp1.value();
  else e1 = exp1;
  if (exp2 instanceof ExpRational)
    e2 = exp2.value();
  else e2 = exp2;

  return e1 == e2;
}


export function valueExp(exp: Exp) : number {
  return typeof exp === "number" ? exp : exp.value();
}