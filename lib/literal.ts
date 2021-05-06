/**
 * @author Giuseppe Ferri
 */

import { charlit } from "./char";



export class Literal {

  readonly char: charlit;
  readonly index: number; // 0 means "no index"

  constructor(char: charlit, index?: number) {
    this.char = char;
    this.index = index != undefined ? index : 0;
  }

  equals(l: Literal) : boolean {
    return this.char == l.char && this.index == l.index;
  }

  static readonly x = new Literal('x');
  static readonly y = new Literal('y');
  static readonly k = new Literal('k');
  static readonly z = new Literal('z');
}