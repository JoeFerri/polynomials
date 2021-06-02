/**
 * @author Giuseppe Ferri
 * @license LGPL-3.0
 *
 * Copyright (c) 2021, Giuseppe Ferri (joeferri83prog@libero.it)
 */

import { UndefinedError } from "./error";
import { Exp } from "./exp";
import { ExpRational } from "./exprational";
import { Multiplicable, Reciprocable, Summable } from "./math";
import { Rational } from "./rational";
import { Sign } from "./sign";
import { ComplexInfinity } from "./type";
import { Comparable } from "./utils";



export class ImaginaryPart extends ExpRational implements
  Comparable<ImaginaryPart>, Summable<ImaginaryPart>,
    Multiplicable<ImaginaryPart,never>, Reciprocable<ImaginaryPart> {

  constructor(opt: {n: number, d?: number, s?: Sign, simplify?: boolean, exp?: Exp}) {
    super(opt);
  }


  static newBy<T extends ExpRational>(v: T) : ImaginaryPart {
    return new ImaginaryPart({n: v.n * v.s.value, d: v.d, exp: v.exp});
  }


  normalize() : ImaginaryPart {
    if (this.exp.s == Sign.plus)
      return this;
    return new ImaginaryPart({n: this.d * this.s.value, d: this.n, exp: this.exp.opp()});
  }


  recpr(): ImaginaryPart {
    return new ImaginaryPart({n: this.d * this.s.value, d: this.n, exp: this.exp});
  }

  
  prod(t: ImaginaryPart): ImaginaryPart {
    let prod = super.prod(t);
    return new ImaginaryPart({n: (prod.n * prod.s.value), d: prod.d, exp: prod.exp});
  }

  
  div(t: ImaginaryPart): ImaginaryPart {
    let div = super.div(t);
    return new ImaginaryPart({n: (div.n * div.s.value), d: div.d, exp: div.exp});
  }


  sum(t: ImaginaryPart): ImaginaryPart {
    let sum = super.sum(t);
    return new ImaginaryPart({n: (sum.n * sum.s.value), d: sum.d, exp: sum.exp});
  }


  subtr(t: ImaginaryPart): ImaginaryPart {
    return this.sum(t.opp());
  }


  opp(): ImaginaryPart {
    let opp = super.opp();
    return new ImaginaryPart({n: (opp.n * opp.s.value), d: opp.d, exp: opp.exp});
  }


  equals(r: ImaginaryPart) : boolean {
    return super.equals(r);
  }


  compare(r: ImaginaryPart) : number {
    return super.compare(r);
  }


  static readonly expsStrict: RegExp[] = [
    /^\(\((?<s>[+-]?)(?<n>\d+)(?:\/(?<d>\d+))?\)\^\((?<s_exp>[+-]?)(?<n_exp>\d+)(?:\/(?<d_exp>\d+))?\)\)i$/,  //? ((-23/87)^(-66/78))i
    /^\(\((?<s>[+-]?)(?<n>\d+)(?:\/(?<d>\d+))?\)\^(?<n_exp>\d+)\)i$/,                                         //? ((-23/87)^66)i
    /^\((?<s>[+-]?)(?<n>\d+)\^\((?<s_exp>[+-]?)(?<n_exp>\d+)(?:\/(?<d_exp>\d+))?\)\)i$/,                      //? (-23^(-66/78))i
    /^\((?<s>[+-]?)(?<n>\d+)\^(?<n_exp>\d+)\)i$/,                                                             //? (-23^66)i
    /^(?<s>[+-]?)(?<n>\d+)?i(?:\/(?<d>\d+))?$/,                                                               //? -23i  -23i/87 -i
    /^\((?<s>[+-]?)(?<n>\d+)?i(?:\/(?<d>\d+))?\)$/                                                            //? (-23i)  (-23i/87) (-i)
  ];

  static readonly exps: RegExp[] = [
    /\(\((?<s>[+-]?)(?<n>\d+)(?:\/(?<d>\d+))?\)\^\((?<s_exp>[+-]?)(?<n_exp>\d+)(?:\/(?<d_exp>\d+))?\)\)i/,    //? ((-23/87)^(-66/78))i
    /\(\((?<s>[+-]?)(?<n>\d+)(?:\/(?<d>\d+))?\)\^(?<n_exp>\d+)\)i/,                                           //? ((-23/87)^66)i
    /\((?<s>[+-]?)(?<n>\d+)\^\((?<s_exp>[+-]?)(?<n_exp>\d+)(?:\/(?<d_exp>\d+))?\)\)i/,                        //? (-23^(-66/78))i
    /\((?<s>[+-]?)(?<n>\d+)\^(?<n_exp>\d+)\)i/,                                                               //? (-23^66)i
    /(?<s>[+-]?)(?<n>\d+)?i(?:\/(?<d>\d+))?/,                                                                 //? -23i  -23i/87 -i
    /\((?<s>[+-]?)(?<n>\d+)?i(?:\/(?<d>\d+))?\)/                                                              //? (-23i)  (-23i/87) (-i)
  ];


  static parse(str: string) : ImaginaryPart {
    let
      opt: RegExpMatchArray|null,
      obj: ImaginaryPart|null = null;
    
    // ((-23/87)^(-66/78))i
    if ((opt = str.match(ImaginaryPart.expsStrict[0])) != null) {
      let
        s = opt[1] == Sign.minus.sign ? Sign.minus : Sign.plus,
        n = Number(opt[2]),
        d = opt[3] != undefined ? Number(opt[3]) : 1,
        s_exp = opt[4] == Sign.minus.sign ? Sign.minus : Sign.plus,
        n_exp = Number(opt[5]),
        d_exp = opt[6] != undefined ? Number(opt[6]) : 1,
        exp = new Rational({n: n_exp, d: d_exp, s: s_exp});
      obj = new ImaginaryPart({n: n, d: d, s: s, exp: exp});
    }
    
    // ((-23/87)^66)i
    if ((opt = str.match(ImaginaryPart.expsStrict[1])) != null) {
      let
        s = opt[1] == Sign.minus.sign ? Sign.minus : Sign.plus,
        n = Number(opt[2]),
        d = opt[3] != undefined ? Number(opt[3]) : 1,
        n_exp = Number(opt[4]);
      obj = new ImaginaryPart({n: n, d: d, s: s, exp: n_exp});
    }
    
    // (-23^(-66/78))i
    if ((opt = str.match(ImaginaryPart.expsStrict[2])) != null) {
      let
        s = opt[1] == Sign.minus.sign ? Sign.minus : Sign.plus,
        n = Number(opt[2]),
        s_exp = opt[3] == Sign.minus.sign ? Sign.minus : Sign.plus,
        n_exp = Number(opt[4]),
        d_exp = opt[5] != undefined ? Number(opt[5]) : 1,
        exp = new Rational({n: n_exp, d: d_exp, s: s_exp});
      obj = new ImaginaryPart({n: n, d: 1, s: s, exp: exp});
    }
    
    // (-23^66)i
    if ((opt = str.match(ImaginaryPart.expsStrict[3])) != null) {
      let
        s = opt[1] == Sign.minus.sign ? Sign.minus : Sign.plus,
        n = Number(opt[2]),
        n_exp = Number(opt[3]);
      obj = new ImaginaryPart({n: n, d: 1, s: s, exp: n_exp});
    }

    // -23i  -23i/87 -i
    if ((opt = str.match(ImaginaryPart.expsStrict[4])) != null
      // (-23i)  (-23i/87) (-i)
      || (opt = str.match(ImaginaryPart.expsStrict[5])) != null) {
      let
        s = opt[1] == Sign.minus.sign ? Sign.minus : Sign.plus,
        n = opt[2] != undefined ? Number(opt[2]) : 1,
        d = opt[3] != undefined ? Number(opt[3]) : 1;
      obj = new ImaginaryPart({n: n, d: d, s: s});
    }
    
    if (obj == null)
      throw new UndefinedError();
    
    return obj!;
  }


  toString(with_sign: boolean = false) {
    let i = ImaginaryPart.iChar;

    //! Rational
    let
      hasExp = !this.exp.equals(Rational.one),
      ss = with_sign ? this.s.sign : this.s.signpm(),
      sn = this.n,
      sd = this.d != 1 ? ('/' + this.d) : '',
      // s = (ss + (sn != 1 ? sn : '') + i + sd);
      s = (ss + (sn != 1 || hasExp ? sn : '') + (!hasExp ? i : '') + sd);

    //!
    if (this.n == Infinity)
      return ss + "ComplexInfinity";

    if (Math.abs(this.value()) == 1)
      return ss + i;

    //! ExpRational
    if (hasExp) {
      if (this.d != 1)
        s = '(' + s + ')';
      let e = this.exp.toString();
      if (e.includes('/') || e.includes('-'))
        e = '(' + e + ')';
      s = `${s}^${e}`;
    }

    if (hasExp)
      s = '(' + s + ')' + i;

    return s;
  }


  // ℂ    DOUBLE-STRUCK CAPITAL C' (U+2102)
  private static readonly iList = [
    'i', //! DEFAULT
    '𝑖', // MATHEMATICAL ITALIC SMALL I' (U+1D456)
    '𝒾', // MATHEMATICAL SCRIPT SMALL I' (U+1D4BE)
    '𝓲', // MATHEMATICAL BOLD SCRIPT SMALL I' (U+1D4F2)
    'ⅈ'  // DOUBLE-STRUCK ITALIC SMALL I' (U+2148)
  ];


  static get iChar() : string {
    return ImaginaryPart.iList[ImaginaryPart.iCode];
  }


  private static _iCode: 0|1|2|3|4 = 0;
  

  static get iCode(): 0|1|2|3|4 {
    return ImaginaryPart._iCode;
  }


  static set iCode(id: 0|1|2|3|4) {
    ImaginaryPart._iCode = id;
  }
  


  static readonly zero = new ImaginaryPart({n: 0});
  static readonly one = new ImaginaryPart({n: 1});
  static readonly mone = new ImaginaryPart({n: -1});
  static readonly infinity = new ImaginaryPart({n: ComplexInfinity});
  static readonly minfinity = new ImaginaryPart({n: -ComplexInfinity});
}