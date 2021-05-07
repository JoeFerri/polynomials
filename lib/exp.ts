/**
 * @author Giuseppe Ferri
 */

import { ExpRational } from ".";
import { charindexnum } from "./char";
import { undnumber } from "./type";



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
export function equalsExp(exp1: Exp, exp2: Exp, cns: charindexnum[] = []) : boolean {
  let e1: undnumber, e2: undnumber;

  if (exp1 instanceof ExpRational)
    e1 = exp1.value(cns);
  else e1 = exp1;
  if (exp2 instanceof ExpRational)
    e2 = exp2.value(cns);
  else e2 = exp2;

  return e1 != undefined && e2 != undefined ? e1 == e2 : false;
}


export function valueExp(exp: Exp, cns: charindexnum[] = []) : undnumber {
  return typeof exp === "number" ? exp : exp.value(cns);
}