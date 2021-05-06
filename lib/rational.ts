/**
 * @author Giuseppe Ferri
 */

import { Sign } from "./sign";



export class Rational {

  readonly n: number;
  readonly d: number;
  readonly s: Sign;

  constructor(n: number, d?: number, s?: Sign) {
    this.n = Math.abs(n);
    this.d = d != undefined ? Math.abs(n) : 1;
    this.s = s != undefined ? s : (n >= 0 ? Sign.plus : Sign.minus);
  }

  equals(r: Rational) : boolean {
    return this.n == r.n && this.d == r.d && this.s == r.s;
  }

  static readonly zero = new Rational(0);
  static readonly one = new Rational(1);
  static readonly mone = new Rational(-1);
  static readonly infinity = new Rational(Infinity);
  static readonly minfinity = new Rational(-Infinity);
}