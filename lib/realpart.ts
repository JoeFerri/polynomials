/**
 * @author Giuseppe Ferri
 * @license LGPL-3.0
 *
 * Copyright (c) 2021, Giuseppe Ferri (joeferri83prog@libero.it)
 */

import { Exp } from "./exp";
import { ExpRational } from "./exprational";
import { Sign } from "./sign";
import { Comparable } from "./utils";



export class RealPart extends ExpRational implements Comparable<RealPart> {

  constructor(opt: {n: number, d?: number, s?: Sign, simplify?: boolean, exp?: Exp}) {
    super(opt);
  }


  equals(r: RealPart) : boolean {
    return super.equals(r);
  }


  compare(r: RealPart) : number {
    return super.compare(r);
  }
  


  static readonly zero = new RealPart({n: 0});
  static readonly one = new RealPart({n: 1});
  static readonly mone = new RealPart({n: -1});
  static readonly infinity = new RealPart({n: Infinity});
  static readonly minfinity = new RealPart({n: -Infinity});
}