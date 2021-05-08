/**
 * @author Giuseppe Ferri
 * @license LGPL-3.0
 *
 * Copyright (c) 2021, Giuseppe Ferri (joeferri83prog@libero.it)
 */



import * as $$ from "../lib/index";
import { expect, should } from 'chai';
should();


 
describe(`ExpRational`, function() {

  let
    e1 = new $$.ExpRational(1,2,undefined,2),
    e2 = new $$.ExpRational(-1,2,undefined,2),
    e3 = new $$.ExpRational(3,2,undefined,2),
    e4 = new $$.ExpRational(-3,2,undefined,3),
    e5 = new $$.ExpRational(2,3,undefined,0),
    e6 = new $$.ExpRational(-2,3,undefined,0),
    e7 = new $$.ExpRational(4,1,undefined,2.5),
    e8 = new $$.ExpRational(4,1,undefined,-2.5),

    exp1 = new $$.ExpRational(5,2),
    exp2 = new $$.ExpRational(-5,2),
    exp3 = new $$.ExpRational(2),

    ee1 = new $$.ExpRational(4,1,undefined,exp1),
    ee2 = new $$.ExpRational(4,1,undefined,exp2),
    ee3 = new $$.ExpRational(4,1,undefined,exp3),

    r1 = new $$.ExpRational(1,2),
    r2 = new $$.ExpRational(2,1),
    r3 = new $$.ExpRational(-1,2),
    r4 = new $$.ExpRational(-1,-2),
    r5 = new $$.ExpRational(-3,-2),
    r6 = new $$.ExpRational(0,2),
    r7 = new $$.ExpRational(2,0),
    r8 = new $$.ExpRational(Infinity,-5),
    r9 = new $$.ExpRational(5,Infinity),
    
    zero = $$.ExpRational.zero,
    one = $$.ExpRational.one,
    mone = $$.ExpRational.mone,
    infinity = $$.ExpRational.infinity,
    minfinity = $$.ExpRational.minfinity;


    
  it(`#constructor()`, function() {
    expect(() => new $$.ExpRational(0,0)).to.throw();
    expect(() => new $$.ExpRational(Infinity,Infinity)).to.throw();
    expect(() => new $$.ExpRational(-Infinity,-Infinity)).to.throw();
    expect(() => new $$.ExpRational(-Infinity,Infinity)).to.throw();
    expect(() => new $$.ExpRational(Infinity,-Infinity)).to.throw();
  });

  it(`#value()`, function() {
    zero.value().should.to.be.equal(0);
    one.value().should.to.be.equal(1);
    mone.value().should.to.be.equal(-1);
    infinity.value().should.to.be.equal(Infinity);
    minfinity.value().should.to.be.equal(-Infinity);

    e1.value().should.to.be.equal(1/4);
    e2.value().should.to.be.equal(1/4);
    e3.value().should.to.be.equal(9/4);
    e4.value().should.to.be.equal(-27/8);
    e5.value().should.to.be.equal(1);
    e6.value().should.to.be.equal(1);
    e7.value().should.to.be.equal(32);
    e8.value().should.to.be.equal(1/32);

    ee1.value().should.to.be.equal(32);
    ee2.value().should.to.be.equal(1/32);
    ee3.value().should.to.be.equal(16);

    r1.value().should.to.be.equal(1/2);
    r2.value().should.to.be.equal(2);
    r3.value().should.to.be.equal(-1/2);
    r4.value().should.to.be.equal(1/2);
    r5.value().should.to.be.equal(3/2);
    r6.value().should.to.be.equal(0);
    r7.value().should.to.be.equal(Infinity);
    r8.value().should.to.be.equal(-Infinity);
    r9.value().should.to.be.equal(0);
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