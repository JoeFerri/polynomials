/**
 * @author Giuseppe Ferri
 * @license LGPL-3.0
 *
 * Copyright (c) 2021, Giuseppe Ferri (joeferri83prog@libero.it)
 */

import { Exp } from "./exp";
import { ExpRational } from "./exprational";
import { Sign } from "./sign";
import { Comparable } from "./utils";



export class ImaginaryPart extends ExpRational implements Comparable<ImaginaryPart> {

  constructor(opt: {n: number, d?: number, s?: Sign, simplify?: boolean, exp?: Exp}) {
    super(opt);
  }


  equals(r: ImaginaryPart) : boolean {
    return super.equals(r);
  }


  compare(r: ImaginaryPart) : number {
    return super.compare(r);
  }


  toString(with_sign: boolean = false) {
    let s = ImaginaryPart.iChar;
    if (Math.abs(this.value()) != 1)
      s = super.toString(with_sign) + s;
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
    return ImaginaryPart.iList[ImaginaryPart.iCode];
  }


  private static _iCode: 0|1|2|3|4 = 1;
  

  static get iCode(): 0|1|2|3|4 {
    return ImaginaryPart._iCode;
  }


  static set iCode(id: 0|1|2|3|4) {
    ImaginaryPart._iCode = id;
  }
  


  static readonly zero = new ImaginaryPart({n: 0});
  static readonly one = new ImaginaryPart({n: 1});
  static readonly mone = new ImaginaryPart({n: -1});
  static readonly infinity = new ImaginaryPart({n: Infinity});
  static readonly minfinity = new ImaginaryPart({n: -Infinity});
}