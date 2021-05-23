/**
 * @author Giuseppe Ferri
 * @license LGPL-3.0
 *
 * Copyright (c) 2021, Giuseppe Ferri (joeferri83prog@libero.it)
 */



import * as $$ from "../lib/index";
import { expect, should } from 'chai';
should();



describe(`ImaginaryPart`, function() {

  let
    zero = $$.ImaginaryPart.zero,
    one = $$.ImaginaryPart.one,
    mone = $$.ImaginaryPart.mone,
    infinity = $$.ImaginaryPart.infinity,
    minfinity = $$.ImaginaryPart.minfinity;


    

  it(`#parse()`, function() {
    expect(() => $$.ImaginaryPart.parse("")).to.throw();
    expect(() => $$.ImaginaryPart.parse(" 2i")).to.throw();
    expect(() => $$.ImaginaryPart.parse("2i ")).to.throw();
    expect(() => $$.ImaginaryPart.parse("2i/")).to.throw();
    expect(() => $$.ImaginaryPart.parse("2x")).to.throw();
    expect(() => $$.ImaginaryPart.parse("2i/2x")).to.throw();

    $$.ImaginaryPart.parse("12i/34").toString().should.to.be.equal("6i/17");
    $$.ImaginaryPart.parse("2i/33").toString().should.to.be.equal("2i/33");
    $$.ImaginaryPart.parse("1i").toString().should.to.be.equal("i");
    $$.ImaginaryPart.parse("-1i").toString().should.to.be.equal("-i");
    $$.ImaginaryPart.parse("-12i/17").toString().should.to.be.equal("-12i/17");
    
    $$.ImaginaryPart.parse("(-23i/87)^(-66/78)").toString().should.to.be.equal("(-23i/87)^(-11/13)");
    $$.ImaginaryPart.parse("(-23i/87)^66").toString().should.to.be.equal("(-23i/87)^66");
    $$.ImaginaryPart.parse("-23i^(-66/78)").toString().should.to.be.equal("-23i^(-11/13)");
    $$.ImaginaryPart.parse("-23i^66").toString().should.to.be.equal("-23i^66");
    $$.ImaginaryPart.parse("-23i").toString().should.to.be.equal("-23i");
    $$.ImaginaryPart.parse("-23i/87").toString().should.to.be.equal("-23i/87");
    $$.ImaginaryPart.parse("-i").toString().should.to.be.equal("-i");

    $$.ImaginaryPart.parse("(-23i)").toString().should.to.be.equal("-23i");
    $$.ImaginaryPart.parse("(-23i/87)").toString().should.to.be.equal("-23i/87");
    $$.ImaginaryPart.parse("(-i)").toString().should.to.be.equal("-i");
  });

  it(`#toString()`, function() {
    zero.toString().should.to.be.equal("0i");
    one.toString().should.to.be.equal("i");
    mone.toString().should.to.be.equal("-i");
    infinity.toString().should.to.be.equal("ComplexInfinity");
    minfinity.toString().should.to.be.equal("-ComplexInfinity");
  });

});