/**
 * @author Giuseppe Ferri
 * @license LGPL-3.0
 *
 * Copyright (c) 2021, Giuseppe Ferri (joeferri83prog@libero.it)
 */

import { charindexnum, charindexnumOpts, cinopt } from "./char";
import { Complex } from "./complex";
import { ExpLiteral } from "./expliteral";
import { undnumber } from "./type";



export class Monomial {

  readonly z: Complex;
  private literals: ExpLiteral[];


  constructor(z: Complex, ...literals: ExpLiteral[]) {
    this.z = z;
    this.literals = [...literals];
  }


  value(cns: charindexnum[]|cinopt[] = []) : undnumber {
    cns = charindexnumOpts(cns);
    let
      vz = this.z.value(),
      vl = this.literals
        .map( l => l.value(cns) )
        .reduce( (prev,curr) => prev != undefined && curr != undefined ? prev * curr : undefined, 1);
    return vz != undefined && vl != undefined ? vz * vl : undefined;
  }

  
  private track: string|undefined = undefined;


  literalsTrack() : string {
    if (this.track == undefined)
      this.track =
        this.literals
          .sort(literalsSort)
          .map( l => l.toString() )
          .join(Monomial.dotChar);
    return this.track;
  }


  equals(m: Monomial, cns: charindexnum[] = []) : boolean {
    let
      vThis = this.value(cns),
      vThat = m.value(cns),
      lThis = this.literalsTrack(),
      lThat = m.literalsTrack();

    return this.z.equals(m.z) && vThis == vThat && lThis == lThat;
  }


  toString() : string {
    let track = this.literalsTrack();
    return this.z.toString() + (track != '' ? Monomial.dotChar + track : '');
  }


  private static readonly dotList = [
    '',
    '⋅',     // DOT OPERATOR          (U+22C5)
    '·',    // MIDDLE DOT            (U+00B7)
    '·',   // GREEK ANO TELEIA      (U+0387)
    '×',  // MULTIPLICATION SIGN   (U+00D7)
    '*', // ASTERISK              (U+002A)
    '﹡', // SMALL ASTERISK        (U+FE61)
  ];
  

  static get dotChar() : string {
    return Monomial.dotList[Monomial.dotCode];
  }


  private static _dotCode: 0|1|2|3|4|5|6 = 1;
  

  static get dotCode(): 0|1|2|3|4|5|6 {
    return Monomial._dotCode;
  }


  static set dotCode(id: 0|1|2|3|4|5|6) {
    Monomial._dotCode = id;
  }


  static readonly zero      = new Monomial(Complex.zero);
  static readonly mzero     = new Monomial(Complex.mzero);
  static readonly one       = new Monomial(Complex.one);
  static readonly mone      = new Monomial(Complex.mone);
  static readonly infinity  = new Monomial(Complex.infinity);
  static readonly minfinity = new Monomial(Complex.minfinity);
  
  static readonly x = new Monomial(Complex.one, ExpLiteral.x);
  static readonly y = new Monomial(Complex.one, ExpLiteral.y);
  static readonly k = new Monomial(Complex.one, ExpLiteral.k);
  static readonly z = new Monomial(Complex.one, ExpLiteral.z);
  
  static readonly x2 = new Monomial(Complex.one, new ExpLiteral('x',undefined,2));
  static readonly y2 = new Monomial(Complex.one, new ExpLiteral('y',undefined,2));
  static readonly z2 = new Monomial(Complex.one, new ExpLiteral('z',undefined,2));
  
  static readonly x3 = new Monomial(Complex.one, new ExpLiteral('x',undefined,3));
  static readonly y3 = new Monomial(Complex.one, new ExpLiteral('y',undefined,3));
  static readonly z3 = new Monomial(Complex.one, new ExpLiteral('z',undefined,3));
}


function literalsSort(l1: ExpLiteral, l2: ExpLiteral) : number { 
  let locCompChar = l1.char.localeCompare(l2.char);
  let locCompIndex = l1.index - l2.index;

  // x != y
  // alphabetical ordering
  if (locCompChar != 0)
    return locCompChar;

  // x_1 != x_2
  // lexicographic ordering
  if (locCompIndex != 0)
    return locCompIndex;
  
  // x_1^3 != x_1^2 != x_1
  // major powers on the left
  return l2.exp.value() - l1.exp.value();
}