/**
 * @author Giuseppe Ferri
 * @license LGPL-3.0
 *
 * Copyright (c) 2021, Giuseppe Ferri (joeferri83prog@libero.it)
 */

import { charindexnum, charindexnumOpts, cinopt } from "./char";
import { Complex } from "./complex";
import { ExpLiteral } from "./expliteral";
import { Sign } from "./sign";
import { undnumber } from "./type";
import { Comparable } from "./utils";



export class Monomial implements Comparable<Monomial> {

  readonly z: Complex;
  private literals: ExpLiteral[];


  constructor(z: Complex, ...literals: ExpLiteral[]) {
    this.z = z;
    this.literals = literals.sort( (l1,l2) => l1.compare(l2) ); // literals must be sorted
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
          .map( l => l.toString() )
          .join(Monomial.dotChar);
    return this.track;
  }


  equals(m: Monomial, cns: charindexnum[] = []) : boolean {
    let
      vThis: undnumber = this.value(cns),
      vThat:undnumber = m.value(cns),
      lThis: string = this.literalsTrack(),
      lThat: string = m.literalsTrack();

    return this.z.equals(m.z) && vThis == vThat && lThis == lThat;
  }

  // monomials: x^3 2x^3 -2x^3 x_1^3 x_2^3 x^2 x_3 x y z
  // m1:   x^3⋅x^2
  // m2:  2⋅y^3
  // m3:  2⋅x^3
  // m4: -2⋅x^3
  // m4: -2⋅x^3⋅y
  compare(m: Monomial) : number {
    let
      i: number = 0,
      comp: number,
      len1: number = this.literals.length,
      len2: number = m.literals.length,
      lenMin: number = Math.min(len1,len2);

    while(i < lenMin) {
      comp = this.literals[i].compare(m.literals[i]); // compare only the literal part
      if (comp != 0)
        return comp;
      i++;
    }

    // same literal part
    if (len1 == len2)
      return this.z.compare(m.z);
    // different literal part
    return len1 - len2;
  }

  toString(with_sign: boolean = false) : string {
    let
      tostring: string = "",
      track = this.literalsTrack(),
      sv = this.z.value(),
      sz = this.z.toString(with_sign),
      isOne = sv != undefined ? Math.abs(sv) == 1 : false;

      if (!isOne) {
        tostring = sz + (track != '' ? Monomial.dotChar : '') + track;
      } else {
        if (track != '')
          tostring = (with_sign || this.z.s == Sign.minus ? this.z.s.sign : '') + track;
        else
          tostring = sz;
      }
    return tostring;
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