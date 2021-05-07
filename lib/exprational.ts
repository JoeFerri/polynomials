/**
 * @author Giuseppe Ferri
 */

import { Sign } from "./sign";
import { Rational } from "./rational";
import { equalsExp, Exp, valueExp } from "./exp";
import { undnumber } from "./type";
import { charindexnum } from "./char";
import { UndefinedError } from "./error";



export class ExpRational extends Rational {

  readonly exp: Exp;


  constructor(n: number, d: number = 1, s?: Sign, exp?: Exp) {
    super(n,d,s);
    
    if (exp != undefined && exp == 0 && super.n == 0)
      throw new UndefinedError();

    this.exp = exp != undefined && super.n != 0 && super.n != Infinity ? exp : 1;
  }


  value(cns: charindexnum[] = []) : undnumber {
    let exp: undnumber = valueExp(this.exp,cns);
    return exp != undefined ? (super.value() as number) ** exp : undefined;
  }


  /**
   * equals() does not compare the numerical values represented by the objects,
   * but checks for a correspondence between the internal structures.
   * 
   * For example (2/3)^0 == (-2/3)^0 == 2^0 == 1,
   * but equals() considers all these objects to be different.
   * 
   * @param r 
   * @param [cns] 
   * @returns true if internal structures equals 
   */
  equals(r: ExpRational, cns: charindexnum[] = []) : boolean {
    return super.equals(r) && equalsExp(this.exp,r.exp,cns);
  }


  toString(with_sign: boolean = false) : string {
    if (equalsExp(this.exp,1))
      return super.toString();

    let s = super.toString(with_sign);
    if (this.d != 1)
      s = '(' + s + ')';
    return `${s}^${this.exp.toString()}`;
  }

  
  static readonly zero = new ExpRational(0);
  static readonly one = new ExpRational(1);
  static readonly mone = new ExpRational(-1);
  static readonly infinity = new ExpRational(Infinity);
  static readonly minfinity = new ExpRational(-Infinity);
}