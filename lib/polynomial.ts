/**
 * @author Giuseppe Ferri
 * @license LGPL-3.0
 *
 * Copyright (c) 2021, Giuseppe Ferri (joeferri83prog@libero.it)
 */

import { charindexnum, charindexnumOpts, cinopt } from "./char";
import { UndefinedError } from "./error";
import { Opposable, Summable, UndEvaluable } from "./math";
import { Monomial } from "./monomial";
import { undnumber } from "./type";
import { Comparable } from "./utils";



export class Polynomial implements Comparable<Polynomial>, UndEvaluable, Summable<Polynomial>, Opposable<Polynomial> {

  readonly monomials: Monomial[] = [];


  constructor(opt: {monomials: Monomial[]}) {
    this.monomials = [...(opt.monomials || [])].sort( (m1,m2) => m1.compare(m2) );

    if (this.monomials.length == 0)
      throw new UndefinedError();
  }


  sum(t: Polynomial): Polynomial {
    let
      lst: Map<string,Monomial> = new Map<string,Monomial>(),
      track: string;
    for (let ms of [this.monomials, t.monomials]) {
      for (let m of ms) {
        track = m.literalsTrack();
        if (!lst.has(track))
          lst.set(track,Monomial.zero);
        lst.set(track,lst.get(track)!.sum(m,false)); //! ASSERT: lst.get(track) != null
      }
    }

    return new Polynomial({monomials: [...lst.values()]});
  }


  subtr(t: Polynomial): Polynomial {
    return this.sum(t.opp());
  }


  opp(): Polynomial {
    return new Polynomial({monomials: this.monomials.map( m => m.opp() )});
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
    let
      i = 0,
      comp: number = -1,
      len1: number = this.monomials.length,
      len2: number = p.monomials.length,
      lenMin: number = Math.min(len1,len2);
    
    while (i < lenMin) {
      comp = this.monomials[i].compare(p.monomials[i]);
      if (comp != 0)
        return comp;
      i++;
    }
    return len1 - len2;
  }


  static parse(str: string) : Polynomial {
    let
      monomials: Monomial[] = [],
      opt: RegExpMatchArray|null,
      regexp: RegExp = /\s{1}([+-]){1}\b/g,
      sx: number = 0;

    // try {
      while ((opt = regexp.exec(str)) !== null) {
        monomials.push(Monomial.parse(str.slice(sx,opt.index)));
        sx = (opt.index)! +1; //! ASSERT: opt.index != undefined
      }
      monomials.push(Monomial.parse(str.slice(sx)));
    // } catch (error) {
    //   throw new UndefinedError();
    // }

    return new Polynomial({monomials: monomials});
  }


  toString(with_sign: boolean = false) : string {
    return this.monomials
          .map( (m,index) => index != 0 ? m.toString(true) : m.toString(with_sign) )
          .join(' ');
  }


  static readonly zero      = new Polynomial({monomials: [Monomial.zero]});
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