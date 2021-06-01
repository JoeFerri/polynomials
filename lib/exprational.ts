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
import { Multiplicable, Opposable, Reciprocable, Summable } from "./math";



export class ExpRational extends Rational implements 
  Comparable<ExpRational>, Summable<ExpRational>, Opposable<ExpRational>,
    Multiplicable<ExpRational>, Reciprocable<ExpRational> {

  readonly exp: Rational;


  constructor(opt: {n: number, d?: number, s?: Sign, simplify?: boolean, exp?: Exp}) {

    let
      n = opt.n,
      d = opt.d != undefined ? opt.d : 1,
      s = opt.s,
      simplify = opt.simplify != undefined ? opt.simplify : true,
      exp = opt.exp;
    
    let
      _exp: number = exp instanceof Rational ? exp.value() : (exp as number),
      v: number = n/d;
    if (_exp == 0 && v == 0) // 0^0
      throw new UndefinedError();

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
      else if (_exp == 0 && v != Infinity && v != -Infinity) { 
        n = 1;
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

    if (exp != undefined) {
      let
        r = new Rational({n: n, d: d, s: s, simplify: simplify}),
        _exp = exp != undefined && r.n != 0 && r.n != Infinity ?
          (exp instanceof Rational ? exp : new Rational({n: exp})) : Rational.one;

      if (_exp.d != 1 && _exp.value()%2 == 0 && r.s == Sign.minus)
        throw new UndefinedError("Even nth roots of negative numbers to implement."); // TODO: complex

      if ((r.n == 1 && r.d == 1) || r.n == 0) {
        exp = Rational.one;
        if (r.value() == 1)
          s = Sign.plus;
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


  toRational() {
    let
      rn: ExpRational = this.normalize(),
      r: Rational = new Rational(
        { n: rn.exp.n != 1 ? Math.pow(rn.n * rn.s.value, rn.exp.n) : rn.n * rn.s.value,
          d: rn.exp.n != 1 ? Math.pow(rn.d, rn.exp.n) : rn.d}
      );
    if (rn.exp.d != 1)
      // nthroot → exp := n/d
      return Rational.byNumber(Math.nthRoot(r.value(),rn.exp.d));
    return r;
  }


  // (2/3)^(-2/3) → (3/2)^(2/3)
  normalize() : ExpRational {
    if (this.exp.s == Sign.plus)
      return this;
    return new ExpRational({n: this.d * this.s.value, d: this.n, exp: this.exp.opp()});
  }


  recpr(): ExpRational {
    return new ExpRational({n: this.d * this.s.value, d: this.n, exp: this.exp});
  }


  prod(t: ExpRational): ExpRational {
    let t1: ExpRational = this.normalize(), t2: ExpRational = t.normalize();

    if ((t1.n == Infinity && t2.n == 0) || (t2.n == Infinity && t1.n == 0))
      throw new UndefinedError();
    let prod: Rational;

    if (this.n == t.n && this.d == t.d) { // same base before the inversion
      let tt = new ExpRational({n: this.n, d: this.d, exp: this.exp.sum(t.exp)});

      if (this.s.value * t.s.value == 1)
        return tt;
      else
        return tt.opp();
    }
    
    else if (t1.exp.value() == 1 && t2.exp.value() == 1) {
      prod = new Rational({n: t1.n * t1.s.value, d: t1.d}).prod(t2);
    }
    
    else if (t1.n == t2.n && t1.d == t2.d) { // same base
      let tt = new ExpRational({n: t1.n, d: t1.d, exp: t1.exp.sum(t2.exp)});

      if (t1.s.value * t2.s.value == 1)
        return tt;
      else
        return tt.opp();
    }
    
    else if (t1.exp.equals(t2.exp)) { // same exponent
      return new ExpRational({n: t1.s.value * t2.s.value * t1.n * t2.n, d: t1.d * t2.d, exp: t1.exp});
    }
    
    else {
      let
        r1: Rational = new Rational(
          { n: Math.pow(t1.n * t1.s.value, t1.exp.n),
            d: Math.pow(t1.d, t1.exp.n)}
        ),
        r2: Rational = new Rational(
          { n: Math.pow(t2.n * t2.s.value, t2.exp.n),
            d: Math.pow(t2.d, t2.exp.n)}
        );
      if (t1.exp.d != 1 || t2.exp.d != 1) {
        // nthroot → exp := n/d
        prod = Rational.byNumber(Math.nthRoot(r1.value(),t1.exp.d) * Math.nthRoot(r2.value(),t2.exp.d));
      }
      else prod = r1.prod(r2);
    }
    
    return new ExpRational({n: prod.n * prod.s.value, d: prod.d});
  }


  div(t: ExpRational): ExpRational {
    if (this.n == t.n && this.d == t.d) { // same base before the inversion
      // return new ExpRational({n: this.s.value * t.s.value * this.n, d: this.d, exp: this.exp.subtr(t.exp)});
      let tt = new ExpRational({n: this.n, d: this.d, exp: this.exp.subtr(t.exp)});

      if (this.s.value * t.s.value == 1)
        return tt;
      else
        return tt.opp();
    }
    return this.prod(t.recpr());
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
    let r: ExpRational = even(this);
    return new ExpRational({n: (r.n * r.s.value * (-1)), d: r.d, exp: r.exp});

    // if (this.exp.n%2 == 0) {
    //   let
    //     exp: Rational = new Rational({n: this.exp.s.value, d: this.exp.d}),
    //     r: Rational = new Rational(
    //       {n: Math.pow(this.n * this.s.value, this.exp.n),
    //        d: Math.pow(this.d, this.exp.n)});
    //   return new ExpRational({n: (r.n * (-1)), d: r.d, exp: exp});
    // }
    // return new ExpRational({n: (this.n * this.s.value * (-1)), d: this.d, exp: this.exp});
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


function even(t: ExpRational): ExpRational {
  if (t.exp.n%2 == 0) {
    let
      exp: Rational = new Rational({n: t.exp.s.value, d: t.exp.d}),
      r: Rational = new Rational(
        {n: Math.pow(t.n, t.exp.n),
         d: Math.pow(t.d, t.exp.n)});
    return new ExpRational({n: r.n, d: r.d, exp: exp});
  }
  return t;
}