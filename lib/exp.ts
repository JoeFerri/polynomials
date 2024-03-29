/**
 * @author Giuseppe Ferri
 * @license LGPL-3.0
 *
 * Copyright (c) 2021, Giuseppe Ferri <jfinfoit@gmail.com>
 */

import { Rational } from ".";



/**
 * contract:
 *   if the exponent represents a natural number,
 *   then the type is number, otherwise it is Rational.
 */
export type Exp = number | Rational;
