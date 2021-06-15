/**
 * @author Giuseppe Ferri
 * @license LGPL-3.0
 *
 * Copyright (c) 2021, Giuseppe Ferri (joeferri83prog@libero.it)
 */

import { Exp } from "./exp";
import { ExpRational } from "./exprational";
import { Multiplicable, Reciprocable, Summable } from "./math";
import { Sign } from "./sign";
import { Comparable } from "./utils";



export class RealPart extends ExpRational implements
  Comparable<RealPart>, Summable<RealPart>,
    Multiplicable<RealPart,never>, Reciprocable<RealPart> {

  constructor(opt: {n: number, d?: number, s?: Sign, simplify?: boolean, exp?: Exp}) {
    super(opt);
  }


  static newBy<T extends ExpRational>(v: T) : RealPart {
    return new RealPart({n: v.n * v.s.value, d: v.d, exp: v.exp});
  }


  override normalize() : RealPart {
    if (this.exp.s == Sign.plus)
      return this;
    return new RealPart({n: this.d * this.s.value, d: this.n, exp: this.exp.opp()});
  }


  override recpr(): RealPart {
    return new RealPart({n: this.d * this.s.value, d: this.n, exp: this.exp});
  }

  
  override prod(t: RealPart): RealPart {
    let prod = super.prod(t);
    return new RealPart({n: (prod.n * prod.s.value), d: prod.d, exp: prod.exp});
  }


  override sum(t: RealPart): RealPart {
    let sum = super.sum(t);
    return new RealPart({n: (sum.n * sum.s.value), d: sum.d, exp: sum.exp});
  }


  override subtr(t: RealPart): RealPart {
    return this.sum(t.opp());
  }


  override opp(): RealPart {
    let opp = super.opp();
    return new RealPart({n: (opp.n * opp.s.value), d: opp.d, exp: opp.exp});
  }


  override equals(r: RealPart) : boolean {
    return super.equals(r);
  }


  override compare(r: RealPart) : number {
    return super.compare(r);
  }
  

  static override parse(str: string) : RealPart {
    let er: ExpRational = ExpRational.parse(str);
    return new RealPart({n: er.n, d: er.d, s: er.s, exp: er.exp});
  }


  static override readonly zero = new RealPart({n: 0});
  static override readonly one = new RealPart({n: 1});
  static override readonly mone = new RealPart({n: -1});
  static override readonly infinity = new RealPart({n: Infinity});
  static override readonly minfinity = new RealPart({n: -Infinity});
}