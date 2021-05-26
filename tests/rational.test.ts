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
    m1 = new $$.Rational({n:  1, d:  2}),
    m2 = new $$.Rational({n:  2, d:  4}),
    m3 = new $$.Rational({n: -2, d: -4}),
    m4 = new $$.Rational({n:  2, d:  3}),
    m5 = new $$.Rational({n:  4, d:  6}),
    m6 = new $$.Rational({n: -4, d: -6}),
    m7 = new $$.Rational({n: 20, d: 30}),
    r1 = new $$.Rational({n:  1, d:  2}),
    r2 = new $$.Rational({n:  2, d:  1}),
    r3 = new $$.Rational({n: -1, d:  2}),
    r4 = new $$.Rational({n: -1, d: -2}),
    r5 = new $$.Rational({n: -3, d: -2}),
    r6 = new $$.Rational({n:  0, d:  2}),
    r7 = new $$.Rational({n:  2, d:  0}),
    r8 = new $$.Rational({n: Infinity, d: -5}),
    r9 = new $$.Rational({n: 5, d: Infinity}),

    z1 = new $$.Rational({n: 0, d: -2}),
    z2 = new $$.Rational({n: -2, d: Infinity}),
    
    zero = $$.Rational.zero,
    one = $$.Rational.one,
    mone = $$.Rational.mone,
    infinity = $$.Rational.infinity,
    minfinity = $$.Rational.minfinity;

  it(`#parse()`, function() {
    expect(() => $$.Rational.parse("")).to.throw();
    expect(() => $$.Rational.parse(" 2")).to.throw();
    expect(() => $$.Rational.parse("2 ")).to.throw();
    expect(() => $$.Rational.parse("2/")).to.throw();
    expect(() => $$.Rational.parse("2x")).to.throw();
    expect(() => $$.Rational.parse("2/2x")).to.throw();

    $$.Rational.parse("+12").toString().should.to.be.equal("12");
    $$.Rational.parse("+12/34").toString().should.to.be.equal("6/17");

    $$.Rational.parse("12/34").toString().should.to.be.equal("6/17");
    $$.Rational.parse("2/33").toString().should.to.be.equal("2/33");
    $$.Rational.parse("1").toString().should.to.be.equal("1");
    $$.Rational.parse("-1").toString().should.to.be.equal("-1");
    $$.Rational.parse("-12/17").toString().should.to.be.equal("-12/17");
  });

  it(`#constructor()`, function() {
    expect(() => new $$.Rational({n: 0, d: 0})).to.throw();
    expect(() => new $$.Rational({n:  Infinity, d:  Infinity})).to.throw();
    expect(() => new $$.Rational({n: -Infinity, d: -Infinity})).to.throw();
    expect(() => new $$.Rational({n: -Infinity, d:  Infinity})).to.throw();
    expect(() => new $$.Rational({n:  Infinity, d: -Infinity})).to.throw();
  });

  it(`#value()`, function() {
    zero.value().should.to.be.equal(0);
    one.value().should.to.be.equal(1);
    mone.value().should.to.be.equal(-1);
    infinity.value().should.to.be.equal(Infinity);
    minfinity.value().should.to.be.equal(-Infinity);

    z1.value().should.to.be.equal(0);
    z2.value().should.to.be.equal(0);
    // z1.s.should.to.be.equal($$.Sign.minus);
    // z2.s.should.to.be.equal($$.Sign.minus);

    r1.value().should.to.be.equal(1/2);
    r2.value().should.to.be.equal(2);
    r3.value().should.to.be.equal(-1/2);
    r4.value().should.to.be.equal(1/2);
    r5.value().should.to.be.equal(3/2);
    r6.value().should.to.be.equal(0);
    r7.value().should.to.be.equal(Infinity);
    r8.value().should.to.be.equal(-Infinity);
    r9.value().should.to.be.equal(0);
    
    m1.value().should.to.be.equal(1/2);
    m2.value().should.to.be.equal(1/2);
    m3.value().should.to.be.equal(1/2);
    
    m4.value().should.to.be.equal(2/3);
    m5.value().should.to.be.equal(2/3);
    m6.value().should.to.be.equal(2/3);
    m7.value().should.to.be.equal(2/3);
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

    m1.equals(m1).should.to.be.equal(true);
    m1.equals(m2).should.to.be.equal(true);
    m1.equals(m3).should.to.be.equal(true);
    m4.equals(m4).should.to.be.equal(true);
    m4.equals(m5).should.to.be.equal(true);
    m4.equals(m6).should.to.be.equal(true);
    m4.equals(m7).should.to.be.equal(true);
  });

  it(`#toString()`, function() {
    zero.toString().should.to.be.equal("0");
    one.toString().should.to.be.equal("1");
    mone.toString().should.to.be.equal("-1");
    infinity.toString().should.to.be.equal("Infinity");
    minfinity.toString().should.to.be.equal("-Infinity");
    
    // z1.toString().should.to.be.equal("-0");
    // z2.toString().should.to.be.equal("-0");

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