/**
 * @author Giuseppe Ferri
 * @license LGPL-3.0
 *
 * Copyright (c) 2021, Giuseppe Ferri (joeferri83prog@libero.it)
 */

import { Sign } from "./sign";
import { Rational } from "./rational";
import { Exp } from "./exp";
import { UndefinedError } from "./error";



export class ExpRational extends Rational {

  readonly exp: Rational;


  constructor(n: number, d: number = 1, s?: Sign, exp?: Exp, simplify: boolean = true) {
    super(n,d,s,simplify);
    
    if (exp != undefined && ((exp instanceof Rational && exp.value() == 0) || exp == 0) && super.n == 0)
      throw new UndefinedError();

    this.exp = exp != undefined && super.n != 0 && super.n != Infinity ?
      (exp instanceof Rational ? exp : new Rational(exp)) : Rational.one;
  }


  value() : number {
    return super.value() ** this.exp.value();
  }


  /**
   * equals() does not compare the numerical values represented by the objects,
   * but checks for a correspondence between the internal structures.
   * 
   * For example (2/3)^0 == (-2/3)^0 == 2^0 == 1,
   * but equals() considers all these objects to be different.
   * 
   * @param r 
   * @returns true if internal structures equals 
   */
  equals(r: ExpRational) : boolean {
    return super.equals(r) && this.exp.equals(r.exp);
  }


  toString(with_sign: boolean = false) : string {
    if (this.exp.equals(Rational.one))
      return super.toString();

    let s = super.toString(with_sign);
    if (this.d != 1)
      s = '(' + s + ')';
    let e = this.exp.toString();
    if (e.includes('/') || e.includes('-'))
      e = '(' + e + ')';
    return `${s}^${e}`;
  }


  static readonly zero = new ExpRational(0);
  static readonly one = new ExpRational(1);
  static readonly mone = new ExpRational(-1);
  static readonly infinity = new ExpRational(Infinity);
  static readonly minfinity = new ExpRational(-Infinity);
}