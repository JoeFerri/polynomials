/**
 * @author Giuseppe Ferri
 * @license LGPL-3.0
 *
 * Copyright (c) 2021, Giuseppe Ferri (joeferri83prog@libero.it)
 */



import * as $$ from "../lib/index";
import { expect, should } from 'chai';
should();



describe(`Rational`, function() {

  let
    r1 = new $$.Rational(1,2),
    r2 = new $$.Rational(2,1),
    r3 = new $$.Rational(-1,2),
    r4 = new $$.Rational(-1,-2),
    r5 = new $$.Rational(-3,-2),
    r6 = new $$.Rational(0,2),
    r7 = new $$.Rational(2,0),
    r8 = new $$.Rational(Infinity,-5),
    r9 = new $$.Rational(5,Infinity),
    
    zero = $$.Rational.zero,
    one = $$.Rational.one,
    mone = $$.Rational.mone,
    infinity = $$.Rational.infinity,
    minfinity = $$.Rational.minfinity;

  it(`#constructor()`, function() {
    expect(() => new $$.Rational(0,0)).to.throw();
    expect(() => new $$.Rational(Infinity,Infinity)).to.throw();
    expect(() => new $$.Rational(-Infinity,-Infinity)).to.throw();
    expect(() => new $$.Rational(-Infinity,Infinity)).to.throw();
    expect(() => new $$.Rational(Infinity,-Infinity)).to.throw();
  });

  it(`#value()`, function() {
    zero.value().should.to.be.equal(0);
    one.value().should.to.be.equal(1);
    mone.value().should.to.be.equal(-1);
    infinity.value().should.to.be.equal(Infinity);
    minfinity.value().should.to.be.equal(-Infinity);

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