/**
 * @author Giuseppe Ferri
 * @license LGPL-3.0
 *
 * Copyright (c) 2021, Giuseppe Ferri <jfinfoit@gmail.com>
 */

import { charlit, charindexnum, cinopt, charindexnumOpts } from "./char";
import { NumericError, UndefinedError } from "./error";
import { UndEvaluable } from "./math";
import { undnumber } from "./type";
import { Comparable } from "./utils";



export class Literal implements Comparable<Literal>, UndEvaluable {

  readonly char: charlit;
  readonly index: number; // 0 means "no index"


  constructor(opt: {char: charlit, index?: number}) {
    this.char = opt.char;
    this.index = opt.index != undefined ? opt.index : 0;
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


  static readonly expStrict: RegExp = /^(?<char>[\u0370-\u03FFa-zA-Z]{1})(?:_(?<index>\d+))?$/u;

  static readonly exp: RegExp = /(?<char>[\u0370-\u03FFa-zA-Z]{1})(?:_(?<index>\d+))?/u;


  static parse(str: string) : Literal {
    let
      opt: RegExpMatchArray|null = str.match(Literal.expStrict),
      char: charlit,
      index: number|undefined;

    if (opt != null) {
      char = opt[1] as charlit;
      index = opt[2] != undefined ? Number(opt[2]) : undefined;
    }
    else throw new UndefinedError();
    
    return new Literal({char: char, index: index});
  }


  toString() : string {
    return this.char + (this.index != 0 ? '_' + this.index : '');
  }




  static readonly x_1 = new Literal({char: 'x', index: 1});
  static readonly x_2 = new Literal({char: 'x', index: 2});
  static readonly x_3 = new Literal({char: 'x', index: 3});
  static readonly x_4 = new Literal({char: 'x', index: 4});
  static readonly x_5 = new Literal({char: 'x', index: 5});
  static readonly x_6 = new Literal({char: 'x', index: 6});
  static readonly x_7 = new Literal({char: 'x', index: 7});
  static readonly x_8 = new Literal({char: 'x', index: 8});
  static readonly x_9 = new Literal({char: 'x', index: 9});

  static readonly y_1 = new Literal({char: 'y', index: 1});
  static readonly y_2 = new Literal({char: 'y', index: 2});
  static readonly y_3 = new Literal({char: 'y', index: 3});
  static readonly y_4 = new Literal({char: 'y', index: 4});
  static readonly y_5 = new Literal({char: 'y', index: 5});
  static readonly y_6 = new Literal({char: 'y', index: 6});
  static readonly y_7 = new Literal({char: 'y', index: 7});
  static readonly y_8 = new Literal({char: 'y', index: 8});
  static readonly y_9 = new Literal({char: 'y', index: 9});

  static readonly z_1 = new Literal({char: 'z', index: 1});
  static readonly z_2 = new Literal({char: 'z', index: 2});
  static readonly z_3 = new Literal({char: 'z', index: 3});
  static readonly z_4 = new Literal({char: 'z', index: 4});
  static readonly z_5 = new Literal({char: 'z', index: 5});
  static readonly z_6 = new Literal({char: 'z', index: 6});
  static readonly z_7 = new Literal({char: 'z', index: 7});
  static readonly z_8 = new Literal({char: 'z', index: 8});
  static readonly z_9 = new Literal({char: 'z', index: 9});
  
  static readonly x = new Literal({char: 'x'});
  static readonly y = new Literal({char: 'y'});
  static readonly k = new Literal({char: 'k'});
  static readonly z = new Literal({char: 'z'});

  static readonly X = new Literal({char: 'X'});
  static readonly Y = new Literal({char: 'Y'});
  static readonly K = new Literal({char: 'K'});
  static readonly Z = new Literal({char: 'Z'});

  static readonly alfa    = new Literal({char: 'α'});
  static readonly beta    = new Literal({char: 'β'});
  static readonly gamma   = new Literal({char: 'γ'});
  static readonly delta   = new Literal({char: 'δ'});
  static readonly lambda  = new Literal({char: 'λ'});
  static readonly rho     = new Literal({char: 'ρ'});
  static readonly sigma   = new Literal({char: 'σ'});
  static readonly tau     = new Literal({char: 'τ'});
  static readonly omega   = new Literal({char: 'ω'});
}
