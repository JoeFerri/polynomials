/**
 * @author Giuseppe Ferri
 * @license LGPL-3.0
 *
 * Copyright (c) 2021, Giuseppe Ferri (joeferri83prog@libero.it)
 */

import { Sign } from "./sign";
import { ExpRational } from "./exprational";
import { undnumber } from "./type";
import { Comparable } from "./utils";
import { UndEvaluable } from "./math";



export class Complex implements Comparable<Complex>, UndEvaluable {

  readonly a: ExpRational;
  readonly b: ExpRational;


  constructor(opt: {a: ExpRational, b?: ExpRational}) {
    this.a = opt.a;
    this.b = opt.b != undefined ? opt.b : ExpRational.zero;
  }


  /**
   * Contract:
   * if the real part is different from zero,
   * or both the real part and the imaginary part are equal to zero,
   * then it returns the sign of the real part;
   * otherwise it returns the sign of the imaginary part.
   */
  get s() : Sign {
    if (this.a.value() != 0 || this.b.value() == 0)
      return this.a.s;
    return this.b.s;
  }


  /**
   * The real value of the complex number.
   * 
   * Since the function returns a real number,
   * if the imaginary part is other than 0,
   * then there is no point in returning a numeric value.
   * 
   * @returns a real number or undefined 
   */
  value() : undnumber {
    let
      a: number = this.a.value(),
      b: number = this.b.value();

    return b == 0 ? a : undefined;
  }


  equals(z: Complex) : boolean {
    return this.a.equals(z.a) && this.b.equals(z.b); 
  }


  /**
   * Warning:
   * complex numbers cannot be sorted in a way compatible with arithmetic operations;
   * however, it is decided to implement this function to make
   * the lexicographic ordering of polynomes consistent.
   */
  compare(z: Complex) : number {
    let compAA = this.a.compare(z.a);
    let compBB = this.b.compare(z.b);

    return compAA != 0 ? compAA : compBB;
  }


  toString(with_sign: boolean = false) : string {
    let
      va: number = this.a.value(),
      vb: number = this.b.value(),
      sa: string = this.a.toString(with_sign),
      sb: string = this.b.toString(),
      s: string = '';

    if (va == 0 && vb == 0)
      return sa;

    if (va != 0)
      s = sa;
    if (vb != 0) {
      if (va != 0 || (va == 0 && vb == -1))
        s += (va != 0 ? ' ' : '') + Sign.byN(vb).sign;
      if (Math.abs(vb) != 1)
        s += sb;
      s += Complex.iChar;
    }

    return s;
  }


  // ℂ    DOUBLE-STRUCK CAPITAL C' (U+2102)
  private static readonly iList = [
    'i',
    '𝑖', // MATHEMATICAL ITALIC SMALL I' (U+1D456)
    '𝒾', // MATHEMATICAL SCRIPT SMALL I' (U+1D4BE)
    '𝓲', // MATHEMATICAL BOLD SCRIPT SMALL I' (U+1D4F2)
    'ⅈ'  // DOUBLE-STRUCK ITALIC SMALL I' (U+2148)
  ];


  static get iChar() : string {
    return Complex.iList[Complex.iCode];
  }


  private static _iCode: 0|1|2|3|4 = 1;
  

  static get iCode(): 0|1|2|3|4 {
    return Complex._iCode;
  }


  static set iCode(id: 0|1|2|3|4) {
    Complex._iCode = id;
  }


  static readonly zero = new Complex({a: ExpRational.zero});
  // static readonly mzero = new Complex(ExpRational.mzero);
  static readonly one = new Complex({a: ExpRational.one});
  static readonly mone = new Complex({a: ExpRational.mone});
  static readonly infinity = new Complex({a: ExpRational.infinity});
  static readonly minfinity = new Complex({a: ExpRational.minfinity});
  
  static readonly i = new Complex({a: ExpRational.zero, b: ExpRational.one});
  static readonly mi = new Complex({a: ExpRational.zero, b: ExpRational.mone});
}
