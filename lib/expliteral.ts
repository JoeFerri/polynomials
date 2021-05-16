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



export class ExpLiteral extends Literal implements Comparable<ExpLiteral> {

  readonly exp: Rational;

  
  constructor(opt: {char: charlit, index?: number, exp?: Exp}) {
    super(opt);
    this.exp = opt.exp != undefined ?
      (opt.exp instanceof Rational ? opt.exp : new Rational({n: opt.exp})) : Rational.one;
  }


  value(cns: charindexnum[]|cinopt[] = []) : undnumber {
    cns = charindexnumOpts(cns);
    let
      v: undnumber = super.value(cns),
      e: number = this.exp.value();

    return v != undefined ? v ** e : undefined;
  }


  equals(l: ExpLiteral, cns: charindexnum[]|cinopt[] = []) : boolean {
    cns = charindexnumOpts(cns);
    return super.equals(l,cns) && this.exp.equals(l.exp);
  }


  compare(l: ExpLiteral) : number {
    let superComp = super.compare(l);

    // x_1^3 != x_1^2 != x_1
    // major powers on the left
    return superComp != 0 ? superComp : l.exp.value() - this.exp.value();
  }


  private tostring: string|undefined = undefined;


  toString() : string {
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


  static readonly x = new ExpLiteral({char: 'x'});
  static readonly y = new ExpLiteral({char: 'y'});
  static readonly k = new ExpLiteral({char: 'k'});
  static readonly z = new ExpLiteral({char: 'z'});
}