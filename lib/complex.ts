/**
 * @author Giuseppe Ferri
 * @license LGPL-3.0
 *
 * Copyright (c) 2021, Giuseppe Ferri (joeferri83prog@libero.it)
 */

import { Sign } from ".";
import { ExpRational } from "./exprational";
import { undnumber } from "./type";



export class Complex {

  readonly a: ExpRational;
  readonly b: ExpRational;


  constructor(a: ExpRational, b?: ExpRational) {
    this.a = a;
    this.b = b != undefined ? b : ExpRational.zero;
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
      a: undnumber = this.a.value(),
      b: undnumber = this.b.value();

    return b == 0 ? a : undefined;
  }


  equals(z: Complex) : boolean {
    return this.a.equals(z.a) && this.b.equals(z.b); 
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


  static readonly zero = new Complex(ExpRational.zero);
  static readonly mzero = new Complex(ExpRational.mzero);
  static readonly one = new Complex(ExpRational.one);
  static readonly mone = new Complex(ExpRational.mone);
  static readonly infinity = new Complex(ExpRational.infinity);
  static readonly minfinity = new Complex(ExpRational.minfinity);
  
  static readonly i = new Complex(ExpRational.zero,ExpRational.one);
  static readonly mi = new Complex(ExpRational.zero,ExpRational.mone);
}
