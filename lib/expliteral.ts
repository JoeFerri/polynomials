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

  
  constructor(char: charlit, index?: number, exp?: Exp) {
    super(char,index);
    this.exp = exp != undefined ?
      (exp instanceof Rational ? exp : new Rational(exp)) : Rational.one;
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


  static readonly x = new ExpLiteral('x');
  static readonly y = new ExpLiteral('y');
  static readonly k = new ExpLiteral('k');
  static readonly z = new ExpLiteral('z');
}