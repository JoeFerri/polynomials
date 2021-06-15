/**
 * @author Giuseppe Ferri
 * @license LGPL-3.0
 *
 * Copyright (c) 2021, Giuseppe Ferri (joeferri83prog@libero.it)
 */

import { Rational } from "./rational";
import { charindexnum, charindexnumOpts, charlit, cinopt } from "./char";
import { Exp } from "./exp";
import { Literal } from "./literal";
import { undnumber } from "./type";
import { Comparable } from "./utils";
import { UndefinedError } from "./error";
import { Sign } from "./sign";



export class ExpLiteral extends Literal implements Comparable<ExpLiteral> {

  readonly exp: Rational;

  
  constructor(opt: {char: charlit, index?: number, exp?: Exp}) {
    super(opt);
    this.exp = opt.exp != undefined ?
      (opt.exp instanceof Rational ? opt.exp : new Rational({n: opt.exp})) : Rational.one;
  }


  toLiteral() : Literal {
    return new Literal({char: this.char, index: this.index});
  }


  override value(cns: charindexnum[]|cinopt[] = []) : undnumber {
    cns = charindexnumOpts(cns);
    let
      v: undnumber = super.value(cns),
      e: number = this.exp.value();

    return v != undefined ? v ** e : undefined;
  }


  override equals(l: ExpLiteral, cns: charindexnum[]|cinopt[] = []) : boolean {
    cns = charindexnumOpts(cns);
    return super.equals(l,cns) && this.exp.equals(l.exp);
  }


  override compare(l: ExpLiteral) : number {
    let superComp = super.compare(l);

    // x_1^3 != x_1^2 != x_1
    // major powers on the left
    return superComp != 0 ? superComp : l.exp.value() - this.exp.value();
  }

  
  static readonly expsStrict: RegExp[] = [
    /^(?<char>[\u0370-\u03FFa-zA-Z]{1})(?:_(?<index>\d+))?(?:\^(?<s>[+-]?)(?<n>\d+)(?:\/(?<d>\d+))?)?$/u,
    /^(?<char>[\u0370-\u03FFa-zA-Z]{1})(?:_(?<index>\d+))?\^\((?<s>[+-]?)(?<n>\d+)(?:\/(?<d>\d+))?\)$/u
  ];

  static readonly exps: RegExp[] = [
    /(?<char>[\u0370-\u03FFa-zA-Z]{1})(?:_(?<index>\d+))?(?:\^(?<s>[+-]?)(?<n>\d+)(?:\/(?<d>\d+))?)?/u,
    /(?<char>[\u0370-\u03FFa-zA-Z]{1})(?:_(?<index>\d+))?\^\((?<s>[+-]?)(?<n>\d+)(?:\/(?<d>\d+))?\)/u
  ];



  static override parse(str: string) : ExpLiteral {
    let
      opt: RegExpMatchArray|null,
      char: charlit,
      index: number|undefined,
      exp: Exp|undefined;
    
    if ((opt = str.match(ExpLiteral.expsStrict[0])) != null
        || (opt = str.match(ExpLiteral.expsStrict[1])) != null) {

      char = opt[1] as charlit;
      index = opt[2] != undefined ? Number(opt[2]) : undefined;
      if (opt[4] != undefined) {
        let
          s = opt[3] == Sign.minus.sign ? Sign.minus : Sign.plus,
          n = Number(opt[4]),
          d = opt[5] != undefined ? Number(opt[5]) : 1;
        exp = new Rational({n:n, d:d, s:s});
      } else exp = 1;
    }
    else throw new UndefinedError();

    return new ExpLiteral({char: char, index: index, exp: exp});
  }


  private tostring: string|undefined = undefined;


  override toString() : string {
    if (this.tostring == undefined) {
      if (this.exp.equals(Rational.one))
        this.tostring = super.toString();
      else {
        let s = super.toString();
        let e = this.exp.toString();
        if (e.includes('/') || e.includes('-'))
          e = '(' + e + ')';
        this.tostring = `${s}^${e}`;
      }
    }
    return this.tostring;
  }


  static override readonly x = new ExpLiteral({char: 'x'});
  static override readonly y = new ExpLiteral({char: 'y'});
  static override readonly k = new ExpLiteral({char: 'k'});
  static override readonly z = new ExpLiteral({char: 'z'});
}