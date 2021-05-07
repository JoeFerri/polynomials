/**
 * @author Giuseppe Ferri
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