/**
 * @author Giuseppe Ferri
 */

import { charlit } from "./char";
import { equalsExp, Exp } from "./exp";
import { Literal } from "./literal";



export class ExpLiteral extends Literal {

  readonly exp: Exp;

  constructor(char: charlit, index?: number, exp?: Exp) {
    super(char,index);
    this.exp = exp != undefined ? exp : 1;
  }

  equals(l: ExpLiteral) : boolean {
    return super.equals(l) && equalsExp(this.exp,l.exp);
  }

  static readonly x = new ExpLiteral('x');
  static readonly y = new ExpLiteral('y');
  static readonly k = new ExpLiteral('k');
  static readonly z = new ExpLiteral('z');
}