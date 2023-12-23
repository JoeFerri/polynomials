/**
 * @author Giuseppe Ferri
 * @license LGPL-3.0
 *
 * Copyright (c) 2021, Giuseppe Ferri <jfinfoit@gmail.com>
 */



export interface Comparable<T> {
  /**
   * this == t → returns 0
   * 
   * this < t  → returns a number less than 0
   * 
   * this > t  → returns a number greater than 0
   */
  compare(t: T) : number;
}
