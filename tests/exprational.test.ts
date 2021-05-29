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
    e1 = new $$.ExpRational({n:  1, d: 2, exp: 2}),
    e2 = new $$.ExpRational({n: -1, d: 2, exp: 2}),
    e3 = new $$.ExpRational({n:  3, d: 2, exp: 2}),
    e4 = new $$.ExpRational({n: -3, d: 2, exp: 3}),
    e5 = new $$.ExpRational({n:  2, d: 3, exp: 0}),
    e6 = new $$.ExpRational({n: -2, d: 3, exp: 0}),
    // e7 = new $$.ExpRational(4,1,undefined,2.5), // TODO
    // e8 = new $$.ExpRational(4,1,undefined,-2.5), // TODO
    e9 = new $$.ExpRational({n: 1, d: 2, exp: -2}),

    exp1 = new $$.Rational({n: 5, d: 2}),
    exp2 = new $$.Rational({n: -5, d: 2}),
    exp3 = new $$.Rational({n: 2}),

    exp4 = new $$.Rational({n: 0, d: -2}),
    e0  = new $$.ExpRational({n: 1, d: 2, exp: exp4}),

    ee1 = new $$.ExpRational({n: 4, d: 1, exp: exp1}),
    ee2 = new $$.ExpRational({n: 4, d: 1, exp: exp2}),
    ee3 = new $$.ExpRational({n: 4, d: 1, exp: exp3}),

    r1 = new $$.ExpRational({n:  1, d:  2}),
    r2 = new $$.ExpRational({n:  2, d:  1}),
    r3 = new $$.ExpRational({n: -1, d:  2}),
    r4 = new $$.ExpRational({n: -1, d: -2}),
    r5 = new $$.ExpRational({n: -3, d: -2}),
    r6 = new $$.ExpRational({n:  0, d:  2}),
    r7 = new $$.ExpRational({n:  2, d:  0}),
    r8 = new $$.ExpRational({n: Infinity, d: -5}),
    r9 = new $$.ExpRational({n: 5, d: Infinity}),
    
    zero = $$.ExpRational.zero,
    one = $$.ExpRational.one,
    mone = $$.ExpRational.mone,
    infinity = $$.ExpRational.infinity,
    minfinity = $$.ExpRational.minfinity;


    

  it(`#parse()`, function() {
    expect(() => $$.ExpRational.parse("")).to.throw();
    expect(() => $$.ExpRational.parse(" 2")).to.throw();
    expect(() => $$.ExpRational.parse("2 ")).to.throw();
    expect(() => $$.ExpRational.parse("2/")).to.throw();
    expect(() => $$.ExpRational.parse("2x")).to.throw();
    expect(() => $$.ExpRational.parse("2/2x")).to.throw();

    $$.ExpRational.parse("+12").toString().should.to.be.equal("12");
    $$.ExpRational.parse("+12/34").toString().should.to.be.equal("6/17");

    $$.ExpRational.parse("12/34").toString().should.to.be.equal("6/17");
    $$.ExpRational.parse("2/33").toString().should.to.be.equal("2/33");
    $$.ExpRational.parse("1").toString().should.to.be.equal("1");
    $$.ExpRational.parse("-1").toString().should.to.be.equal("-1");
    $$.ExpRational.parse("-12/17").toString().should.to.be.equal("-12/17");
    
    $$.ExpRational.parse("(-23/87)^(-66/78)").toString().should.to.be.equal("(-23/87)^(-11/13)");
    $$.ExpRational.parse("(-23/87)^66").toString().should.to.be.equal("(-23/87)^66");
    $$.ExpRational.parse("-23^(-66/78)").toString().should.to.be.equal("-23^(-11/13)");
    $$.ExpRational.parse("-23^66").toString().should.to.be.equal("-23^66");
  });

  it(`#constructor()`, function() {
    expect(() => new $$.ExpRational({n: 0, d: 0})).to.throw();
    expect(() => new $$.ExpRational({n:  Infinity, d:  Infinity})).to.throw();
    expect(() => new $$.ExpRational({n: -Infinity, d: -Infinity})).to.throw();
    expect(() => new $$.ExpRational({n: -Infinity, d:  Infinity})).to.throw();
    expect(() => new $$.ExpRational({n:  Infinity, d: -Infinity})).to.throw();
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
    // e7.value().should.to.be.equal(32); // TODO
    // e8.value().should.to.be.equal(1/32); // TODO

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
    infinity.toString().should.to.be.equal("Infinity");
    minfinity.toString().should.to.be.equal("-Infinity");

    e1.toString().should.to.be.equal("(1/2)^2");
    e2.toString().should.to.be.equal("(-1/2)^2");
    e3.toString().should.to.be.equal("(3/2)^2");
    e4.toString().should.to.be.equal("(-3/2)^3");
    e5.toString().should.to.be.equal("(2/3)^0");
    e6.toString().should.to.be.equal("(-2/3)^0");
    e9.toString().should.to.be.equal("(1/2)^(-2)");

    e0.toString().should.to.be.equal("(1/2)^0");
    
    ee1.toString().should.to.be.equal("4^(5/2)");
    ee2.toString().should.to.be.equal("4^(-5/2)");
    ee3.toString().should.to.be.equal("4^2");

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

  it(`#sum()`, function() {
    let a: $$.ExpRational, b: $$.ExpRational;
    
    a = $$.ExpRational.parse("1"); b = $$.ExpRational.parse("1");
    a.sum(b).toString().should.to.be.equal("2");
    a.sum(b.opp()).toString().should.to.be.equal("0");
    a.subtr(b).toString().should.to.be.equal("0");
    
    a = $$.ExpRational.parse("-1"); b = $$.ExpRational.parse("-1");
    a.sum(b).toString().should.to.be.equal("-2");
    a.sum(b.opp()).toString().should.to.be.equal("0");
    a.subtr(b).toString().should.to.be.equal("0");
    
    a = $$.ExpRational.parse("1"); b = $$.ExpRational.parse("-1");
    a.sum(b).toString().should.to.be.equal("0");
    
    a = $$.ExpRational.parse("2/3"); b = $$.ExpRational.parse("-3/6");
    a.sum(b).toString().should.to.be.equal("1/6");
    a.subtr(b).toString().should.to.be.equal("7/6");
    
    a = $$.ExpRational.parse("211/210"); b = $$.ExpRational.parse("211/2310");
    a.sum(b).toString().should.to.be.equal("422/385");
    a.sum(b.opp()).toString().should.to.be.equal("211/231");
    a.subtr(b).toString().should.to.be.equal("211/231");
    
    a = $$.ExpRational.parse("(2/3)^2"); b = $$.ExpRational.parse("-2^3");
    a.sum(b).toString().should.to.be.equal("-68/9");
    
    a = $$.ExpRational.parse("(1/3)^2"); b = $$.ExpRational.parse("-2^(-3)");
    a.sum(b).toString().should.to.be.equal("-1/72");
    
    //? I take into account the approximation
    a = $$.ExpRational.parse("(1/3)^2"); b = $$.ExpRational.parse("-4^(1/3)");
    a.sum(b).value().toString().slice(0,12).should.to.be.equal("-1.476289940"); // -1.4762899408570882

    //? I take into account the approximation
    a = $$.ExpRational.parse("(1/3)^2"); b = $$.ExpRational.parse("4^(1/3)");
    a.sum(b).value().toString().slice(0,12).should.to.be.equal("1.6985121630"); // 1.6985121630793105
  });

  it(`#prod()`, function() {
    let a: $$.ExpRational, b: $$.ExpRational;
    
    a = $$.ExpRational.parse("1"); b = $$.ExpRational.parse("1");
    a.prod(b).toString().should.to.be.equal("1");
    
    a = $$.ExpRational.parse("-1"); b = $$.ExpRational.parse("1");
    a.prod(b).toString().should.to.be.equal("-1");
    
    a = $$.ExpRational.parse("2"); b = $$.ExpRational.parse("1");
    a.prod(b).toString().should.to.be.equal("2");
    
    a = $$.ExpRational.parse("1"); b = $$.ExpRational.parse("0");
    a.prod(b).toString().should.to.be.equal("0");
    
    a = $$.ExpRational.parse("0"); b = $$.ExpRational.parse("0");
    a.prod(b).toString().should.to.be.equal("0");
    
    a = $$.ExpRational.parse("1/2"); b = $$.ExpRational.parse("2/3");
    a.prod(b).toString().should.to.be.equal("1/3");
    
    a = $$.ExpRational.parse("-1/2"); b = $$.ExpRational.parse("2/3");
    a.prod(b).toString().should.to.be.equal("-1/3");
    
    a = $$.ExpRational.parse("-1/2"); b = $$.ExpRational.parse("-2/3");
    a.prod(b).toString().should.to.be.equal("1/3");
    
    a = $$.ExpRational.parse("(1/2)^2"); b = $$.ExpRational.parse("2/3");
    a.prod(b).toString().should.to.be.equal("1/6");
    
    //? I take into account the approximation
    a = $$.ExpRational.parse("(1/2)^(2/3)"); b = $$.ExpRational.parse("2/3");
    a.prod(b).value().toString().slice(0,9).should.to.be.equal("0.4199736"); // 0.4199736833
    
    a = $$.ExpRational.parse("(1/2)^2"); b = $$.ExpRational.parse("2/3");
    a.div(b).toString().should.to.be.equal("3/8");
    
    a = $$.ExpRational.parse("(1/2)^2"); b = $$.ExpRational.parse("(2/3)^3");
    a.div(b).toString().should.to.be.equal("27/32");
    
    a = $$.ExpRational.parse("(2/3)^3"); b = $$.ExpRational.parse("(2/3)^2");
    a.prod(b).toString().should.to.be.equal("(2/3)^5");
    
    a = $$.ExpRational.parse("(2/3)^3"); b = $$.ExpRational.parse("(2/3)^2");
    a.div(b).toString().should.to.be.equal("2/3");
    
    a = $$.ExpRational.parse("(2/3)^5"); b = $$.ExpRational.parse("(2/3)^2");
    a.div(b).toString().should.to.be.equal("(2/3)^3");
    
    a = $$.ExpRational.parse("(2/3)^3"); b = $$.ExpRational.parse("(2/3)^(-2)");
    a.prod(b).toString().should.to.be.equal("2/3");
    
    a = $$.ExpRational.parse("(2/3)^3"); b = $$.ExpRational.parse("(3/5)^(3)");
    a.prod(b).toString().should.to.be.equal("(2/5)^3");

    a = $$.ExpRational.parse("(2/3)^2"); b = $$.ExpRational.parse("(2/3)^3");
    a.div(b).toString().should.to.be.equal("(2/3)^(-1)");

    a = $$.ExpRational.parse("2^2"); b = $$.ExpRational.parse("3^2");
    a.div(b).toString().should.to.be.equal("(2/3)^2");

    a = $$.ExpRational.parse("2^2"); b = $$.ExpRational.parse("3^2");
    a.prod(b).toString().should.to.be.equal("6^2");

    a = $$.ExpRational.parse("2^3"); b = $$.ExpRational.parse("2^5");
    a.prod(b).toString().should.to.be.equal("2^8");

    a = $$.ExpRational.parse("2^3"); b = $$.ExpRational.parse("3^2");
    a.prod(b).toString().should.to.be.equal("72");
  });

  it(`#toRational()`, function() {
    $$.ExpRational.parse("2").toRational().toString().should.to.be.equal("2");
    $$.ExpRational.parse("-2").toRational().toString().should.to.be.equal("-2");
    $$.ExpRational.parse("2^2").toRational().toString().should.to.be.equal("4");
    $$.ExpRational.parse("(-2)^2").toRational().toString().should.to.be.equal("4");
    $$.ExpRational.parse("(-2)^3").toRational().toString().should.to.be.equal("-8");
    
    //? I take into account the approximation
    $$.ExpRational.parse("(2)^(3/2)").toRational().value().toString().slice(0,9).should.to.be.equal("2.8284271"); // 2.828427125
    $$.ExpRational.parse("(2/3)^(3/2)").toRational().value().toString().slice(0,8).should.to.be.equal("0.544331"); // 0.544331054
  });

});