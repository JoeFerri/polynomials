/**
 * @author Giuseppe Ferri
 */

import { Monomial } from "./monomial";



/**
 * contract:
 *   if the exponent represents a natural number,
 *   then the type is number, otherwise it is Monomial.
 */
export type Exp = number | Monomial;

export function equalsExp(exp1: Exp, exp2: Exp) : boolean {
  return exp1 instanceof Monomial && exp2 instanceof Monomial ? exp1.equals(exp2) : exp1 == exp2;
}