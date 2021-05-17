/**
 * @author Giuseppe Ferri
 * @license LGPL-3.0
 *
 * Copyright (c) 2021, Giuseppe Ferri (joeferri83prog@libero.it)
 */

import { charindexnum, charindexnumOpts, cinopt } from "./char";
import { UndefinedError } from "./error";
import { UndEvaluable } from "./math";
import { Monomial } from "./monomial";
import { undnumber } from "./type";
import { Comparable } from "./utils";



export class Polynomial implements Comparable<Polynomial>, UndEvaluable {

  readonly monomials: Monomial[] = [];


  constructor(opt: {monomials: Monomial[]}) {
    this.monomials = [...(opt.monomials || [])].sort( (m1,m2) => m1.compare(m2) );

    if (this.monomials.length == 0)
      throw new UndefinedError();
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


  static readonly zero      = new Polynomial({monomials: [Monomial.zero]});
  // static readonly mzero     = new Polynomial(Monomial.mzero);
  static readonly one       = new Polynomial({monomials: [Monomial.one]});
  static readonly mone      = new Polynomial({monomials: [Monomial.mone]});
  static readonly infinity  = new Polynomial({monomials: [Monomial.infinity]});
  static readonly minfinity = new Polynomial({monomials: [Monomial.minfinity]});
  
  static readonly x = new Polynomial({monomials: [Monomial.x]});
  static readonly y = new Polynomial({monomials: [Monomial.y]});
  static readonly k = new Polynomial({monomials: [Monomial.k]});
  static readonly z = new Polynomial({monomials: [Monomial.z]});
  
  static readonly x2 = new Polynomial({monomials: [Monomial.x2]});
  static readonly y2 = new Polynomial({monomials: [Monomial.y2]});
  static readonly z2 = new Polynomial({monomials: [Monomial.z2]});
  
  static readonly x3 = new Polynomial({monomials: [Monomial.x3]});
  static readonly y3 = new Polynomial({monomials: [Monomial.y3]});
  static readonly z3 = new Polynomial({monomials: [Monomial.z3]});
}
