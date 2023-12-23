/**
 * @author Giuseppe Ferri
 * @license LGPL-3.0
 *
 * Copyright (c) 2021, Giuseppe Ferri <jfinfoit@gmail.com>
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

  
  /**
   * Returns the sign of a number.
   */
  static byN(n: number) : Sign {
    return n >= 0 ? Sign.plus : Sign.minus;
  }


  /**
   * Returns the sign of the product/quotient between two numbers;
   * borderline cases, such as division by zero, are handled.
   */
  static byND(n: number, d: number) : Sign {
    return (n >= 0 && d >= 0) || (n < 0 && d < 0) ? Sign.plus : Sign.minus;
  }


  //! is slower than
  // static byA(...a: number[]) : Sign {
  //   return Sign.byN(a.reduce( (n,d) => (n >= 0 && d >= 0) || (n < 0 && d < 0) ? 1 : -1 ));
  // }


  /**
   * Returns the sign of the product of a list of numbers.
   * If there is a zero in the factor list, then the sign is Sign.plus.
   */
  static byA(...a: number[]) : Sign {
    let m = 0;
    for (let v of a)
      if (v == 0)
        return Sign.plus;
      else if (v < 0)
        m++;
    return m%2 == 0 ? Sign.plus : Sign.minus;
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
