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
import { Opposable, Summable } from "./math";



export class ExpRational extends Rational implements Comparable<ExpRational>, Summable<ExpRational>, Opposable<ExpRational> {

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
    ) throw new UndefinedError();

    this.exp = exp != undefined && super.n != 0 && super.n != Infinity ?
      (exp instanceof Rational ? exp : new Rational({n: exp})) : Rational.one;
  }


  sum(t: ExpRational): ExpRational {
    let sum: Rational;

    if (this.exp.value() == 1 && t.exp.value() == 1) {
      sum = super.sum(t);
    }
    else {
      let
        r1: Rational = new Rational(
          { n: Math.pow((this.exp.s == Sign.plus ? this.n : this.d) * this.s.value, this.exp.n),
            d: Math.pow((this.exp.s == Sign.plus ? this.d : this.n), this.exp.n)}
        ),
        r2: Rational = new Rational(
          { n: Math.pow((t.exp.s == Sign.plus ? t.n : t.d) * t.s.value, t.exp.n),
            d: Math.pow((t.exp.s == Sign.plus ? t.d : t.n), t.exp.n)}
        );
      if (this.exp.d != 1 || t.exp.d != 1) {
        // nthroot → exp := n/d
        sum = Rational.byNumber(Math.nthRoot(r1.value(),this.exp.d) + Math.nthRoot(r2.value(),t.exp.d));
      }
      else sum = r1.sum(r2);
    }
    return new ExpRational({n: sum.n * sum.s.value, d: sum.d});
  }


  subtr(t: ExpRational): ExpRational {
    return this.sum(t.opp());
  }


  opp(): ExpRational {
    return new ExpRational({n: (this.n * this.s.value * (-1)), d: this.d, exp: this.exp});
  }


/**
 * (-2)^(-2/3) = ((-2)^(-2))^(1/3) = cbrt(1/4)
 */
  value() : number {
    let
      exp = this.exp.s.value * this.exp.n,
      root = this.exp.d;
    return Math.nthRoot( super.value() ** exp, root);
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
  

  static readonly expsStrict: RegExp[] = [
    /^\((?<s>[+-]?)(?<n>\d+)(?:\/(?<d>\d+))?\)\^\((?<s_exp>[+-]?)(?<n_exp>\d+)(?:\/(?<d_exp>\d+))?\)$/, //? (-23/87)^(-66/78)
    /^\((?<s>[+-]?)(?<n>\d+)(?:\/(?<d>\d+))?\)\^(?<n_exp>\d+)$/,                                        //? (-23/87)^66
    /^(?<s>[+-]?)(?<n>\d+)\^\((?<s_exp>[+-]?)(?<n_exp>\d+)(?:\/(?<d_exp>\d+))?\)$/,                     //? -23^(-66/78)
    /^(?<s>[+-]?)(?<n>\d+)\^(?<n_exp>\d+)$/                                                             //? -23^66
  ];

  static readonly exps: RegExp[] = [
    /\((?<s>[+-]?)(?<n>\d+)(?:\/(?<d>\d+))?\)\^\((?<s_exp>[+-]?)(?<n_exp>\d+)(?:\/(?<d_exp>\d+))?\)/,
    /\((?<s>[+-]?)(?<n>\d+)(?:\/(?<d>\d+))?\)\^(?<n_exp>\d+)/,
    /(?<s>[+-]?)(?<n>\d+)\^\((?<s_exp>[+-]?)(?<n_exp>\d+)(?:\/(?<d_exp>\d+))?\)/,
    /(?<s>[+-]?)(?<n>\d+)\^(?<n_exp>\d+)/
  ];



  static parse(str: string) : ExpRational {
    let
      opt: RegExpMatchArray|null,
      obj: ExpRational|null = null;
    
    // -23/87
    if ((opt = str.match(Rational.expStrict)) != null) {
      let
        s = opt[1] == Sign.minus.sign ? Sign.minus : Sign.plus,
        n = Number(opt[2]),
        d = opt[3] != undefined ? Number(opt[3]) : 1;
      obj = new ExpRational({n: n, d: d, s: s});
    }
    
    // (-23/87)^(-66/78)
    if ((opt = str.match(ExpRational.expsStrict[0])) != null) {
      let
        s = opt[1] == Sign.minus.sign ? Sign.minus : Sign.plus,
        n = Number(opt[2]),
        d = opt[3] != undefined ? Number(opt[3]) : 1,
        s_exp = opt[4] == Sign.minus.sign ? Sign.minus : Sign.plus,
        n_exp = Number(opt[5]),
        d_exp = opt[6] != undefined ? Number(opt[6]) : 1,
        exp = new Rational({n: n_exp, d: d_exp, s: s_exp});
      obj = new ExpRational({n: n, d: d, s: s, exp: exp});
    }
    
    // (-23/87)^66
    if ((opt = str.match(ExpRational.expsStrict[1])) != null) {
      let
        s = opt[1] == Sign.minus.sign ? Sign.minus : Sign.plus,
        n = Number(opt[2]),
        d = opt[3] != undefined ? Number(opt[3]) : 1,
        n_exp = Number(opt[4]);
      obj = new ExpRational({n: n, d: d, s: s, exp: n_exp});
    }
    
    // -23^(-66/78)
    if ((opt = str.match(ExpRational.expsStrict[2])) != null) {
      let
        s = opt[1] == Sign.minus.sign ? Sign.minus : Sign.plus,
        n = Number(opt[2]),
        s_exp = opt[3] == Sign.minus.sign ? Sign.minus : Sign.plus,
        n_exp = Number(opt[4]),
        d_exp = opt[5] != undefined ? Number(opt[5]) : 1,
        exp = new Rational({n: n_exp, d: d_exp, s: s_exp});
      obj = new ExpRational({n: n, d: 1, s: s, exp: exp});
    }
    
    // -23^66
    if ((opt = str.match(ExpRational.expsStrict[3])) != null) {
      let
        s = opt[1] == Sign.minus.sign ? Sign.minus : Sign.plus,
        n = Number(opt[2]),
        n_exp = Number(opt[3]);
      obj = new ExpRational({n: n, d: 1, s: s, exp: n_exp});
    }
    
    if (obj == null)
      throw new UndefinedError();
    
    return obj!;
  }


  toString(with_sign: boolean = false) : string {
    if (this.exp.equals(Rational.one))
      return super.toString(with_sign);

    let s = super.toString(with_sign);
    if (this.d != 1)
      s = '(' + s + ')';
    let e = this.exp.toString();
    if (e.includes('/') || e.includes('-'))
      e = '(' + e + ')';
      
    return `${s}^${e}`;
  }


  static readonly zero = new ExpRational({n: 0});
  static readonly one = new ExpRational({n: 1});
  static readonly mone = new ExpRational({n: -1});
  static readonly infinity = new ExpRational({n: Infinity});
  static readonly minfinity = new ExpRational({n: -Infinity});
}