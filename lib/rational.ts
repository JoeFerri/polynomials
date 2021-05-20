/**
 * @author Giuseppe Ferri
 * @license LGPL-3.0
 *
 * Copyright (c) 2021, Giuseppe Ferri (joeferri83prog@libero.it)
 */

import { NumericError, UndefinedError } from "./error";
import { euclAlg, isInteger } from "./math";
import { Sign } from "./sign";
import { Comparable } from "./utils";



export type RationalOpt = {n: number, d?: number, s?: Sign, simplify?: boolean};


export class Rational implements Comparable<Rational> {

  readonly n: number;
  readonly d: number;
  readonly s: Sign;


  constructor(opt: RationalOpt) {
    let
      simplify = opt.simplify != undefined ? opt.simplify : true,
      n = opt.n,
      d = opt.d != undefined ? opt.d : 1,
      s = opt.s != undefined ? opt.s : Sign.byND(n,d);
    n = Math.abs(n);
    d = Math.abs(d);

    if ((!isInteger(n) && n != Infinity) || (!isInteger(d) && d != Infinity))
      throw new NumericError();

    if ((n == 0 && d == 0) || (n == Infinity && d == Infinity))
      throw new UndefinedError();

    if (d === 0 || n == Infinity) { // ±n/0   ±∞/n
      n = Infinity;
      d = 1;
  
    } else if (d == Infinity || n === 0) { // ±n/∞    0/±n
      n = 0;
      d = 1;
      s = Sign.plus;
    } else if (simplify) {
      // Greatest Common Divisor
      let gcd = euclAlg(n,d);
  
      // simplify
      n = n/gcd;
      d = d/gcd;
    }

    this.n = n;
    this.d = d;
    this.s = s;
  }


  value() : number {
    return this.s.value * this.n / this.d;
  }


  equals(r: Rational) : boolean {
    return this.n == r.n && this.d == r.d && this.s == r.s;
  }


  compare(r: Rational) : number {
    return this.value() - r.value();
  }


  static readonly expStrict: RegExp = /^(?<s>[+-]?)(?<n>\d+)(?:\/(?<d>\d+))?$/;

  static readonly exp: RegExp = /(?<s>[+-]?)(?<n>\d+)(?:\/(?<d>\d+))?/;


  static parse(str: string) : Rational {
    let opt = str.match(Rational.expStrict);
    if (opt == null)
      throw new UndefinedError();
    else {
      let
        s = opt[1] == Sign.minus.sign ? Sign.minus : Sign.plus,
        n = Number(opt[2]),
        d = opt[3] != undefined ? Number(opt[3]) : 1;
      return new Rational({n:n, d:d, s:s});
    }
  }


  toString(with_sign: boolean = false) : string {
    let
      ss = with_sign ? this.s.sign : this.s.signpm(),
      sn = this.n,
      sd = this.d != 1 ? ('/' + this.d) : '';
      
    return (ss + sn + sd).toLowerCase();
  }


  static readonly zero = new Rational({n: 0});
  // static readonly mzero = new Rational(0,-1);
  static readonly one = new Rational({n: 1});
  static readonly mone = new Rational({n: -1});
  static readonly infinity = new Rational({n: Infinity});
  static readonly minfinity = new Rational({n: -Infinity});
}