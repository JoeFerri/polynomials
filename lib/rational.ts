/**
 * @author Giuseppe Ferri
 * @license LGPL-3.0
 *
 * Copyright (c) 2021, Giuseppe Ferri (joeferri83prog@libero.it)
 */

import { NumericError, UndefinedError } from "./error";
import { euclAlg, EuclFlag, isInteger, Multiplicable, Opposable, Reciprocable, Summable } from "./math";
import { Sign } from "./sign";
import { Comparable } from "./utils";



export type RationalOpt = {n: number, d?: number, s?: Sign, simplify?: boolean};


export class Rational implements 
  Comparable<Rational>, Summable<Rational>, Opposable<Rational>,
    Multiplicable<Rational,never>, Reciprocable<Rational> {

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


  recpr(): Rational {
    return new Rational({n: this.d * this.s.value, d: this.n});
  }


  prod(t: Rational): Rational {
    if ((this.n == Infinity && t.n == 0) || (t.n == Infinity && this.n == 0))
      throw new UndefinedError();

    return new Rational({n: this.s.value * t.s.value * this.n * t.n, d: this.d * t.d})
  }


  div(t: Rational): Rational {
    return this.prod(t.recpr());
  }


  sum(t: Rational): Rational {
    // throw new Error("Method not implemented.");
    let
      n1 = this.n * this.s.value,
      d1 = this.d,
      n2 = t.n * t.s.value,
      d2 = t.d;

    if (this.n == Infinity && t.n == Infinity)
      if (this.s != t.s) // +∞ -∞
        throw new UndefinedError();
      else return new Rational({n: n1});

    if (this.n == Infinity || t.n == Infinity) // ±∞ + n
      return new Rational({n: n1 + n2});

    // Least Common Multiple
    let lcd = euclAlg(d1,d2, EuclFlag.LCD), a:number, b: number;

    // simplify
    a = (lcd / d1 * n1),
    b = (lcd / d2 * n2);

    return new Rational({n: a+b, d: lcd});
  }


  subtr(t: Rational): Rational {
    return this.sum(t.opp());
  }


  opp(): Rational {
    return new Rational({n: (this.n * this.s.value * (-1)), d: this.d});
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


  static byNumber(r: number) : Rational {
    let n: number = r, d: number = 1;
    if (("" + r).includes('.')) {
      let
        s = ("" + r).split('.'),
        a = new Array(s[1].length).fill('0');
      d = Number("1" + a.join('')),
      n = Number(s[0] + s[1]);
    }
    // console.table({r:r,n:n,d:d})
    return new Rational({n: n, d: d});
  }


  toString(with_sign: boolean = false) : string {
    let
      ss = with_sign ? this.s.sign : this.s.signpm(),
      sn = this.n,
      sd = this.d != 1 ? ('/' + this.d) : '';
      
    return (ss + sn + sd);
  }


  static readonly zero = new Rational({n: 0});
  static readonly one = new Rational({n: 1});
  static readonly mone = new Rational({n: -1});
  static readonly infinity = new Rational({n: Infinity});
  static readonly minfinity = new Rational({n: -Infinity});
}