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
import { Comparable } from "./utils";



export class ExpRational extends Rational implements Comparable<ExpRational> {

  readonly exp: Rational;


  // constructor(n: number, d: number = 1, s?: Sign, exp?: Exp, simplify: boolean = true) {
  constructor(opt: {n: number, d?: number, s?: Sign, simplify?: boolean, exp?: Exp}) {

    let
      n = opt.n,
      d = opt.d != undefined ? opt.d : 1,
      s = opt.s,
      simplify = opt.simplify != undefined ? opt.simplify : true,
      exp = opt.exp;
    
    if (simplify) {
      let
        _exp: number = exp instanceof Rational ? exp.value() : (exp as number),
        v: number = n/d;

      if (_exp == Infinity && 1 < v && v <= Infinity) {
        n = Infinity;
        d = 1;
        s = undefined;
      }
      else if (_exp == -Infinity && 1 < v && v <= Infinity) {
        n = 0;
        d = 1;
        s = undefined;
      }
      else if (_exp == Infinity && 0 <= v && v < 1) {
        n = 0;
        d = 1;
        s = undefined;
      }
      else if (_exp == -Infinity && 0 <= v && v < 1) {
        n = Infinity;
        d = 1;
        s = undefined;
      }
      else if (v == 0 && 0 < _exp && _exp <= Infinity) {
        n = 0;
        d = 1;
        s = undefined;
      }
      else if (v == Infinity && 0 < _exp && _exp <= Infinity) {
        n = Infinity;
        d = 1;
        s = undefined;
      }
      else if (v == 0 && -Infinity <= _exp && _exp < 0) {
        n = Infinity;
        d = 1;
        s = undefined;
      }
      else if (v == Infinity && -Infinity <= _exp && _exp < 0) {
        n = 0;
        d = 1;
        s = undefined;
      }
    }

    super({n: n, d: d, s: s, simplify: simplify});
    
    if (exp != undefined && (
        (((exp instanceof Rational && exp.value() == 0) || exp == 0) && 
          ((super.n == 0 || super.n == Infinity) && super.s == Sign.plus)) || // (0⁺)^(+∞) ; +∞^0
        (((exp instanceof Rational && exp.value() == Infinity) || exp == Infinity) && super.n == 1) // 1^±∞
      )
    )
      throw new UndefinedError();

    this.exp = exp != undefined && super.n != 0 && super.n != Infinity ?
      (exp instanceof Rational ? exp : new Rational({n: exp})) : Rational.one;
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


  compare(r: ExpRational) : number {
    return this.value() - r.value();
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


  static readonly zero = new ExpRational({n: 0});
  // static readonly mzero = new ExpRational(0,-1);
  static readonly one = new ExpRational({n: 1});
  static readonly mone = new ExpRational({n: -1});
  static readonly infinity = new ExpRational({n: Infinity});
  static readonly minfinity = new ExpRational({n: -Infinity});
}