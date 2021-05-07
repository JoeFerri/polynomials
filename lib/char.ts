/**
 * @author Giuseppe Ferri
 */



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


export const gchars = {
  Alfa:      "Α", alfa:   	"α",
  Beta:      "Β", beta:   	"β",
  Gamma:     "Γ", gamma:  	"γ",
  Delta:     "Δ", delta:  	"δ",
  Epsilon:   "Ε", epsilon:	"ε",
  Zeta:      "Ζ", zeta:   	"ζ",
  Eta:       "Η", eta:    	"η",
  Theta:     "Θ", theta:  	"θ",
  Iota:      "Ι", iota:   	"ι",
  Kappa:     "Κ", kappa:  	"κ",
  Lambda:    "Λ", lambda: 	"λ",
  Mi:        "Μ", mi:     	"μ",
  Ni:        "Ν", ni:     	"ν",
  Xi:        "Ξ", xi:     	"ξ",
  Omicron:   "Ο", omicron:	"ο",
  Pi:        "Π", pi:     	"π",
  Rho:       "Ρ", rho:    	"ρ",
  Sigma:     "Σ", sigma:  	"σ",
  Tau:       "Τ", tau:    	"τ",
  Ypsilon:   "Υ", ypsilon:	"υ",
  Phi:       "Φ", phi:    	"φ",
  Chi:       "Χ", chi:    	"χ",
  Psi:       "Ψ", psi:    	"ψ",
  Omega:     "Ω", omega:  	"ω",
  Digamma:   "Ϝ", digamma:	"ϝ"
}