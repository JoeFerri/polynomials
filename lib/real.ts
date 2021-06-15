/**
 * @author Giuseppe Ferri
 * @license LGPL-3.0
 *
 * Copyright (c) 2021, Giuseppe Ferri (joeferri83prog@libero.it)
 */

import { Complex } from "./complex";
import { ExpRational } from "./exprational";


/**
* While not all complexes are real,
* for our purposes it is useful to think of the Real class
* as a particular case of Complex
* that always has the imaginary part equal to 0.
*/
export class Real extends Complex {


  constructor(opt: {a: ExpRational}) {
    super({a: opt.a});
  }


  /**
   * I'm sure the value is a number, because the imaginary part is 0.
   */
  override value() : number {
    return super.value() as number;
  }


  override equals(z: Real) : boolean {
    return this.a.equals(z.a); 
  }


  override toString(with_sign: boolean = false) : string {
    return this.a.toString(with_sign);
  }


  static override readonly zero = new Real({a: ExpRational.zero});
  static override readonly one = new Real({a: ExpRational.one});
  static override readonly mone = new Real({a: ExpRational.mone});
  static override readonly infinity = new Real({a: ExpRational.infinity});
  static override readonly minfinity = new Real({a: ExpRational.minfinity});
 }
 