/**
 * @author Giuseppe Ferri
 * @license LGPL-3.0
 *
 * Copyright (c) 2021, Giuseppe Ferri (joeferri83prog@libero.it)
 */

import { charlit } from "./char";
import { Literal } from "./literal";


/**
 * The value of a mathematical object composed of variables can be undefined.
 */
export type undnumber = number | undefined;


/**
 * https://reference.wolfram.com/language/ref/ComplexInfinity.html
 */
export var ComplexInfinity: number = Infinity; // Number.POSITIVE_INFINITY;



export type Variable = charlit|Literal|{char: charlit, index?: number}