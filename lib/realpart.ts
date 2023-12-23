/**
 * @author Giuseppe Ferri
 * @license LGPL-3.0
 *
 * Copyright (c) 2021, Giuseppe Ferri <jfinfoit@gmail.com>
 */

import { Exp } from "./exp";
import { ExpRational } from "./exprational";
import { Summable } from "./math";
import { Sign } from "./sign";
import { Comparable } from "./utils";



export class RealPart extends ExpRational implements Comparable<RealPart>, Summable<RealPart> {

  constructor(opt: {n: number, d?: number, s?: Sign, simplify?: boolean, exp?: Exp}) {
    super(opt);
  }


  sum(t: RealPart): RealPart {
    let sum = super.sum(t);
    return new RealPart({n: (sum.n * sum.s.value), d: sum.d, exp: sum.exp});
  }


  subtr(t: RealPart): RealPart {
    return this.sum(t.opp());
  }


  opp(): RealPart {
    return new RealPart({n: (this.n * this.s.value * (-1)), d: this.d, exp: this.exp});
  }


  equals(r: RealPart) : boolean {
    return super.equals(r);
  }


  compare(r: RealPart) : number {
    return super.compare(r);
  }
  

  static parse(str: string) : RealPart {
    let er: ExpRational = ExpRational.parse(str);
    return new RealPart({n: er.n, d: er.d, s: er.s, exp: er.exp});
  }


  static readonly zero = new RealPart({n: 0});
  static readonly one = new RealPart({n: 1});
  static readonly mone = new RealPart({n: -1});
  static readonly infinity = new RealPart({n: Infinity});
  static readonly minfinity = new RealPart({n: -Infinity});
}
