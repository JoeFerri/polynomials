/**
 * @author Giuseppe Ferri
 * @license LGPL-3.0
 *
 * Copyright (c) 2021, Giuseppe Ferri (joeferri83prog@libero.it)
 */



import * as $$ from "../lib/index";
import { expect, should } from 'chai';
should();



describe(`Monomial`, function() {

  let
    cns: $$.charindexnum[] = [],
    cin: $$.cinopt[] = [],

    x = $$.ExpLiteral.x,
    x2 = new $$.ExpLiteral('x',undefined,2),
    x3 = new $$.ExpLiteral('x',undefined,3),
    y = $$.ExpLiteral.y,
    x_1 = new $$.ExpLiteral('x',1),
    x_2 = new $$.ExpLiteral('x',2),
    x_3 = new $$.ExpLiteral('x',3,5),
    
    z2 = new $$.Complex(new $$.ExpRational(2)),
    zm3 = new $$.Complex(new $$.ExpRational(-3)),
    z23 = new $$.Complex(new $$.ExpRational(2,3)),

    mono1 = new $$.Monomial(z2),                //? 2
    mono2 = new $$.Monomial(zm3),               //? -3
    mono3 = new $$.Monomial(z23),               //? 2/3
    mono4 = new $$.Monomial(z2,x,y),            //? 2⋅x⋅y
    mono5 = new $$.Monomial(zm3,x,x3,x2),       //? -3⋅x^3⋅x^2⋅x
    mono6 = new $$.Monomial(z23,x_1,x_2),       //? 2/3⋅x_1⋅x_2
    mono7 = new $$.Monomial(z23,x_1,x_2,x_3),   //? 2/3⋅x_1⋅x_2⋅x_3^5
    
    zero = $$.Monomial.zero,
    one = $$.Monomial.one,
    mone = $$.Monomial.mone,
    infinity = $$.Monomial.infinity,
    minfinity = $$.Monomial.minfinity;

  it(`#value()`, function() {
    expect(mono1.value()).to.be.equal(2);
    expect(mono2.value()).to.be.equal(-3);
    expect(mono3.value()).to.be.equal(2/3);

    expect(mono4.value()).to.be.undefined;
    expect(mono5.value()).to.be.undefined;
    expect(mono6.value()).to.be.undefined;

    expect(zero.value()).to.be.equal(0);
    expect(one.value()).to.be.equal(1);
    expect(mone.value()).to.be.equal(-1);
    expect(infinity.value()).to.be.equal(Infinity);
    expect(minfinity.value()).to.be.equal(-Infinity);
    
    cns = [['x',0,1],['y',0,2],['x',1,3]];
    expect(mono4.value(cns)).to.be.equal(4); //? 2⋅x⋅y → 2⋅1⋅2 = 4
    cns = [['x',1,1],['x',2,2],['x',0,3]];   //? 2⋅x⋅y → 2⋅3⋅y = undefined
    expect(mono4.value(cns)).to.be.undefined;
    cns = [['x',0,2]];
    expect(mono5.value(cns)).to.be.equal(-192); //? -3⋅x^3⋅x^2⋅x → -3⋅2^3⋅2^2⋅2 = -3⋅8⋅4⋅2 = -192
    cns = [['x',1,1],['x',2,2],['x',0,2]];
    expect(mono5.value(cns)).to.be.equal(-192); //? -3⋅x^3⋅x^2⋅x → -3⋅2^3⋅2^2⋅2 = -3⋅8⋅4⋅2 = -192
    cns = [['x',1,1],['x',2,2],['x',0,3]];
    expect(mono6.value(cns)).to.be.equal(4/3); //? 2/3⋅x_1⋅x_2 → 2/3⋅1⋅2 = 4/3

    cin = [{c:'x',i:0,n:1},{c:'y',n:2},{c:'x',i:1,n:3}];
    expect(mono4.value(cin)).to.be.equal(4); //? 2⋅x⋅y → 2⋅1⋅2 = 4
  });

  it(`#equals()`, function() {
    zero.equals(zero).should.to.be.equal(true);
    one.equals(one).should.to.be.equal(true);
    one.equals(mone).should.to.be.equal(false);
    mone.equals(mone).should.to.be.equal(true);
    infinity.equals(infinity).should.to.be.equal(true);
    minfinity.equals(minfinity).should.to.be.equal(true);

    mono4.equals(mono4).should.to.be.equal(true);
    mono4.equals(mono5).should.to.be.equal(false);
  });

  it(`#toString()`, function() {
    zero.toString().should.to.be.equal("0");
    one.toString().should.to.be.equal("1");
    mone.toString().should.to.be.equal("-1");
    infinity.toString().should.to.be.equal("infinity");
    minfinity.toString().should.to.be.equal("-infinity");

    mono1.toString().should.to.be.equal("2");
    mono2.toString().should.to.be.equal("-3");
    mono3.toString().should.to.be.equal("2/3");
    mono4.toString().should.to.be.equal("2⋅x⋅y");
    mono5.toString().should.to.be.equal("-3⋅x^3⋅x^2⋅x");
    mono6.toString().should.to.be.equal("2/3⋅x_1⋅x_2");
    mono7.toString().should.to.be.equal("2/3⋅x_1⋅x_2⋅x_3^5");
  });

});