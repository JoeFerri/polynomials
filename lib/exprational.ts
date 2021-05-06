/**
 * @author Giuseppe Ferri
 */

import { Sign } from "./sign";
import { Rational } from "./rational";
import { equalsExp, Exp } from "./exp";



export class ExpRational extends Rational {

  readonly exp: Exp;

  constructor(n: number, d?: number, s?: Sign, exp?: Exp) {
    super(n,d,s);
    this.exp = exp != undefined ? exp : 1;
  }

  equals(r: ExpRational) : boolean {
    return super.equals(r) && equalsExp(this.exp,r.exp);
  }

  static readonly zero = new ExpRational(0);
  static readonly one = new ExpRational(1);
  static readonly mone = new ExpRational(-1);
  static readonly infinity = new ExpRational(Infinity);
  static readonly minfinity = new ExpRational(-Infinity);
}