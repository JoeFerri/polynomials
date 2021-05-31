/**
 * @author Giuseppe Ferri
 * @license LGPL-3.0
 *
 * Copyright (c) 2021, Giuseppe Ferri (joeferri83prog@libero.it)
 */

import { Sign } from "./sign";
import { undnumber } from "./type";
import { Comparable } from "./utils";
import { Multiplicable, Opposable, Reciprocable, Summable, UndEvaluable } from "./math";
import { RealPart } from "./realpart";
import { ImaginaryPart } from "./imaginarypart";
import { ExpRational } from "./exprational";



export class Complex implements Comparable<Complex>, UndEvaluable,
  Summable<Complex>, Opposable<Complex>,
    Multiplicable<Complex>, Reciprocable<Complex> {

  readonly a: RealPart;
  readonly b: ImaginaryPart;


  constructor(opt: {a: RealPart, b?: ImaginaryPart}) {
    this.a = opt.a;
    this.b = opt.b != undefined ? opt.b : ImaginaryPart.zero;
  }


  // 1/z = 1/(a + bi) = a/(a^2 + b^2) -bi/(a^2 + b^2)
  //
  // real = a.div( (a.prod(a)).sum(b.prod(b)) )
  // imma = (b.opp().div( (a.prod(a)).sum(b.prod(b)) ))i
  recpr(): Complex {
    if (this.b.n == 0)
      return new Complex({a: this.a.recpr()});

    let
      a = this.a,
      b = this.b,
      real: RealPart = RealPart.newBy( a.div( (a.prod(a)).sum(b.prod(b)) ) ),
      imma: ImaginaryPart = ImaginaryPart.newBy( (b.opp().div( (a.prod(a)).sum(b.prod(b)) )) );
    return new Complex({a: real, b: imma});
  }


  // z*w = (a  + bi )*(c  + di ) = ( a*c  -  b*d ) + ( a*d  +  b*c )i
  // (a1 + b1i)*(a2 + b2i) = (a1*a2 - b1*b2) + (a1*b2 + b1*a2)i
  //
  // real = (a1.prod(a2)).subtr(b1.prod(b2))
  // imma = ((a1.prod(b2)).sum(b1.prod(a2)))i
  prod(t: Complex): Complex {
    if (this.b.n == 0 && t.b.n == 0)
      return new Complex({a: this.a.prod(t.a)});

    let
      a1: ExpRational = this.a,
      b1: ExpRational = this.b,
      a2: ExpRational = t.a,
      b2: ExpRational = t.b,
      real: RealPart = RealPart.newBy( (a1.prod(a2)).subtr(b1.prod(b2)) ),
      imma: ImaginaryPart = ImaginaryPart.newBy( ((a1.prod(b2)).sum(b1.prod(a2))) );
      
    return new Complex({a: real, b: imma});
  }


  // z/w = (a  + bi  )/(c  + di  ) = ( a*c   +  b*d )/( c^2 +  d^2) + i(  b*c  -  a*d )/( c^2 +  d^2)
  // (a1 + b1i )/(a2 + b2i ) = (a1*a2  + b1*b2)/(a2^2 + b2^2) + i( b1*a2 - a1*b2)/(a2^2 + b2^2)
  //
  // real = ( (a1.prod(a2)).sum(b1.prod(b2)) ).div( (a2.prod(a2)).sum(b2.prod(b2)) )
  // imma = i( (b1.prod(a2)).subtr(a1.prod(b2)) ).div( (a2.prod(a2)).sum(b2.prod(b2)) )
  div(t: Complex): Complex {
    if (this.b.n == 0 && t.b.n == 0)
      return new Complex({a: this.a.div(t.a)});

    let
      a1 = this.a,
      b1 = this.b,
      a2 = t.a,
      b2 = t.b,
      real: RealPart = RealPart.newBy( ( (a1.prod(a2)).sum(b1.prod(b2)) ).div( (a2.prod(a2)).sum(b2.prod(b2)) ) ),
      imma: ImaginaryPart = ImaginaryPart.newBy( ( (b1.prod(a2)).subtr(a1.prod(b2)) ).div( (a2.prod(a2)).sum(b2.prod(b2)) ) );
    return new Complex({a: real, b: imma});
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
