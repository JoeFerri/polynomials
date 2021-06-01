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
    x2 = new $$.ExpLiteral({char: 'x', exp: 2}),
    x3 = new $$.ExpLiteral({char: 'x', exp: 3}),
    y = $$.ExpLiteral.y,
    x_1 = new $$.ExpLiteral({char: 'x', index: 1}),
    x_2 = new $$.ExpLiteral({char: 'x', index: 2}),
    x_3 = new $$.ExpLiteral({char: 'x', index: 3, exp: 5}),
    
    z2  = new $$.Complex({a: new $$.RealPart({n: 2}) }),
    zm3 = new $$.Complex({a: new $$.RealPart({n: -3}) }),
    z23 = new $$.Complex({a: new $$.RealPart({n: 2, d: 3}) }),

    mono1 = new $$.Monomial({z: z2}),                           //? 2
    mono2 = new $$.Monomial({z: zm3}),                          //? -3
    mono3 = new $$.Monomial({z: z23}),                          //? 2/3
    mono4 = new $$.Monomial({z: z2, literals: [x,y]}),          //? 2⋅x⋅y
    mono5 = new $$.Monomial({z: zm3, literals: [x,x3,x2]}),     //? -3⋅x^3⋅x^2⋅x = -3^6
    mono6 = new $$.Monomial({z: z23, literals: [x_1,x_2]}),     //? 2/3⋅x_1⋅x_2
    mono7 = new $$.Monomial({z: z23, literals: [x_1,x_2,x_3]}), //? 2/3⋅x_1⋅x_2⋅x_3^5
    
    mono8 = new $$.Monomial({z: z23, literals: [x,y, $$.ExpLiteral.parse("z^(-2/3)")]}), //? (2/3)xyz^(-2/3)
    
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

  it(`#parse()`, function() {
    expect(() => $$.Monomial.parse("")).to.throw();

    $$.Monomial.parse("ixy").toString().should.to.be.equal("ixy");
    $$.Monomial.parse("1ixy").toString().should.to.be.equal("ixy");
    $$.Monomial.parse("-ixy").toString().should.to.be.equal("-ixy");
    $$.Monomial.parse("-1ixy").toString().should.to.be.equal("-ixy");

    $$.Monomial.parse("+x_1").toString().should.to.be.equal("x_1");
    $$.Monomial.parse("-x_1").toString().should.to.be.equal("-x_1");

    $$.Monomial.parse("x_1^3").toString().should.to.be.equal("x_1^3");
    $$.Monomial.parse("x_1^(-3)").toString().should.to.be.equal("x_1^(-3)");
    $$.Monomial.parse("x_1^(12/34)").toString().should.to.be.equal("x_1^(6/17)");
    $$.Monomial.parse("ψ_1^(-12/34)").toString().should.to.be.equal("ψ_1^(-6/17)");

    $$.Monomial.parse("2x_1").toString().should.to.be.equal("2x_1");

    let strin = "((-23/87)^(-11/13) + ((-23/87)^(-11/13))i)xyf^(-2/3)k_3d";
    let strout = "((-23/87)^(-11/13) + ((-23/87)^(-11/13))i)df^(-2/3)k_3xy";
    $$.Monomial.parse(strin).toString().should.to.be.equal(strout);
    
    $$.Monomial.parse("(-23 + (-23i))xy").toString().should.to.be.equal("(-23 + (-23i))xy");
    $$.Monomial.parse("(1 + 23i)xy").toString().should.to.be.equal("(1 + 23i)xy");
    $$.Monomial.parse("-23ixy").toString().should.to.be.equal("-23ixy");
  });
  
  it(`#toString()`, function() {
    zero.toString().should.to.be.equal("0");
    one.toString().should.to.be.equal("1");
    mone.toString().should.to.be.equal("-1");
    infinity.toString().should.to.be.equal("Infinity");
    minfinity.toString().should.to.be.equal("-Infinity");

    mono1.toString().should.to.be.equal("2");
    mono2.toString().should.to.be.equal("-3");
    mono3.toString().should.to.be.equal("2/3");
    mono4.toString().should.to.be.equal("2xy");
    mono5.toString().should.to.be.equal("-3x^6");
    mono6.toString().should.to.be.equal("(2/3)x_1x_2");
    mono7.toString().should.to.be.equal("(2/3)x_1x_2x_3^5");
    mono8.toString().should.to.be.equal("(2/3)xyz^(-2/3)");
  });

  it.only(`#prod() #div() #recpr()`, function() {
    let a: $$.Monomial, b: $$.Monomial;
    
    a = $$.Monomial.parse("1"); b = $$.Monomial.parse("1");
    a.prod(b).toString().should.to.be.equal("1");
    a.div(b).toString().should.to.be.equal("1");
    a.recpr().toString().should.to.be.equal("1");
    
    a = $$.Monomial.parse("x");
    a.recpr().toString().should.to.be.equal("x^(-1)");
    
    a = $$.Monomial.parse("2xyz"); b = $$.Monomial.parse("xy");
    a.prod(b).toString().should.to.be.equal("2x^2y^2z");
    a.div(b).toString().should.to.be.equal("2z");
    b.div(a).toString().should.to.be.equal("(1/2)z^(-1)");
    a.recpr().toString().should.to.be.equal("(1/2)x^(-1)y^(-1)z^(-1)");
    
    a = $$.Monomial.parse("1"); b = $$.Monomial.parse("yyx");
    a.prod(b).toString().should.to.be.equal("xy^2");
    a.div(b).toString().should.to.be.equal("x^(-1)y^(-2)");
    
    a = $$.Monomial.parse("xy"); b = $$.Monomial.parse("yx");
    a.prod(b).toString().should.to.be.equal("x^2y^2");
    a.div(b).toString().should.to.be.equal("1");
    
    a = $$.Monomial.parse("-xy"); b = $$.Monomial.parse("yx");
    a.prod(b).toString().should.to.be.equal("-x^2y^2");
    a.div(b).toString().should.to.be.equal("-1");
    
    a = $$.Monomial.parse("-xy"); b = $$.Monomial.parse("-yx");
    a.prod(b).toString().should.to.be.equal("x^2y^2");
    a.div(b).toString().should.to.be.equal("1");
    
    a = $$.Monomial.parse("0"); b = $$.Monomial.parse("xy");
    a.prod(b).toString().should.to.be.equal("0");
    a.div(b).toString().should.to.be.equal("0");
    b.div(a).toString().should.to.be.equal("Infinity");
  });

});