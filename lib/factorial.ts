/**
 * @author Giuseppe Ferri
 * @license LGPL-3.0
 *
 * Copyright (c) 2021, Giuseppe Ferri <jfinfoit@gmail.com>
 */

import { Sign } from "./sign";
import { ExpRational } from "./exprational";
import { NumericError } from "./error";
import { Comparable } from "./utils";
import { isNatural } from "./math";



export class Factorial extends ExpRational implements Comparable<Factorial> {

  readonly k: number;


  constructor(opt: {k: number}) {

    if (!isNatural(opt.k) && opt.k != Infinity)
      throw new NumericError();

    super({n: fact(opt.k)});
    this.k = opt.k;
  }


  value() : number {
    return this.k;
  }


  equals(f: Factorial) : boolean {
    return this.k == f.k;
  }


  compare(f: Factorial) : number {
    return this.k - f.k;
  }


  toString(with_sign: boolean = false) : string {
    return `${with_sign ? Sign.plus.sign : ''}${this.k}!`;
  }
}


let factMap: number[] = [1,1];


function fact(k: number) : number {
  if (k == Infinity)
    return Infinity;
  if (factMap.length > k)
    return factMap[k];
  for (let i = factMap.length; i <= k; i++) {
    factMap.push(factMap[i-1]*i);
  }
  return factMap[k];
}
