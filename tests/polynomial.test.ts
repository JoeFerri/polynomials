/**
 * @author Giuseppe Ferri
 * @license LGPL-3.0
 *
 * Copyright (c) 2021, Giuseppe Ferri <jfinfoit@gmail.com>
 */



import * as $$ from "../lib/index";
import { expect, should } from 'chai';
should();



describe(`Polynomial`, function() {

  let
    cns: $$.charindexnum[] = [],
    cin: $$.cinopt[] = [],

    p1 = new $$.Polynomial({monomials: [$$.Monomial.z,$$.Monomial.x2,$$.Monomial.x3,$$.Monomial.x,$$.Monomial.y]}),

    p2 = new $$.Polynomial(
      {
        monomials: [
          $$.Monomial.x2,
          new $$.Monomial(
            {
              z: new $$.Complex({a: new $$.RealPart({n: -5})}),
              literals: [new $$.ExpLiteral({char: 'x', exp: 3})]
            }),
          $$.Monomial.x,
          $$.Monomial.z,
          $$.Monomial.y
        ]
      }
    ),

    p3 = new $$.Polynomial(
      {
        monomials: [
          $$.Monomial.x2,
          new $$.Monomial({
            z: new $$.Complex({a: new $$.RealPart({n: -5}) }),
            literals: [new $$.ExpLiteral({char: 'x', exp: 3}),$$.ExpLiteral.y,$$.ExpLiteral.z,$$.ExpLiteral.x]
            }),
          $$.Monomial.x,
          $$.Monomial.z,
          $$.Monomial.y
        ]
      }
    ),

    p4 = new $$.Polynomial({monomials: [$$.Monomial.x]}),
    p5 = new $$.Polynomial({monomials: [new $$.Monomial({z: $$.Complex.mone, literals: [$$.ExpLiteral.x]})]}),
    
    zero = $$.Polynomial.zero,
    // mzero = $$.Polynomial.mzero,
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

  it(`#parse()`, function() {
    expect(() => $$.Polynomial.parse("")).to.throw();

    $$.Polynomial.parse("1").toString().should.to.be.equal("1");
    $$.Polynomial.parse("-1").toString().should.to.be.equal("-1");
    $$.Polynomial.parse("-1 + 2i").toString().should.to.be.equal("-1 + 2i");
    $$.Polynomial.parse("2i").toString().should.to.be.equal("2i");
    $$.Polynomial.parse("x_1").toString().should.to.be.equal("x_1");
    $$.Polynomial.parse("+x_1").toString().should.to.be.equal("x_1");
    $$.Polynomial.parse("-x_1").toString().should.to.be.equal("-x_1");
    $$.Polynomial.parse("+x^2 -5x^3xyz +x +z +y").toString().should.to.be.equal("-5x^3xyz +x^2 +x +y +z");
    $$.Polynomial.parse("+x^2 -x +x^3").toString().should.to.be.equal("x^3 +x^2 -x");
    
    $$.Polynomial.parse("+x^2 -5x^3zxy +x +2y +z -2z +y").toString().should.to.be.equal("-5x^3xyz +x^2 +x +3y -z");
    $$.Polynomial.parse("x +2y +y").toString().should.to.be.equal("x +3y");
  });

  it(`#toString()`, function() {
    zero.toString().should.to.be.equal("0");
    one.toString().should.to.be.equal("1");
    mone.toString().should.to.be.equal("-1");
    infinity.toString().should.to.be.equal("Infinity");
    minfinity.toString().should.to.be.equal("-Infinity");

    p1.toString().should.to.be.equal("x^3 +x^2 +x +y +z");
    p2.toString().should.to.be.equal("-5x^3 +x^2 +x +y +z");
    p3.toString().should.to.be.equal("-5x^3xyz +x^2 +x +y +z");
    p4.toString().should.to.be.equal("x");
    p5.toString().should.to.be.equal("-x");

    $$.Polynomial.parse("(-23 + (-23i))xy").toString().should.to.be.equal("(-23 + (-23i))xy");
    $$.Polynomial.parse("(-23 + (-23i))yx").toString().should.to.be.equal("(-23 + (-23i))xy");
  });
    
  it(`#sum()`, function() {
    let a: $$.Polynomial, b: $$.Polynomial;
    
    a = $$.Polynomial.parse("1"); b = $$.Polynomial.parse("1");
    a.sum(b).toString().should.to.be.equal("2");
    a.sum(b.opp()).toString().should.to.be.equal("0");
    a.subtr(b).toString().should.to.be.equal("0");
    
    a = $$.Polynomial.parse("-23 + (-23i)"); b = $$.Polynomial.parse("-23 + (-23i)");
    a.sum(b).toString().should.to.be.equal("-46 + (-46i)");
    a.sum(b.opp()).toString().should.to.be.equal("0");
    a.subtr(b).toString().should.to.be.equal("0");
    
    a = $$.Polynomial.parse("x"); b = $$.Polynomial.parse("x");
    a.sum(b).toString().should.to.be.equal("2x");
    a.sum(b.opp()).toString().should.to.be.equal("0");
    a.subtr(b).toString().should.to.be.equal("0");
    
    a = $$.Polynomial.parse("(-23 + (-23i))xy"); b = $$.Polynomial.parse("(-23 + (-23i))xy");
    a.sum(b).toString().should.to.be.equal("(-46 + (-46i))xy");
    a.sum(b.opp()).toString().should.to.be.equal("0");
    a.subtr(b).toString().should.to.be.equal("0");
    
    a = $$.Polynomial.parse("(-2 + (-3i))xy"); b = $$.Polynomial.parse("(-2 + 3i)xy");
    a.sum(b).toString().should.to.be.equal("-4xy");
    a.sum(b.opp()).toString().should.to.be.equal("-6ixy");
    a.subtr(b).toString().should.to.be.equal("-6ixy");
    
    a = $$.Polynomial.parse("(-2 + (-3i))xy +2xy +iyx"); b = $$.Polynomial.parse("(-2 + 3i)xy -y");
    a.sum(b).toString().should.to.be.equal("(-2 + i)xy -y");
    a.sum(b.opp()).toString().should.to.be.equal("(2 + (-5i))xy +y");
    a.subtr(b).toString().should.to.be.equal("(2 + (-5i))xy +y");
    a.sum(b.conjugate()).toString().should.to.be.equal("(-2 + (-5i))xy -y");
  });

});
