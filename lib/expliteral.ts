/**
 * @author Giuseppe Ferri
 */

import { charindexnum, charlit } from "./char";
import { equalsExp, Exp, valueExp } from "./exp";
import { Literal } from "./literal";
import { undnumber } from "./type";



export class ExpLiteral extends Literal {

  readonly exp: Exp;

  
  constructor(char: charlit, index?: number, exp?: Exp) {
    super(char,index);
    this.exp = exp != undefined ? exp : 1;
  }


  value(cns: charindexnum[]) : undnumber {
    let
      v: undnumber = super.value(cns),
      e: undnumber = valueExp(this.exp,cns);

    return v != undefined && e != undefined ? v ** e : undefined;
  }


  equals(l: ExpLiteral, cns: charindexnum[] = []) : boolean {
    let v: boolean = cns.length > 0 ? equalsExp(this.exp,l.exp,cns) : true;
    return super.equals(l,cns) && v;
  }


  toString() : string {
    return super.toString() + (equalsExp(this.exp,1) ? '' : '^' + this.exp.toString());
  }


  static readonly x = new ExpLiteral('x');
  static readonly y = new ExpLiteral('y');
  static readonly k = new ExpLiteral('k');
  static readonly z = new ExpLiteral('z');
}