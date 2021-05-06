/**
 * @author Giuseppe Ferri
 */



export abstract class Sign {

  abstract value: 1 | -1;
  abstract sign: '+' | '-';

  toString() {
    return this.sign;
  }

  static readonly plus = new class extends Sign {

    get value() {
      return 1 as 1;
    }
  
    get sign() {
      return '+' as '+';
    }
  }
  
  static readonly minus = new class extends Sign {
  
    get value() {
      return -1 as -1;
    }
  
    get sign() {
      return '-' as '-';
    }
  }
}