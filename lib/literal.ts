/**
 * @author Giuseppe Ferri
 * @license LGPL-3.0
 *
 * Copyright (c) 2021, Giuseppe Ferri (joeferri83prog@libero.it)
 */

import { charlit, charindexnum, cinopt, iscinopt, cinoptToCNS, charindexnumOpts } from "./char";
import { UndEvaluable } from "./math";
import { undnumber } from "./type";
import { Comparable } from "./utils";



export class Literal implements Comparable<Literal>, UndEvaluable {

  readonly char: charlit;
  readonly index: number; // 0 means "no index"


  constructor(char: charlit, index?: number) {
    this.char = char;
    this.index = index != undefined ? index : 0;
  }


  value(cns: charindexnum[]|cinopt[] = []) : undnumber {
    cns = charindexnumOpts(cns);
    for (let cn of cns)
      if (cn[0] == this.char && cn[1] == this.index)
        return cn[2];
    return undefined;
  }


  equals(l: Literal, cns: charindexnum[]|cinopt[] = []) : boolean {
    cns = charindexnumOpts(cns);
    return this.char == l.char && this.index == l.index && this.value(cns) == l.value(cns);
  }


  compare(l: Literal) : number {
    let locCompChar = this.char.localeCompare(l.char);
    let locCompIndex = this.index - l.index;
  
    // x != y
    // alphabetical ordering
    if (locCompChar != 0)
      return locCompChar;
  
    // x_1 != x_2
    // lexicographic ordering
    return locCompIndex;
  }


  toString() : string {
    return this.char + (this.index != 0 ? '_' + this.index : '');
  }

  static readonly x_1 = new Literal('x',1);
  static readonly x_2 = new Literal('x',2);
  static readonly x_3 = new Literal('x',3);
  static readonly x_4 = new Literal('x',4);
  static readonly x_5 = new Literal('x',5);
  static readonly x_6 = new Literal('x',6);
  static readonly x_7 = new Literal('x',7);
  static readonly x_8 = new Literal('x',8);
  static readonly x_9 = new Literal('x',9);

  static readonly y_1 = new Literal('y',1);
  static readonly y_2 = new Literal('y',2);
  static readonly y_3 = new Literal('y',3);
  static readonly y_4 = new Literal('y',4);
  static readonly y_5 = new Literal('y',5);
  static readonly y_6 = new Literal('y',6);
  static readonly y_7 = new Literal('y',7);
  static readonly y_8 = new Literal('y',8);
  static readonly y_9 = new Literal('y',9);

  static readonly z_1 = new Literal('z',1);
  static readonly z_2 = new Literal('z',2);
  static readonly z_3 = new Literal('z',3);
  static readonly z_4 = new Literal('z',4);
  static readonly z_5 = new Literal('z',5);
  static readonly z_6 = new Literal('z',6);
  static readonly z_7 = new Literal('z',7);
  static readonly z_8 = new Literal('z',8);
  static readonly z_9 = new Literal('z',9);
  
  static readonly x = new Literal('x');
  static readonly y = new Literal('y');
  static readonly k = new Literal('k');
  static readonly z = new Literal('z');

  static readonly X = new Literal('X');
  static readonly Y = new Literal('Y');
  static readonly K = new Literal('K');
  static readonly Z = new Literal('Z');

  static readonly alfa    = new Literal('α');
  static readonly beta    = new Literal('β');
  static readonly gamma   = new Literal('γ');
  static readonly delta   = new Literal('δ');
  static readonly lambda  = new Literal('λ');
  static readonly rho     = new Literal('ρ');
  static readonly sigma   = new Literal('σ');
  static readonly tau     = new Literal('τ');
  static readonly omega   = new Literal('ω');
}