/**
 * @author Giuseppe Ferri
 * @license LGPL-3.0
 *
 * Copyright (c) 2021, Giuseppe Ferri <jfinfoit@gmail.com>
 */



import * as $$ from "../lib/index";
import { expect, should } from 'chai';
should();



describe(`Complex`, function() {

  let
    zero = $$.Complex.zero,
    one = $$.Complex.one,
    mone = $$.Complex.mone,
    infinity = $$.Complex.infinity,
    minfinity = $$.Complex.minfinity,
    cinfinity = $$.Complex.cinfinity,
    cminfinity = $$.Complex.cminfinity;

  describe(`like Real`, function() {

    let
      e1    = new $$.Complex({a: new $$.RealPart({n:  1, d: 2, exp: 2}) }),
      e2    = new $$.Complex({a: new $$.RealPart({n: -1, d: 2, exp: 2}) }),
      e3    = new $$.Complex({a: new $$.RealPart({n:  3, d: 2, exp: 2}) }),
      e4    = new $$.Complex({a: new $$.RealPart({n: -3, d: 2, exp: 3}) }),
      e5    = new $$.Complex({a: new $$.RealPart({n:  2, d: 3, exp: 0}) }),
      e6    = new $$.Complex({a: new $$.RealPart({n: -2, d: 3, exp: 0}) }),
      // e7    = new $$.Complex(new $$.ExpRational(4,1,undefined,2.5)), // TODO
      // e8    = new $$.Complex(new $$.ExpRational(4,1,undefined,-2.5)), // TODO

      exp1  = new $$.Rational({n: 5, d: 2}),
      exp2  = new $$.Rational({n: -5, d: 2}),
      exp3  = new $$.Rational({n: 2}),

      ee1   = new $$.Complex({a: new $$.RealPart({n: 4, d: 1, exp: exp1}) }),
      ee2   = new $$.Complex({a: new $$.RealPart({n: 4, d: 1, exp: exp2}) }),
      ee3   = new $$.Complex({a: new $$.RealPart({n: 4, d: 1, exp: exp3}) }),

      r1    = new $$.Complex({a: new $$.RealPart({n:  1, d:  2}) }),
      r2    = new $$.Complex({a: new $$.RealPart({n:  2, d:  1}) }),
      r3    = new $$.Complex({a: new $$.RealPart({n: -1, d:  2}) }),
      r4    = new $$.Complex({a: new $$.RealPart({n: -1, d: -2}) }),
      r5    = new $$.Complex({a: new $$.RealPart({n: -3, d: -2}) }),
      r6    = new $$.Complex({a: new $$.RealPart({n:  0, d:  2}) }),
      r7    = new $$.Complex({a: new $$.RealPart({n:  2, d:  0}) }),
      r8    = new $$.Complex({a: new $$.RealPart({n: Infinity, d: -5}) }),
      r9    = new $$.Complex({a: new $$.RealPart({n: 5, d: Infinity}) });


    it(`#value()`, function() {
      (zero.value()      as number).should.to.be.equal(0);
      (one.value()       as number).should.to.be.equal(1);
      (mone.value()      as number).should.to.be.equal(-1);
      (infinity.value()  as number).should.to.be.equal(Infinity);
      (minfinity.value() as number).should.to.be.equal(-Infinity);
      (infinity.value()  as number).should.to.be.equal($$.ComplexInfinity);
      (minfinity.value() as number).should.to.be.equal(-$$.ComplexInfinity);

      (e1.value() as number).should.to.be.equal(1/4);
      (e2.value() as number).should.to.be.equal(1/4);
      (e3.value() as number).should.to.be.equal(9/4);
      (e4.value() as number).should.to.be.equal(-27/8);
      (e5.value() as number).should.to.be.equal(1);
      (e6.value() as number).should.to.be.equal(1);
      // (e7.value() as number).should.to.be.equal(32); // TODO
      // (e8.value() as number).should.to.be.equal(1/32); // TODO

      (ee1.value() as number).should.to.be.equal(32);
      (ee2.value() as number).should.to.be.equal(1/32);
      (ee3.value() as number).should.to.be.equal(16);

      (r1.value() as number).should.to.be.equal(1/2);
      (r2.value() as number).should.to.be.equal(2);
      (r3.value() as number).should.to.be.equal(-1/2);
      (r4.value() as number).should.to.be.equal(1/2);
      (r5.value() as number).should.to.be.equal(3/2);
      (r6.value() as number).should.to.be.equal(0);
      (r7.value() as number).should.to.be.equal(Infinity);
      (r8.value() as number).should.to.be.equal(-Infinity);
      (r9.value() as number).should.to.be.equal(0);
    });

    it(`#equals()`, function() {
      zero.equals(zero).should.to.be.equal(true);
      one.equals(one).should.to.be.equal(true);
      mone.equals(mone).should.to.be.equal(true);
      infinity.equals(infinity).should.to.be.equal(true);
      minfinity.equals(minfinity).should.to.be.equal(true);

      e1.equals(e1).should.to.be.equal(true);
      e1.equals(e2).should.to.be.equal(false);
      e1.equals(e3).should.to.be.equal(false);
      e5.equals(e6).should.to.be.equal(false);

      r1.equals(r1).should.to.be.equal(true);
      r1.equals(r3).should.to.be.equal(false);
      r1.equals(r4).should.to.be.equal(true);
    });

    it(`#toString()`, function() {
      zero.toString().should.to.be.equal("0");
      one.toString().should.to.be.equal("1");
      mone.toString().should.to.be.equal("-1");
      infinity.toString().should.to.be.equal("Infinity");
      minfinity.toString().should.to.be.equal("-Infinity");

      e1.toString().should.to.be.equal("(1/2)^2");
      e2.toString().should.to.be.equal("(-1/2)^2");
      e3.toString().should.to.be.equal("(3/2)^2");
      e4.toString().should.to.be.equal("(-3/2)^3");
      e5.toString().should.to.be.equal("(2/3)^0");
      e6.toString().should.to.be.equal("(-2/3)^0");
      
      ee1.toString().should.to.be.equal("4^(5/2)");
      ee2.toString().should.to.be.equal("4^(-5/2)");
      ee3.toString().should.to.be.equal("4^2");

      r1.toString().should.to.be.equal("1/2");
      r2.toString().should.to.be.equal("2");
      r3.toString().should.to.be.equal("-1/2");
      r4.toString().should.to.be.equal("1/2");
      r5.toString().should.to.be.equal("3/2");
      r6.toString().should.to.be.equal("0");
      r7.toString().should.to.be.equal("Infinity");
      r8.toString().should.to.be.equal("-Infinity");
      r9.toString().should.to.be.equal("0");
    });

  });

  describe(`like Complex`, function() {
    
    let
      c1 = new $$.Complex({a: new $$.RealPart({n: 1, d: 2}),         b: new $$.ImaginaryPart({n: 1, d: 2})         }),
      c2 = new $$.Complex({a: new $$.RealPart({n: 1, d: 2, exp: 3}), b: new $$.ImaginaryPart({n: 1, d: 2})         }),
      c3 = new $$.Complex({a: new $$.RealPart({n: 1, d: 2, exp: 3}), b: new $$.ImaginaryPart({n: 1, d: 2, exp: 5}) }),
      c4 = new $$.Complex({a: new $$.RealPart({n: 0}),               b: new $$.ImaginaryPart({n: 2})               }),
      c5 = new $$.Complex({a: new $$.RealPart({n: 0}),               b: new $$.ImaginaryPart({n: -2})              }),
      c6 = new $$.Complex({a: new $$.RealPart({n: 0, d: -1}),        b: new $$.ImaginaryPart({n: -2})              }),
      c7 = new $$.Complex({a: new $$.RealPart({n: 5}),               b: new $$.ImaginaryPart({n: 1})               }),
      c8 = new $$.Complex({a: new $$.RealPart({n: 5}),               b: new $$.ImaginaryPart({n: -1})              }),

      cm2a = new $$.Complex({a: new $$.RealPart({n: 1, d: 2, exp: 3}), b: new $$.ImaginaryPart({n: -1, d: 2})         }),
      cm3a = new $$.Complex({a: new $$.RealPart({n: 1, d: 2, exp: 3}), b: new $$.ImaginaryPart({n: -1, d: 2, exp: 5}) }),
      cm2b = new $$.Complex({a: new $$.RealPart({n: 1, d: 2, exp: 3}), b: new $$.ImaginaryPart({n: -3, d: 2})         }),
      cm3b = new $$.Complex({a: new $$.RealPart({n: 1, d: 2, exp: 3}), b: new $$.ImaginaryPart({n: -3, d: 2, exp: 5}) }),

      i = $$.Complex.i,
      mi = $$.Complex.mi;



    it(`#value()`, function() {
      expect(i.value()).to.be.undefined;
      expect(mi.value()).to.be.undefined;
      
      expect(c1.value()).to.be.undefined;
    });

    it(`#equals()`, function() {
      i.equals(i).should.to.be.equal(true);
      mi.equals(mi).should.to.be.equal(true);
      mi.equals(i).should.to.be.equal(false);
      
      c1.equals(c1).should.to.be.equal(true);
    });

    it(`#toString()`, function() {
      i.toString().should.to.be.equal("i");
      mi.toString().should.to.be.equal("-i");

      cinfinity.toString().should.to.be.equal("ComplexInfinity");
      cminfinity.toString().should.to.be.equal("-ComplexInfinity");
      
      c1.toString().should.to.be.equal("1/2 + i/2");
      c2.toString().should.to.be.equal("(1/2)^3 + i/2");
      c3.toString().should.to.be.equal("(1/2)^3 + ((1/2)^5)i");
      cm2a.toString().should.to.be.equal("(1/2)^3 + (-i/2)");
      cm3a.toString().should.to.be.equal("(1/2)^3 + ((-1/2)^5)i");
      cm2b.toString().should.to.be.equal("(1/2)^3 + (-3i/2)");
      cm3b.toString().should.to.be.equal("(1/2)^3 + ((-3/2)^5)i");
      c4.toString().should.to.be.equal("2i");
      c5.toString().should.to.be.equal("-2i");
      c6.toString().should.to.be.equal("-2i");
      c7.toString().should.to.be.equal("5 + i");
      c8.toString().should.to.be.equal("5 + (-i)");

      let z = new $$.Complex({a: $$.RealPart.parse("-23^(-66/78)"), b: $$.ImaginaryPart.parse("(-23^(-66/78))i")});
      z.toString().should.to.be.equal("-23^(-11/13) + (-23^(-11/13))i");
    });

  });
  
  describe(`all`, function() {

    it(`#parse()`, function() {
      expect(() => $$.Complex.parse("")).to.throw();
  
      $$.Complex.parse("+12i/34").toString().should.to.be.equal("6i/17");
      $$.Complex.parse("+12/34").toString().should.to.be.equal("6/17");

      $$.Complex.parse("12i/34").toString().should.to.be.equal("6i/17");
      $$.Complex.parse("2i/33").toString().should.to.be.equal("2i/33");
      $$.Complex.parse("1i").toString().should.to.be.equal("i");
      $$.Complex.parse("-1i").toString().should.to.be.equal("-i");
      $$.Complex.parse("-12i/17").toString().should.to.be.equal("-12i/17");
      
      $$.Complex.parse("((-23/87)^(-66/78))i").toString().should.to.be.equal("((-23/87)^(-11/13))i");
      $$.Complex.parse("((-23/87)^66)i").toString().should.to.be.equal("((-23/87)^66)i");
      $$.Complex.parse("(-23^(-66/78))i").toString().should.to.be.equal("(-23^(-11/13))i");
      $$.Complex.parse("(-23^66)i").toString().should.to.be.equal("(-23^66)i");
      $$.Complex.parse("-23i").toString().should.to.be.equal("-23i");
      $$.Complex.parse("-23i/87").toString().should.to.be.equal("-23i/87");
      $$.Complex.parse("-i").toString().should.to.be.equal("-i");
  
      $$.Complex.parse("(-23i)").toString().should.to.be.equal("-23i");
      $$.Complex.parse("(-23i/87)").toString().should.to.be.equal("-23i/87");
      $$.Complex.parse("(-i)").toString().should.to.be.equal("-i");

      // -------------
      
      $$.Complex.parse("12/34 + 12i/34").toString().should.to.be.equal("6/17 + 6i/17");
      $$.Complex.parse("2/33 + 2i/33").toString().should.to.be.equal("2/33 + 2i/33");
      $$.Complex.parse("1 + 1i").toString().should.to.be.equal("1 + i");
      $$.Complex.parse("1 + 2i").toString().should.to.be.equal("1 + 2i");
      $$.Complex.parse("-1 + 2i").toString().should.to.be.equal("-1 + 2i");
      $$.Complex.parse("1 + (-1i)").toString().should.to.be.equal("1 + (-i)");
      $$.Complex.parse("-12/17 + (-12i/17)").toString().should.to.be.equal("-12/17 + (-12i/17)");
      
      $$.Complex.parse("(-23/87)^(-66/78) + ((-23/87)^(-66/78))i").toString().should.to.be.equal("(-23/87)^(-11/13) + ((-23/87)^(-11/13))i");
      $$.Complex.parse("(-23/87)^66 + ((-23/87)^66)i").toString().should.to.be.equal("(-23/87)^66 + ((-23/87)^66)i");
      $$.Complex.parse("-23^(-66/78) + (-23^(-66/78))i").toString().should.to.be.equal("-23^(-11/13) + (-23^(-11/13))i");
      $$.Complex.parse("-23^66 + (-23^66)i").toString().should.to.be.equal("-23^66 + (-23^66)i");
      $$.Complex.parse("-23 + (-23i)").toString().should.to.be.equal("-23 + (-23i)");
      $$.Complex.parse("-23/87 + (-23i/87)").toString().should.to.be.equal("-23/87 + (-23i/87)");
      $$.Complex.parse("-1 + (-i)").toString().should.to.be.equal("-1 + (-i)");
    });
    
    it(`#sum()`, function() {
      let a: $$.Complex, b: $$.Complex;
      
      a = $$.Complex.parse("1"); b = $$.Complex.parse("1");
      a.sum(b).toString().should.to.be.equal("2");
      a.sum(b.opp()).toString().should.to.be.equal("0");
      a.subtr(b).toString().should.to.be.equal("0");
      
      a = $$.Complex.parse("-23 + (-23i)"); b = $$.Complex.parse("-23 + (-23i)");
      a.sum(b).toString().should.to.be.equal("-46 + (-46i)");
      a.sum(b.conjugate()).toString().should.to.be.equal("-46");
      a.sum(b.opp()).toString().should.to.be.equal("0");
      a.subtr(b).toString().should.to.be.equal("0");
    });

  });

});
