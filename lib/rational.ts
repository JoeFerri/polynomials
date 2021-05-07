/**
 * @author Giuseppe Ferri
 */

import { UndefinedError } from "./error";
import { euclAlg } from "./math";
import { Sign } from "./sign";
import { undnumber } from "./type";



let getSign = (n: number, d: number) : 1 | -1 => {
  return (n >= 0 && d >= 0) || (n < 0 && d < 0) ? 1 : -1;
}

export class Rational {

  readonly n: number;
  readonly d: number;
  readonly s: Sign;


  constructor(n: number, d: number = 1, s?: Sign) {

    s = s != undefined ? s : (getSign(n,d) == 1 ? Sign.plus : Sign.minus);
    n = Math.abs(n);
    d = Math.abs(d);

    if ((n == 0 && d == 0) || (n == Infinity && d == Infinity))
      throw new UndefinedError();

    if (d === 0 || n == Infinity) { // ±n/0   ±∞/n
      n = Infinity;
      d = 1;
  
    } else if (d == Infinity || n === 0) { // ±n/∞    0/±n
      n = 0;
      d = 1;
      s = Sign.plus;
    } else {
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


  value() : undnumber {
    return this.s.value * this.n / this.d;
  }


  equals(r: Rational) : boolean {
    return this.n == r.n && this.d == r.d && this.s == r.s;
  }


  toString(with_sign: boolean = false) : string {
    let
      ss = with_sign ? this.s.sign : this.s.signpm(),
      sn = this.n != 0 ? this.n : '0',
      sd = this.d != 1 ? ('/' + this.d) : '';
      
    return (ss + sn + sd).toLowerCase();
  }

  
  static readonly zero = new Rational(0);
  static readonly one = new Rational(1);
  static readonly mone = new Rational(-1);
  static readonly infinity = new Rational(Infinity);
  static readonly minfinity = new Rational(-Infinity);
}