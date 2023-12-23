/**
 * @author Giuseppe Ferri
 * @license LGPL-3.0
 *
 * Copyright (c) 2021, Giuseppe Ferri <jfinfoit@gmail.com>
 */



import * as $$ from "../lib/index";
import { expect, should } from 'chai';
should();
 
 
 
describe(`Literal`, function() {

  let
    cns: $$.charindexnum[] = [],
    cin: $$.cinopt[] = [],

    x = $$.Literal.x,
    y = $$.Literal.y,
    x_1 = $$.Literal.x_1,
    x_2 = $$.Literal.x_2;

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
    expect(() => $$.Literal.parse("")).to.throw();
    expect(() => $$.Literal.parse("x ")).to.throw();
    expect(() => $$.Literal.parse("x_")).to.throw();
    expect(() => $$.Literal.parse("xy")).to.throw();

    $$.Literal.parse("x").toString().should.to.be.equal("x");
    $$.Literal.parse("x_23").toString().should.to.be.equal("x_23");
    $$.Literal.parse("ψ").toString().should.to.be.equal("ψ");
    $$.Literal.parse("ψ_12").toString().should.to.be.equal("ψ_12");
  });

  it(`#toString()`, function() {
    x.toString().should.to.be.equal("x");
    y.toString().should.to.be.equal("y");
    x_1.toString().should.to.be.equal("x_1");
    x_2.toString().should.to.be.equal("x_2");
  });

});
