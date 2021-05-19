/**
 * @author Giuseppe Ferri
 * @license LGPL-3.0
 *
 * Copyright (c) 2021, Giuseppe Ferri (joeferri83prog@libero.it)
 */

import { Sign } from "./sign";
import { undnumber } from "./type";
import { Comparable } from "./utils";
import { UndEvaluable } from "./math";
import { RealPart } from "./realpart";
import { ImaginaryPart } from "./imaginarypart";



export class Complex implements Comparable<Complex>, UndEvaluable {

  readonly a: RealPart;
  readonly b: ImaginaryPart;


  constructor(opt: {a: RealPart, b?: ImaginaryPart}) {
    this.a = opt.a;
    this.b = opt.b != undefined ? opt.b : ImaginaryPart.zero;
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
      // if (Math.abs(vb) != 1)
      //   s += sb;
      // s += ImaginaryPart.iChar;
      s += sb;
    }

    return s;
  }


  static readonly zero = new Complex({a: RealPart.zero});
  // static readonly mzero = new Complex(ExpRational.mzero);
  static readonly one = new Complex({a: RealPart.one});
  static readonly mone = new Complex({a: RealPart.mone});
  static readonly infinity = new Complex({a: RealPart.infinity});
  static readonly minfinity = new Complex({a: RealPart.minfinity});
  
  static readonly i = new Complex({a: RealPart.zero, b: ImaginaryPart.one});
  static readonly mi = new Complex({a: RealPart.zero, b: ImaginaryPart.mone});
}
