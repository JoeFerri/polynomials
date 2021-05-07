/**
 * @author Giuseppe Ferri
 */

import { charindexnum } from "./char";
import { Complex } from "./complex";
import { ExpLiteral } from "./expliteral";
import { undnumber } from "./type";



export class Monomial {

  readonly z: Complex;
  private literals: ExpLiteral[];


  constructor(z: Complex, ...literals: ExpLiteral[]) {
    this.z = z;
    this.literals = [...literals];
  }


  value(cns: charindexnum[] = []) : undnumber {
    let
      vz = this.z.value(cns),
      vl = this.literals
        .map( l => l.value(cns) )
        .reduce( (prev,curr) => prev != undefined && curr != undefined ? prev * curr : undefined);
    return vz != undefined && vl != undefined ? vz * vl : undefined;
  }


  literalsTrack() : string {
    return this.literals.map( l => l.toString() ).sort( (l1,l2) => l1.localeCompare(l2) ).join('')
  }


  equals(m: Monomial, cns: charindexnum[] = []) : boolean {
    let
      vThis = this.value(cns), //! is it necessary?
      vThat = m.value(cns), //! is it necessary?
      lThis = this.literalsTrack(),
      lThat = m.literalsTrack();

    return this.z.equals(m.z,cns) && vThis == vThat && lThis == lThat;
  }

  
  toString() : string {
    return this.z.toString() + this.literalsTrack();
  }
}