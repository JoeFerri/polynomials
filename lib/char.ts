/**
 * @author Giuseppe Ferri
 * @license LGPL-3.0
 *
 * Copyright (c) 2021, Giuseppe Ferri <jfinfoit@gmail.com>
 */


// https://www.unicode.org/charts/PDF/U0370.pdf
export type gcharl =
  'α' | 'β' | 'γ' | 'δ' | 'ε' |
  'ζ' | 'η' | 'θ' | 'ι' | 'κ' |
  'λ' | 'μ' | 'ν' | 'ξ' | 'ο' |
  'π' | 'ρ' | 'σ' | 'τ' | 'υ' |
  'φ' | 'χ' | 'ψ' | 'ω' | 'ϝ';

export type gcharL =
  'Α' | 'Β' | 'Γ' | 'Δ' | 'Ε' |
  'Ζ' | 'Η' | 'Θ' | 'Ι' | 'Κ' |
  'Λ' | 'Μ' | 'Ν' | 'Ξ' | 'Ο' |
  'Π' | 'Ρ' | 'Σ' | 'Τ' | 'Υ' |
  'Φ' | 'Χ' | 'Ψ' | 'Ω' | 'Ϝ';

export type charl =
  'a' | 'b' | 'c' | 'd' | 'e' |
  'f' | 'g' | 'h' | 'i' | 'j' |
  'k' | 'l' | 'm' | 'n' | 'o' |
  'p' | 'q' | 'r' | 's' | 't' |
  'u' | 'v' | 'w' | 'x' | 'y' |
  'z';

export type charL =
  'A' | 'B' | 'C' | 'D' | 'E' |
  'F' | 'G' | 'H' | 'I' | 'J' |
  'K' | 'L' | 'M' | 'N' | 'O' |
  'P' | 'Q' | 'R' | 'S' | 'T' |
  'U' | 'V' | 'W' | 'X' | 'Y' |
  'Z';


export type charlit = gcharl | gcharL | charl | charL;


/**
 * [0] → character;
 * [1] → literal value;
 */
export type charnum = [charlit, number];


/**
 * [0] → character;
 * [1] → index;
 * [2] → literal value;
 */
export type charindexnum = [charlit, number, number];


/**
 * c → character;
 * i → index;
 * n → literal value;
 */
export type cinopt = {c: charlit, i?: number, n: number};


export function iscinopt(obj: charindexnum|cinopt) : obj is cinopt {
  return obj != undefined && !Array.isArray(obj);
}


export function charnumToCIN(cn: charnum[] = []) : charindexnum[] {
  let cns: charindexnum[] = [];
  for (let t of cn)
    cns.push([t[0],0,t[1]]);
  return cns;
}


export function charnumIndexToCN(cns: charindexnum[] = []) : charnum[] {
  let cn: charnum[] = [];
  for (let t of cns)
    cn.push([t[0],t[2]]);
  return cn;
}


export function cinoptToCNS(cins: cinopt[] = []) : charindexnum[] {
  let cns: charindexnum[] = [];
  for (let t of cins)
    cns.push([t.c,t.i != undefined ? t.i : 0,t.n]);
  return cns;
}


export function charindexnumOpts(cns: charindexnum[]|cinopt[] = []) : charindexnum[] {
  let _cns: charindexnum[] = [];
  if (cns.length > 0)
    _cns = iscinopt(cns[0]) ? cinoptToCNS(cns as cinopt[]) : cns as charindexnum[];
  return _cns;
}


export const gchars = {
  Alfa:      "Α" as charlit, alfa:   	"α" as charlit,
  Beta:      "Β" as charlit, beta:   	"β" as charlit,
  Gamma:     "Γ" as charlit, gamma:  	"γ" as charlit,
  Delta:     "Δ" as charlit, delta:  	"δ" as charlit,
  Epsilon:   "Ε" as charlit, epsilon:	"ε" as charlit,
  Zeta:      "Ζ" as charlit, zeta:   	"ζ" as charlit,
  Eta:       "Η" as charlit, eta:    	"η" as charlit,
  Theta:     "Θ" as charlit, theta:  	"θ" as charlit,
  Iota:      "Ι" as charlit, iota:   	"ι" as charlit,
  Kappa:     "Κ" as charlit, kappa:  	"κ" as charlit,
  Lambda:    "Λ" as charlit, lambda: 	"λ" as charlit,
  Mi:        "Μ" as charlit, mi:     	"μ" as charlit,
  Ni:        "Ν" as charlit, ni:     	"ν" as charlit,
  Xi:        "Ξ" as charlit, xi:     	"ξ" as charlit,
  Omicron:   "Ο" as charlit, omicron:	"ο" as charlit,
  Pi:        "Π" as charlit, pi:     	"π" as charlit,
  Rho:       "Ρ" as charlit, rho:    	"ρ" as charlit,
  Sigma:     "Σ" as charlit, sigma:  	"σ" as charlit,
  Tau:       "Τ" as charlit, tau:    	"τ" as charlit,
  Ypsilon:   "Υ" as charlit, ypsilon:	"υ" as charlit,
  Phi:       "Φ" as charlit, phi:    	"φ" as charlit,
  Chi:       "Χ" as charlit, chi:    	"χ" as charlit,
  Psi:       "Ψ" as charlit, psi:    	"ψ" as charlit,
  Omega:     "Ω" as charlit, omega:  	"ω" as charlit,
  Digamma:   "Ϝ" as charlit, digamma:	"ϝ" as charlit
}
