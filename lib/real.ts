/**
 * @author Giuseppe Ferri
 * @license LGPL-3.0
 *
 * Copyright (c) 2021, Giuseppe Ferri (joeferri83prog@libero.it)
 */

 import { Complex } from ".";
 import { ExpRational } from "./exprational";
 
 
 /**
  * While not all complexes are real,
  * for our purposes it is useful to think of the Real class
  * as a particular case of Complex
  * that always has the imaginary part equal to 0.
  */
 export class Real extends Complex {
 
 
   constructor(a: ExpRational) {
     super(a);
   }
 
 
   /**
    * I'm sure the value is a number, because the imaginary part is 0.
    */
   value() : number {
     return super.value() as number;
   }
 
 
   equals(z: Real) : boolean {
     return this.a.equals(z.a); 
   }
 
 
   toString(with_sign: boolean = false) : string {
     return this.a.toString(with_sign);
   }
 
 
   static readonly zero = new Real(ExpRational.zero);
   static readonly mzero = new Real(ExpRational.mzero);
   static readonly one = new Real(ExpRational.one);
   static readonly mone = new Real(ExpRational.mone);
   static readonly infinity = new Real(ExpRational.infinity);
   static readonly minfinity = new Real(ExpRational.minfinity);
 }
 