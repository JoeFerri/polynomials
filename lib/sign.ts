/**
 * @author Giuseppe Ferri
 * @license LGPL-3.0
 *
 * Copyright (c) 2021, Giuseppe Ferri (joeferri83prog@libero.it)
 */



export abstract class Sign {

  abstract value: 1 | -1;
  abstract sign: '+' | '-';


  signpm() : '' | '-' {
    return this.value >= 0 ? '' : '-';
  }


  toString() : string {
    return this.sign;
  }


  static readonly plus = new class PlusSign extends Sign {

    get value() : 1 | -1 {
      return 1;
    }
  
    get sign(): '+' | '-' {
      return '+';
    }
  }
  
  
  static readonly minus = new class MinusSign extends Sign {
  
    get value() : 1 | -1 {
      return -1;
    }
  
    get sign(): '+' | '-' {
      return '-';
    }
  }
}