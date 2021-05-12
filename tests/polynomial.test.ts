/**
 * @author Giuseppe Ferri
 * @license LGPL-3.0
 *
 * Copyright (c) 2021, Giuseppe Ferri (joeferri83prog@libero.it)
 */



import * as $$ from "../lib/index";
import { expect, should } from 'chai';
should();



describe(`Polynomial`, function() {

  let
    cns: $$.charindexnum[] = [],
    cin: $$.cinopt[] = [],

    p1 = new $$.Polynomial($$.Monomial.z,$$.Monomial.x2,$$.Monomial.x3,$$.Monomial.x,$$.Monomial.y),
    p2 = new $$.Polynomial($$.Monomial.x2,new $$.Monomial(new $$.Complex(new $$.ExpRational(-5)),new $$.ExpLiteral('x',undefined,3)),$$.Monomial.x,$$.Monomial.z,$$.Monomial.y),
    p3 = new $$.Polynomial(
      $$.Monomial.x2,
      new $$.Monomial(new $$.Complex(new $$.ExpRational(-5)),new $$.ExpLiteral('x',undefined,3),$$.ExpLiteral.y,$$.ExpLiteral.z,$$.ExpLiteral.x),
      $$.Monomial.x,
      $$.Monomial.z,
      $$.Monomial.y
    ),
    p4 = new $$.Polynomial($$.Monomial.x),
    p5 = new $$.Polynomial(new $$.Monomial($$.Complex.mone,$$.ExpLiteral.x)),
    
    zero = $$.Polynomial.zero,
    mzero = $$.Polynomial.mzero,
    one = $$.Polynomial.one,
    mone = $$.Polynomial.mone,
    infinity = $$.Polynomial.infinity,
    minfinity = $$.Polynomial.minfinity;

  it(`#value()`, function() {
    expect(zero.value()).to.be.equal(0);
    expect(one.value()).to.be.equal(1);
    expect(mone.value()).to.be.equal(-1);
    expect(infinity.value()).to.be.equal(Infinity);
    expect(minfinity.value()).to.be.equal(-Infinity);
  });

  it(`#equals()`, function() {
    zero.equals(zero).should.to.be.equal(true);
    one.equals(one).should.to.be.equal(true);
    one.equals(mone).should.to.be.equal(false);
    mone.equals(mone).should.to.be.equal(true);
    infinity.equals(infinity).should.to.be.equal(true);
    minfinity.equals(minfinity).should.to.be.equal(true);
  });

  it(`#toString()`, function() {
    zero.toString().should.to.be.equal("0");
    mzero.toString().should.to.be.equal("-0");
    one.toString().should.to.be.equal("1");
    mone.toString().should.to.be.equal("-1");
    infinity.toString().should.to.be.equal("infinity");
    minfinity.toString().should.to.be.equal("-infinity");

    p1.toString().should.to.be.equal("x^3 +x^2 +x +y +z");
    p2.toString().should.to.be.equal("-5⋅x^3 +x^2 +x +y +z");
    p3.toString().should.to.be.equal("-5⋅x^3⋅x⋅y⋅z +x^2 +x +y +z");
    p4.toString().should.to.be.equal("x");
    p5.toString().should.to.be.equal("-x");
  });

});