/**
 * @author Giuseppe Ferri
 * @license LGPL-3.0
 *
 * Copyright (c) 2021, Giuseppe Ferri (joeferri83prog@libero.it)
 */



import * as $$ from "../lib/index";
import { expect, should } from 'chai';
should();



describe(`Complex`, function() {

  $$.Complex.iCode = 0; // set character 'i'

  describe(`like Real`, function() {

    let
      e1    = new $$.Complex(new $$.ExpRational(1,2,undefined,2)),
      e2    = new $$.Complex(new $$.ExpRational(-1,2,undefined,2)),
      e3    = new $$.Complex(new $$.ExpRational(3,2,undefined,2)),
      e4    = new $$.Complex(new $$.ExpRational(-3,2,undefined,3)),
      e5    = new $$.Complex(new $$.ExpRational(2,3,undefined,0)),
      e6    = new $$.Complex(new $$.ExpRational(-2,3,undefined,0)),
      e7    = new $$.Complex(new $$.ExpRational(4,1,undefined,2.5)),
      e8    = new $$.Complex(new $$.ExpRational(4,1,undefined,-2.5)),

      exp1  = new $$.ExpRational(5,2),
      exp2  = new $$.ExpRational(-5,2),
      exp3  = new $$.ExpRational(2),

      ee1   = new $$.Complex(new $$.ExpRational(4,1,undefined,exp1)),
      ee2   = new $$.Complex(new $$.ExpRational(4,1,undefined,exp2)),
      ee3   = new $$.Complex(new $$.ExpRational(4,1,undefined,exp3)),

      r1    = new $$.Complex(new $$.ExpRational(1,2)),
      r2    = new $$.Complex(new $$.ExpRational(2,1)),
      r3    = new $$.Complex(new $$.ExpRational(-1,2)),
      r4    = new $$.Complex(new $$.ExpRational(-1,-2)),
      r5    = new $$.Complex(new $$.ExpRational(-3,-2)),
      r6    = new $$.Complex(new $$.ExpRational(0,2)),
      r7    = new $$.Complex(new $$.ExpRational(2,0)),
      r8    = new $$.Complex(new $$.ExpRational(Infinity,-5)),
      r9    = new $$.Complex(new $$.ExpRational(5,Infinity)),
      
      zero = $$.Complex.zero,
      one = $$.Complex.one,
      mone = $$.Complex.mone,
      infinity = $$.Complex.infinity,
      minfinity = $$.Complex.minfinity;



    it(`#value()`, function() {
      (zero.value()      as number).should.to.be.equal(0);
      (one.value()       as number).should.to.be.equal(1);
      (mone.value()      as number).should.to.be.equal(-1);
      (infinity.value()  as number).should.to.be.equal(Infinity);
      (minfinity.value() as number).should.to.be.equal(-Infinity);

      (e1.value() as number).should.to.be.equal(1/4);
      (e2.value() as number).should.to.be.equal(1/4);
      (e3.value() as number).should.to.be.equal(9/4);
      (e4.value() as number).should.to.be.equal(-27/8);
      (e5.value() as number).should.to.be.equal(1);
      (e6.value() as number).should.to.be.equal(1);
      (e7.value() as number).should.to.be.equal(32);
      (e8.value() as number).should.to.be.equal(1/32);

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
      infinity.toString().should.to.be.equal("infinity");
      minfinity.toString().should.to.be.equal("-infinity");

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
      r7.toString().should.to.be.equal("infinity");
      r8.toString().should.to.be.equal("-infinity");
      r9.toString().should.to.be.equal("0");
    });

  });

  describe(`like Complex`, function() {
    
    let
      c1 = new $$.Complex(new $$.ExpRational(1,2),new $$.ExpRational(1,2)),
      c2 = new $$.Complex(new $$.ExpRational(1,2,undefined,3),new $$.ExpRational(1,2)),
      c3 = new $$.Complex(new $$.ExpRational(1,2,undefined,3),new $$.ExpRational(1,2,undefined,5)),
      c4 = new $$.Complex(new $$.ExpRational(0),new $$.ExpRational(2)),
      c5 = new $$.Complex(new $$.ExpRational(0),new $$.ExpRational(-2)),
      c6 = new $$.Complex(new $$.ExpRational(0,-1),new $$.ExpRational(-2)),
      c7 = new $$.Complex(new $$.ExpRational(5),new $$.ExpRational(1)),
      c8 = new $$.Complex(new $$.ExpRational(5),new $$.ExpRational(-1)),

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
      
      c1.toString().should.to.be.equal("1/2 +1/2i");
      c2.toString().should.to.be.equal("(1/2)^3 +1/2i");
      c3.toString().should.to.be.equal("(1/2)^3 +(1/2)^5i");
      c4.toString().should.to.be.equal("2i");
      c5.toString().should.to.be.equal("-2i");
      c6.toString().should.to.be.equal("-2i");
      c7.toString().should.to.be.equal("5 +i");
      c8.toString().should.to.be.equal("5 -i");
    });

  });


});