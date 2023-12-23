/**
 * @author Giuseppe Ferri
 * @license LGPL-3.0
 *
 * Copyright (c) 2021, Giuseppe Ferri <jfinfoit@gmail.com>
 */



import * as $$ from "../lib/index";
import { expect, should } from 'chai';
should();



describe(`ExpLiteral`, function() {

  let
    cns: $$.charindexnum[] = [],
    cin: $$.cinopt[] = [],

    x = $$.ExpLiteral.x,
    y = $$.ExpLiteral.y,
    x_1 = new $$.ExpLiteral({char: 'x', index: 1}),
    x_2 = new $$.ExpLiteral({char: 'x', index: 2}),
    
    delta = new $$.ExpLiteral({char: $$.gchars.delta, index: 1, exp: 2}),
    alfa = new $$.ExpLiteral({char: $$.gchars.alfa, index: 1, exp: -2}),
    beta = new $$.ExpLiteral({char: $$.gchars.beta, index: 1, exp: new $$.Rational({n: -2, d: 5}) });

  it(`#value()`, function() {
    expect(x.value()).to.be.undefined;
    expect(y.value()).to.be.undefined;
    expect(x_1.value()).to.be.undefined;
    expect(x_2.value()).to.be.undefined;
    
    cns = [['x',0,1],['y',0,2],['x',1,3]];
    expect(x.value(cns)).to.be.equal(1);
    expect(y.value(cns)).to.be.equal(2);
    expect(x_1.value(cns)).to.be.equal(3);
    expect(x_2.value(cns)).to.be.equal(undefined);

    cin = [{c:'x',i:0,n:1},{c:'y',n:2},{c:'x',i:1,n:3}];
    expect(x.value(cin)).to.be.equal(1);
    expect(y.value(cin)).to.be.equal(2);
    expect(x_1.value(cin)).to.be.equal(3);
    expect(x_2.value(cin)).to.be.equal(undefined);
  });

  it(`#equals()`, function() {
    x.equals(x).should.to.be.equal(true);
    x.equals(y).should.to.be.equal(false);
    x.equals(x_1).should.to.be.equal(false);
    x_1.equals(x_1).should.to.be.equal(true);
    x_1.equals(x_2).should.to.be.equal(false);
  });

  it(`#parse()`, function() {
    expect(() => $$.ExpLiteral.parse("")).to.throw();

    $$.ExpLiteral.parse("x_1").toString().should.to.be.equal("x_1");
    $$.ExpLiteral.parse("x_1^3").toString().should.to.be.equal("x_1^3");
    $$.ExpLiteral.parse("x_1^(-3)").toString().should.to.be.equal("x_1^(-3)");
    $$.ExpLiteral.parse("x_1^(12/34)").toString().should.to.be.equal("x_1^(6/17)");
    $$.ExpLiteral.parse("ψ_1^(-12/34)").toString().should.to.be.equal("ψ_1^(-6/17)");
  });

  it(`#toString()`, function() {
    x.toString().should.to.be.equal("x");
    y.toString().should.to.be.equal("y");
    x_1.toString().should.to.be.equal("x_1");
    x_2.toString().should.to.be.equal("x_2");
    
    delta.toString().should.to.be.equal($$.gchars.delta + "_1^2");
    alfa.toString().should.to.be.equal($$.gchars.alfa + "_1^(-2)");
    beta.toString().should.to.be.equal($$.gchars.beta + "_1^(-2/5)");
  });

});
