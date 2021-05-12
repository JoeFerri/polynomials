/**
 * @author Giuseppe Ferri
 * @license LGPL-3.0
 *
 * Copyright (c) 2021, Giuseppe Ferri (joeferri83prog@libero.it)
 */

import { charindexnum, charindexnumOpts, cinopt } from "./char";
import { Monomial } from "./monomial";
import { undnumber } from "./type";
import { Comparable } from "./utils";



export class Polynomial implements Comparable<Polynomial> {

  readonly monomials: Monomial[] = [];


  constructor(...monomials: Monomial[]) {
    this.monomials = monomials.sort( (m1,m2) => m1.compare(m2) );
  }


  value(cns: charindexnum[]|cinopt[] = []) : undnumber {
    cns = charindexnumOpts(cns);
    return this.monomials
        .map( m => m.value(cns) )
        .reduce( (prev,curr) => prev != undefined && curr != undefined ? prev + curr : undefined, 0);
  }


  equals(p: Polynomial, cns: charindexnum[] = []) : boolean {
    
    if (this.monomials.length != p.monomials.length)
      return false;

    //? assert: assume that the monomials are ordered
    for (let i = 0; i < this.monomials.length; i++)
      if (!this.monomials[i].equals(p.monomials[i]))
        return false;
    return true;
  }


  compare(p: Polynomial) : number {
    throw new Error(); // TODO
  }


  toString(with_sign: boolean = false) : string {
    let tostring = this.monomials
          .map( (m,index) => index != 0 ? m.toString(true) : m.toString() )
          .join(' ');
    
    return (with_sign ? this.monomials[0].z.s.sign : '') + (tostring as string);
  }


  static readonly zero      = new Polynomial(Monomial.zero);
  static readonly mzero     = new Polynomial(Monomial.mzero);
  static readonly one       = new Polynomial(Monomial.one);
  static readonly mone      = new Polynomial(Monomial.mone);
  static readonly infinity  = new Polynomial(Monomial.infinity);
  static readonly minfinity = new Polynomial(Monomial.minfinity);
  
  static readonly x = new Polynomial(Monomial.x);
  static readonly y = new Polynomial(Monomial.y);
  static readonly k = new Polynomial(Monomial.k);
  static readonly z = new Polynomial(Monomial.z);
  
  static readonly x2 = new Polynomial(Monomial.x2);
  static readonly y2 = new Polynomial(Monomial.y2);
  static readonly z2 = new Polynomial(Monomial.z2);
  
  static readonly x3 = new Polynomial(Monomial.x3);
  static readonly y3 = new Polynomial(Monomial.y3);
  static readonly z3 = new Polynomial(Monomial.z3);
}


function monomialsSort(m1: Monomial, m2: Monomial) : number {
  return m1.toString().localeCompare(m2.toString());
}
