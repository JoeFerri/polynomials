/**
 * @author Giuseppe Ferri
 */

import { charindexnum } from "./char";
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
   * @param [cns] 
   * @returns a real number or undefined 
   */
  value(cns: charindexnum[] = []) : undnumber {
    let
      a: undnumber = this.a.value(cns),
      b: undnumber = this.b.value(cns);

    return a != undefined && b == 0 ? a : undefined;
  }

  equals(z: Complex, cns: charindexnum[] = []) : boolean {
    return this.a.equals(z.a,cns) && this.b.equals(z.b,cns); 
  }

  toString(with_sign: boolean = false) : string {
    let bv: undnumber = this.b.value(), b: string = '';
    if (bv != 0) {
      if (bv == undefined || (bv != 1 && bv != -1))
        b = this.b.toString(true);
      else b = `${this.b.s.sign}`;
      b += Complex.i;
    }
    return `${this.a.toString(with_sign)}${b}`;
  }

  // ℂ    DOUBLE-STRUCK CAPITAL C' (U+2102)
  private static readonly iList = [
    'i',
    '𝑖', // MATHEMATICAL ITALIC SMALL I' (U+1D456)
    '𝒾', // MATHEMATICAL SCRIPT SMALL I' (U+1D4BE)
    '𝓲', // MATHEMATICAL BOLD SCRIPT SMALL I' (U+1D4F2)
    'ⅈ'  // DOUBLE-STRUCK ITALIC SMALL I' (U+2148)
  ];

  static get i() : string {
    return Complex.iList[Complex.iCode];
  }

  private static _iCode: 0|1|2|3|4 = 1;
  
  static get iCode(): 0|1|2|3|4 {
    return Complex._iCode;
  }

  static set iCode(id: 0|1|2|3|4) {
    Complex.iCode = id;
  }
}
