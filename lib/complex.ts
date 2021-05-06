/**
 * @author Giuseppe Ferri
 */

import { ExpRational } from "./exprational";



export class Complex {

  readonly a: ExpRational;
  readonly b: ExpRational;

  constructor(a: ExpRational, b?: ExpRational) {
    this.a = a;
    this.b = b != undefined ? b : ExpRational.zero;
  }

  equals(z: Complex) : boolean {
    return this.a.equals(z.a) && this.b.equals(z.b); 
  }
}