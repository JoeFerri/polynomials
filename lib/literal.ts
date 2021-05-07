/**
 * @author Giuseppe Ferri
 */

import { charlit, charindexnum } from "./char";
import { undnumber } from "./type";



export class Literal {

  readonly char: charlit;
  readonly index: number; // 0 means "no index"

  constructor(char: charlit, index?: number) {
    this.char = char;
    this.index = index != undefined ? index : 0;
  }

  value(cns: charindexnum[]) : undnumber {
    for (let cn of cns)
      if (cn[0] == this.char && cn[1] == this.index)
        return cn[2];
    return undefined;
  }

  equals(l: Literal, cns: charindexnum[] = []) : boolean {
    return this.char == l.char && this.index == l.index && this.value(cns) == l.value(cns);
  }

  toString() : string {
    return this.char + (this.index != 0 ? '_' + this.index : '');
  }

  static readonly x = new Literal('x');
  static readonly y = new Literal('y');
  static readonly k = new Literal('k');
  static readonly z = new Literal('z');
}