(function() {
  'use strict';

  const checkForNativeMethods = function(runUnderbarFunction) {
    it('Array의 내장 메소드를 이용하지 않고, 언더바의 메스드를 구현할 수 있어야 합니다.', function() {
      // These spies are set up in testSupport.js
      runUnderbarFunction();
      expect(Array.prototype.map.called).to.equal(false);
      expect(Array.prototype.indexOf.called).to.equal(false);
      expect(Array.prototype.forEach.called).to.equal(false);
      expect(Array.prototype.filter.called).to.equal(false);
      expect(Array.prototype.reduce.called).to.equal(false);
      expect(Array.prototype.every.called).to.equal(false);
      expect(Array.prototype.some.called).to.equal(false);
    });
  };

  describe('Part II', function() {

    describe('contains', function() {
      checkForNativeMethods(function() {
        _.contains([4, 5, 6], 2);
      });

      it('함수이여야합니다.', function() {
        expect(_.contains).to.be.an.instanceOf(Function);
      });

      it('Input으로 주어진 배열을 직접 조작하지 말아야합니다.', function() {
        const input = [1, 2, 3, 4, 5];
        const result = _.contains(input, 4);

        /*
         * Mutation of inputs should be avoided without good justification otherwise
         * as it can often lead to hard to find bugs and confusing code!
         * Imagine we were reading the code above, and we added the following line:
         *
         * var lastElement = input[input.length - 1];
         *
         * Without knowing that mutation occured inside of reduceRight,
         * we would assume that `lastElement` is 5. But if inside of
         * reduceRight, we use the array method `pop`, we would permanently
         * change `input` and our assumption would not longer be true,
         * `lastElement` would be 4 instead!
         *
         * The tricky part is that we have no way of knowing about the mutation
         * just by looking at the code above. We'd have to dive into the
         * implementation of reduceRight to the exact line that uses `pop`.
         * If we write a lot of code with this assumption, it might be very hard
         * to trace back to the correct line in reduceRight.
         *
         * You can avoid an entire class of bugs by writing functions
         * that don't mutate their inputs!
         */

        expect(input).to.eql([1, 2, 3, 4, 5]);
      });

      it('Input으로 주어진 배열에서 찾는 값이 존재한다면 true를 리턴합니다.', function() {
        const array = [1, 2, 3];
        const value = 1;
        expect(_.contains(array, value)).to.be.true;
      });

      it('Input으로 주어진 배열에서 찾는 값이 존재하지 않는다면 false를 리턴합니다.', function() {
        const array = [1, 2, 3];
        const value = 4;
        expect(_.contains(array, value)).to.be.false;
      });

      it('Input으로 주어진 객체에서 찾는 값이 value에 존재한다면 true를 리턴합니다.', function() {
        const object = { a: 1, b: 2, c: 3 };
        const value = 1;
        expect(_.contains(object, value)).to.be.true;
      });

      it('Input으로 주어진 객체에서 찾는 값이 value에 존재하지 않는다면 false를 리턴합니다.', function() {
        const object = { a: 1, b: 2, c: 3 };
        const value = 4;
        expect(_.contains(object, value)).to.be.false;
      });
    });

    describe('every', function() {
      const isEven = function(num) {
        return num % 2 === 0;
      };

      checkForNativeMethods(function() {
        _.every([4, 5, 6], _.identity);
      });

      it('항상 boolean값을 리턴해야 합니다.', function() {
        expect(_.every([1], _.identity)).to.be.true;
        expect(_.every([0], _.identity)).to.be.false;
      });

      it('Input으로 빈 배열이 주어지면 true를 리턴해야 합니다.', function() {
        expect(_.every([], _.identity)).to.be.true;
      });

      it('Input으로 주어진 배열의 모든 element들이 truthy일 때 true를 리턴해야 합니다.', function() {
        expect(_.every([true, {}, 1], _.identity)).to.be.true;
      });

      it('Input으로 주어진 배열의 모든 element들이 falsy일 때 false를 리턴해야 합니다.', function() {
        expect(_.every([null, 0, undefined], _.identity)).to.be.false;
        expect(_.every([undefined, undefined, undefined], _.identity)).to.be.false;
      });

      it('Input으로 주어진 배열의 모든 element들이 truthy일 때 false를 리턴해야 합니다.', function() {
        expect(_.every([true, false, 1], _.identity)).to.be.false;
        expect(_.every([1, undefined, true], _.identity)).to.be.false;
      });

      it('should handle callbacks that manipulate the input', function() {
        expect(_.every([0, 10, 28], isEven)).to.be.true;
        expect(_.every([0, 11, 28], isEven)).to.be.false;
      });

      it('callback 함수가 주어지지 않는 경우도 다룰 수 있어야합니다.', function() {
        expect(_.every([true, true, true])).to.be.true;
        expect(_.every([true, true, false])).to.be.false;
        expect(_.every([false, false, false])).to.be.false;
      });
    });

    describe('some', function() {
      const isEven = function(number) {
        return number % 2 === 0;
      };

      checkForNativeMethods(function() {
        _.some([4, 5, 6], _.identity);
      });

      it('항상 boolean값을 리턴해야 합니다.', function() {
        expect(_.some([1], _.identity)).to.be.true;
        expect(_.some([0], _.identity)).to.be.false;
      });

      it('Input으로 빈 배열이 주어지면 false를 리턴해야 합니다.', function() {
        expect(_.some([])).to.be.false;
      });

      it('Input으로 주어진 배열의 모든 element들이 truthy일 때 true를 리턴해야 합니다.', function() {
        expect(_.some([true, {}, 1], _.identity)).to.be.true;
      });

      it('Input으로 주어진 배열의 모든 element들이 falsy일 때 false를 리턴해야 합니다.', function() {
        expect(_.some([null, 0, undefined], _.identity)).to.be.false;
      });

      it('Input으로 주어진 배열의 element들이 falsy와 truthy가 섞여있을 때 true를 리턴해야 합니다.', function() {
        expect(_.some([true, false, 1], _.identity)).to.be.true;
        expect(_.some([null, 0, 'yes', false], _.identity)).to.be.true;
      });

      it('Input으로 주어진 배열에서 조건에 맞는 element가 하나도 없다면 false를 리턴합니다.', function() {
        expect(_.some([1, 11, 29], isEven)).to.be.false;
      });

      it('Input으로 주어진 배열에서 조건에 맞는 element가 하나라도 있다면 true를 리턴합니다.', function() {
        expect(_.some([1, 10, 29], isEven)).to.be.true;
      });

      it('callback 함수가 주어지지 않는 경우도 다룰 수 있어야합니다.', function() {
        expect(_.some([true, true, true])).to.be.true;
        expect(_.some([true, true, false])).to.be.true;
        expect(_.some([false, false, false])).to.be.false;
      });
    });

    describe('extend', function() {
      checkForNativeMethods(function() {
        _.extend({ a: 1 }, { b: 1 }, { c: 1 });
      });

      it('Input으로 받은 첫 번째 객체를 리턴해야 합니다.', function() {
        const destination = {};
        const source = {};
        const extended = _.extend(destination, source);

        expect(extended).to.equal(destination);
      });

      it('Input으로 받은 객체들의 property를 첫 번째 객체에 추가해야합니다.', function() {
        const destination = {};
        const source = { a: 'b' };
        const extended = _.extend(destination, source);

        expect(extended.a).to.equal('b');
      });

      it('Input으로 받은 객체들이 같은 property를 가지고 있을 때 나중에 나온 객체의 property를 사용합니다.', function() {
        const destination = { a: 'x' };
        const source = { a: 'b' };
        const extended = _.extend(destination, source);

        expect(extended.a).to.equal('b');
      });

      it('Input으로 받은 객체들이 같은 property를 가지고 있지 않으면 먼저 나온 객체의 property를 수정하지 말아야합니다.', function() {
        const destination = { x: 'x' };
        const source = { a: 'b' };
        const extended = _.extend(destination, source);

        expect(extended.x).to.equal('x');
      });

      it('Input으로 3개 이상의 객체를 받는 경우를 다룰 수 있어야합니다.', function() {
        const extended = _.extend({ x: 1 }, { a: 2 }, { b: 3 });

        expect(extended).to.eql({ x: 1, a: 2, b: 3 });
      });

      it('Input으로 3개 이상의 객체를 받았을 때 객체들이 같은 property를 가지고 있을 때 나중에 나온 객체의 property를 사용합니다.', function() {
        const extended = _.extend({ x: 'x' }, { a: 'a', x: 2 }, { a: 1 });

        expect(extended).to.eql({ x: 2, a: 1 });
      });
    });

    describe('defaults', function() {
      checkForNativeMethods(function() {
        _.defaults({ a: 1 }, { b: 1 }, { c: 1 });
      });

      it('함수이여야합니다.', function() {
        expect(_.defaults).to.be.an.instanceOf(Function);
      });

      it('항상 Input으로 주어진 첫번째 객체를 리턴해야 합니다.', function() {
        /*
         * Our defaults function should only modify the contents of the original object,
         * it should not create a new object with all the same properties
         *
         * We can test this by using the identity operator (===)
         *
         * If we assign a variable to the result of _.defaults() and it === a variable assigned
         * to our initial object, then both variables are indeed references to the same object
         * and we are guaranteed that only the contents of our original object were modified
         */

        const destination = {};
        const source = {};
        const defaulted = _.defaults(destination, source);

        expect(defaulted).to.equal(destination); // .equal uses (===) under the hood
      });

      it('첫 번째 객체가 key를 가지고 있지 않다면 property에 추가합니다.', function() {
        /*
         * Be careful when using `arguments`. It's specified as a weird "Array-like object"
         * that's not really an array and not really even an object. This means normal operations
         * we would expect to work on objects (`for in`, `Object.keys`) and arrays (`push`, `pop`)
         * might not work as expected on `arguments`.
         *
         * In fact, the behavior of `arguments` is left up to various JavaScript engines to implement.
         * You might have noticed that running this exact same test works fine in Chrome or Firefox.
         * This is because the engines powering these browsers are smart enough to understand
         * the nuances of this complicated structure and might force it to act as expected.
         *
         * It turns out that the engine powering our runtime environment for these tests
         * is not as smart as Chrome and does not understand how to `for in` over the `arguments` object
         *
         * This could be considered a bug in our test environment but is better thought of as a learning
         * opportunity. The safest thing to do when working with `arguments` is convert it into a
         * real array that every JavaScript engine will know how to handle.
         *
         * If you're not sure how to do that, Stack Overflow has plenty to say on the topic.
         */

        const destination = {};
        const source = { a: 1 };

        _.defaults(destination, source);

        expect(destination.a).to.equal(1);
      });

      it('첫 번째 객체가 key를 가지고 있지 않다면 property를 추가해야합니다.', function() {
        const destination = {};
        const source = { a: 1, b: 2, c: 'three' };

        _.defaults(destination, source);

        expect(destination.a).to.equal(1);
        expect(destination.b).to.equal(2);
        expect(destination.c).to.equal('three');
      });

      it('첫 번째 객체가 이미 key를 가지고 있다면 property를 수정하지 말아야합니다.', function() {
        const destination = { a: 10 };
        const source = { a: 1 };

        _.defaults(destination, source);

        expect(destination.a).to.equal(10);

        const destination2 = { a: 1, b: 2 };
        const source2 = { a: 100, b: 200, c: 300 };

        _.defaults(destination2, source2);

        expect(destination2.a).to.equal(1);
        expect(destination2.b).to.equal(2);
        expect(destination2.c).to.equal(300);
      });

      it('첫 번째 객체가 이미 key를 가지고 있다면 key의 value가 falsy 더라도 property를 수정하지 말아야합니다.', function() {
        /*
         * When the value provided to an if() condition is not a strict boolean,
         * it will first be coerced into one and then evaluated
         *
         * A value is considered 'falsy' if, when coerced, it evaluates to `false`.
         * You can check the coerced boolean with either `Boolean(myValue)` or `!!myValue`
         *
         * This could be a problem because falsy values are valid in our object. If we aren't
         * precise enough with our conditional check, we might get these unexpected results
         */

        const destination = {a: '', b: 0, c: NaN };
        const source = { a: 1, b: 2, c: 3 };

        _.defaults(destination, source);

        expect(destination.a).to.equal('');
        expect(destination.b).to.equal(0);
        expect(isNaN(destination.c)).to.equal(true);
      });

      it('Input으로 여러개의 객체를 받는 경우를 다룰 수 있어야합니다.', function() {
        const destination = {};
        const source = { a: 1 };
        const anotherSource = { b: 2, c: 'three' };
        const aThirdSource = { d: 'four' };

        _.defaults(destination, source, anotherSource, aThirdSource);

        expect(destination.a).to.equal(1);
        expect(destination.b).to.equal(2);
        expect(destination.c).to.equal('three');
        expect(destination.d).to.equal('four');
      });

      it('여러개의 동일한 key가 존재한다면 가장 먼저 나온 객체의 key를 property로 추가합니다.', function() {
        const destination = {};
        const source = { a: 1 };
        const anotherSource = { a: 'one' };

        _.defaults(destination, source, anotherSource);

        expect(destination.a).to.equal(1);
      });
    });

    describe('once', function() {
      checkForNativeMethods(function() {
        const num = 0;
        const increment = _.once(function() {
          num += 1;
        });
      });

      it('함수이여야합니다.', function() {
        expect(_.once).to.be.an.instanceOf(Function);
      });

      it('함수를 리턴해야 합니다.', function() {
        const noop = _.once(function() {});

        expect(noop).to.be.an.instanceOf(Function);
      });

      it('리턴 된 함수가 이전에 한 번도 호출된 적이 없을 때 만 함수를 실행합니다.', function() {
        let num = 0;
        const increment = _.once(function() {
          num++;
        });

        increment();
        increment();
        increment();

        expect(num).to.equal(1);
      });

      it('리턴 된 함수에 Input으로 주어진 arguments들을 정확히 전달해야합니다.', function() {
        const add = _.once(function(x, y, z) {
          return x + y + z;
        });

        expect(add(1, 2, 3)).to.equal(6);
      });

      it('리턴 된 함수가 여러번 호출되어도 항상 첫 번째 호출되었을 때의 결과값을 리턴해야 합니다.', function() {
        const add = _.once(function(x, y, z) {
          return x + y + z;
        });

        expect(add(1, 2, 3)).to.equal(6);
        expect(add(4, 5, 6)).to.equal(6);
        expect(add(7, 8, 9)).to.equal(6);
      });
    });

    describe('delay', function() {
      let callback;

      beforeEach(function() {
        callback = sinon.spy();
      });

      checkForNativeMethods(function() {
        _.delay(callback, 100);
      });

      it('주어진 시간만큼 기다린 뒤에 callback함수를 실행해야합니다.', function() {
        _.delay(callback, 100);
        clock.tick(99);

        expect(callback).to.have.not.been.called;

        clock.tick(1);

        expect(callback).to.have.been.calledOnce;
      });

      it('callback 함수에 Input으로 받은 arguments들을 정확히 전달해야합니다.', function() {
        _.delay(callback, 100, 1, 2);
        clock.tick(100);

        expect(callback).to.have.been.calledWith(1, 2);
      });
    });

    describe('flatten', function() {
      checkForNativeMethods(function() {
        _.flatten([1, [2], [3, [[[4]]]]]);
      });

      it('다 차원 배열을 1차원 배열로 만들어야합니다.', function() {
        const nestedArray = [1, [2], [3, [[[4]]]]];

        expect(_.flatten(nestedArray)).to.eql([1, 2, 3, 4]);
      });
    });

    describe('shuffle', function() {
      checkForNativeMethods(function() {
        _.shuffle([1, 2, 3, 4]);
      });

      it('Input으로 주어진 배열을 수정하지 말아야합니다.', function() {
        const numbers = [4, 5, 6];
        const shuffled = _.shuffle(numbers).sort();

        expect(shuffled).to.not.equal(numbers);
        expect(numbers).to.eql([4, 5, 6]);
      });

      it('리턴 된 배열은 Input으로 주어진 배열과 같은 element들을 가지고 있어야합니다.', function() {
        const numbers = [4, 5, 6];
        const shuffled = _.shuffle(numbers).sort();

        expect(shuffled).to.eql([4, 5, 6]);
      });

      it('리턴된 배열은 Input으로 주어진 배열과 element들의 순서가 같지 않아야합니다.', function() {
        const numbers = [4, 5, 6, 7, 8, 9, 10];
        const shuffled = _.shuffle(numbers);

        // 이 테스트는 1 / 362880의 확률로 실패할 수 있습니다.
        expect(shuffled).to.not.eql([4, 5, 6, 7, 8, 9, 10]);
      });

    });

  });

}());
