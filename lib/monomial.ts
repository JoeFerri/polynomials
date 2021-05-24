/**
 * @author Giuseppe Ferri
 * @license LGPL-3.0
 *
 * Copyright (c) 2021, Giuseppe Ferri (joeferri83prog@libero.it)
 */

import { charindexnum, charindexnumOpts, cinopt } from "./char";
import { Complex } from "./complex";
import { InternalError, UndefinedError } from "./error";
import { ExpLiteral } from "./expliteral";
import { UndEvaluable } from "./math";
import { Sign } from "./sign";
import { undnumber } from "./type";
import { Comparable } from "./utils";



export class Monomial implements Comparable<Monomial>, UndEvaluable {

  readonly z: Complex;
  private  literals: ExpLiteral[];


  constructor(opt: {z: Complex, literals?: ExpLiteral[]}) {
    this.z = opt.z;
    this.literals = [...(opt.literals || [])].sort( (l1,l2) => l1.compare(l2) ); // literals must be sorted
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


  //! bug: if dotCode is changed, track remains unchanged
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

  
  static parse(str: string) : Monomial {
    let
      expLits = [
        /^([\u0370-\u03FFa-zA-Z]{1})(?:_(\d+))?\^\(([+-])?(\d+)(?:\/(\d+))?\)/u,
        /^([\u0370-\u03FFa-zA-Z]{1})(?:_(\d+))?(?:\^([+-])?(\d+)(?:\/(\d+))?)?/u
      ],
      opt: RegExpMatchArray|null,
      z: Complex|undefined,
      literals: ExpLiteral[] = [];

    if ((opt = /[\u0370-\u03FFa-hj-zA-HJ-Z]{1}/u.exec(str)) != null && opt.index != 0) {
      let
        s = str.slice(0,opt.index),
        ab: string[] = s.split(/\s+\+\s+/);

      if ((ab[0].match(/\(/g) || []).length > (ab[0].match(/\)/g) || []).length)
        s = s.slice(1);

      if (ab[1] != undefined && (ab[1].match(/\(/g) || []).length < (ab[1].match(/\)/g) || []).length)
        s = s.slice(0,s.length-1);
      
      z = Complex.parse(s);
      str = str.slice(opt.index);
    }

    let counter = 0;
    while (str != '') {
      if (++counter > 100)
        throw new InternalError("Maximum call stack size exceeded.");
        
      if ((opt = expLits[0].exec(str)) != null
          || (opt = expLits[1].exec(str)) != null) {
        literals.push(ExpLiteral.parse(opt[0]));
        str = str.slice(opt[0].length);
      }
    }

    if (z == undefined && literals.length == 0)
      throw new UndefinedError();

    return new Monomial({z: z != undefined ? z : Complex.one, literals: literals});
  }


  toString(with_sign: boolean = false) : string {
    let
      tostring: string = "",
      track = this.literalsTrack(),
      sv = this.z.value(),
      sz = this.z.toString(with_sign),
      isOne = sv != undefined ? Math.abs(sv) == 1 : false;

      if (!isOne) {
        if ((sz.includes('/') || sz.includes('^')) && track != '')
          sz = '(' + sz + ')';
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


  private static _dotCode: 0|1|2|3|4|5|6 = 0;
  

  static get dotCode(): 0|1|2|3|4|5|6 {
    return Monomial._dotCode;
  }


  static set dotCode(id: 0|1|2|3|4|5|6) {
    Monomial._dotCode = id;
  }


  static readonly zero      = new Monomial({z: Complex.zero});
  // static readonly mzero     = new Monomial(Complex.mzero);
  static readonly one       = new Monomial({z: Complex.one});
  static readonly mone      = new Monomial({z: Complex.mone});
  static readonly infinity  = new Monomial({z: Complex.infinity});
  static readonly minfinity = new Monomial({z: Complex.minfinity});
  
  static readonly x = new Monomial({z: Complex.one, literals: [ExpLiteral.x]});
  static readonly y = new Monomial({z: Complex.one, literals: [ExpLiteral.y]});
  static readonly k = new Monomial({z: Complex.one, literals: [ExpLiteral.k]});
  static readonly z = new Monomial({z: Complex.one, literals: [ExpLiteral.z]});
  
  static readonly x2 = new Monomial({z: Complex.one, literals: [new ExpLiteral({char: 'x', exp: 2})]});
  static readonly y2 = new Monomial({z: Complex.one, literals: [new ExpLiteral({char: 'y', exp: 2})]});
  static readonly z2 = new Monomial({z: Complex.one, literals: [new ExpLiteral({char: 'z', exp: 2})]});
  
  static readonly x3 = new Monomial({z: Complex.one, literals: [new ExpLiteral({char: 'x', exp: 3})]});
  static readonly y3 = new Monomial({z: Complex.one, literals: [new ExpLiteral({char: 'y', exp: 3})]});
  static readonly z3 = new Monomial({z: Complex.one, literals: [new ExpLiteral({char: 'z', exp: 3})]});
}