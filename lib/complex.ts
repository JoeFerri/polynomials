/**
 * @author Giuseppe Ferri
 * @license LGPL-3.0
 *
 * Copyright (c) 2021, Giuseppe Ferri (joeferri83prog@libero.it)
 */

import { Sign } from ".";
import { ExpRational } from "./exprational";
import { undnumber } from "./type";
import { Comparable } from "./utils";



export class Complex implements Comparable<Complex> {

  readonly a: ExpRational;
  readonly b: ExpRational;


  constructor(a: ExpRational, b?: ExpRational) {
    this.a = a;
    this.b = b != undefined ? b : ExpRational.zero;
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


  static readonly zero = new Complex(ExpRational.zero);
  static readonly mzero = new Complex(ExpRational.mzero);
  static readonly one = new Complex(ExpRational.one);
  static readonly mone = new Complex(ExpRational.mone);
  static readonly infinity = new Complex(ExpRational.infinity);
  static readonly minfinity = new Complex(ExpRational.minfinity);
  
  static readonly i = new Complex(ExpRational.zero,ExpRational.one);
  static readonly mi = new Complex(ExpRational.zero,ExpRational.mone);
}
