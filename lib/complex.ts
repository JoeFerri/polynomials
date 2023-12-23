/**
 * @author Giuseppe Ferri
 * @license LGPL-3.0
 *
 * Copyright (c) 2021, Giuseppe Ferri <jfinfoit@gmail.com>
 */

import { Sign } from "./sign";
import { undnumber } from "./type";
import { Comparable } from "./utils";
import { Opposable, Summable, UndEvaluable } from "./math";
import { RealPart } from "./realpart";
import { ImaginaryPart } from "./imaginarypart";



export class Complex implements Comparable<Complex>, UndEvaluable, Summable<Complex>, Opposable<Complex> {

  readonly a: RealPart;
  readonly b: ImaginaryPart;


  constructor(opt: {a: RealPart, b?: ImaginaryPart}) {
    this.a = opt.a;
    this.b = opt.b != undefined ? opt.b : ImaginaryPart.zero;
  }


  sum(t: Complex): Complex {
    return new Complex({a: this.a.sum(t.a), b: this.b.sum(t.b)});
  }


  subtr(t: Complex): Complex {
    return this.sum(t.opp());
  }


  opp(): Complex {
    return new Complex({a: this.a.opp(), b: this.b.opp()});
  }


  conjugate(): Complex {
    return new Complex({a: this.a, b: this.b.opp()});
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
  

  static parse(str: string) : Complex {
    let
      ab: string[] = str.split(/\s+\+\s+/),
      a: RealPart|null = null,
      b: ImaginaryPart|null = null;

    if (ab.length == 2) {
      a = RealPart.parse(ab[0]);
      b = ImaginaryPart.parse(ab[1]);
    }
    else {
      if (ab[0].includes('i')) {
        a = RealPart.zero;
        b = ImaginaryPart.parse(ab[0]);
      }
      else {
        a = RealPart.parse(ab[0]);
        b = ImaginaryPart.zero;
      }
    }

    return new Complex({a: a!, b: b!});
  }


  toString(with_sign: boolean = false) : string {
    let
      va: number = this.a.value(),
      vb: number = this.b.value(),
      sa: string = this.a.toString(with_sign),
      sb: string = this.b.toString(va != 0 && vb < 0),
      s: string = '';

    if (va != 0 && sb[0] == '-')
      sb = '(' + sb + ')';

    if (va == 0 && vb == 0)
      return sa;

    if (va != 0)
      s = sa;
    if (vb != 0) {
      s += (va != 0 ? ' ' + Sign.plus.sign + ' ' : '') + sb;
    }

    return s;
  }


  static readonly zero = new Complex({a: RealPart.zero});
  static readonly one = new Complex({a: RealPart.one});
  static readonly mone = new Complex({a: RealPart.mone});
  static readonly infinity = new Complex({a: RealPart.infinity});
  static readonly minfinity = new Complex({a: RealPart.minfinity});
  
  static readonly i = new Complex({a: RealPart.zero, b: ImaginaryPart.one});
  static readonly mi = new Complex({a: RealPart.zero, b: ImaginaryPart.mone});
  static readonly cinfinity = new Complex({a: RealPart.zero, b: ImaginaryPart.infinity});
  static readonly cminfinity = new Complex({a: RealPart.zero, b: ImaginaryPart.minfinity});
}
