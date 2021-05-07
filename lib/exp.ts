/**
 * @author Giuseppe Ferri
 */

import { charindexnum } from "./char";
import { Monomial } from "./monomial";
import { undnumber } from "./type";



/**
 * contract:
 *   if the exponent represents a natural number,
 *   then the type is number, otherwise it is Monomial.
 */
export type Exp = number | Monomial;

export function equalsExp(exp1: Exp, exp2: Exp, cns: charindexnum[] = []) : boolean {
  let e1: undnumber, e2: undnumber;

  if (exp1 instanceof Monomial)
    e1 = exp1.value(cns);
  else e1 = exp1;
  if (exp2 instanceof Monomial)
    e2 = exp2.value(cns);
  else e2 = exp2;

  return e1 != undefined && e2 != undefined ? e1 == e2 : exp1.toString() == exp2.toString();
}

export function valueExp(exp: Exp, cns: charindexnum[] = []) : undnumber {
  return typeof exp === "number" ? exp : exp.value(cns);
}