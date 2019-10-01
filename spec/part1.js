(function() {
  'use strict';

  var checkForNativeMethods = function(runUnderbarFunction) {
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

  describe('Part I', function() {

    describe('identity', function() {
      checkForNativeMethods(function() {
        _.identity(1);
      });

      it('Input으로 주어진 값을 그대로 리턴해야 합니다.', function() {
        const uniqueObject = {};
        expect(_.identity(1)).to.equal(1);
        expect(_.identity('string')).to.equal('string');
        expect(_.identity(false)).to.be.false;
        expect(_.identity(uniqueObject)).to.equal(uniqueObject);
      });
    });

    describe('first', function() {
      checkForNativeMethods(function() {
        _.first([1, 2, 3]);
      });

      it('Input으로 주어진 배열의 첫 번째 element를 리턴해야 합니다.', function() {
        expect(_.first([1, 2, 3])).to.equal(1);
      });

      it('Input으로 index값을 받아 다룰 수 있어야합니다.', function() {
        expect(_.first([1, 2, 3], 2)).to.eql([1, 2]);
      });

      it('Index 값이 0이 주어지면 빈 배열을 리턴해야 합니다.', function() {
        expect(_.first([1, 2, 3], 0)).to.eql([]);
      });

      it('Index 값이 주어진 배열의 길이 보다 길다면 배열 전체를 리턴해야 합니다.', function() {
        expect(_.first([1, 2, 3], 5)).to.eql([1, 2, 3]);
      });
    });

    describe('last', function() {
      checkForNativeMethods(function() {
        _.last([1, 2, 3]);
      });

      it('배열의 마지막 element를 리턴해야 합니다.', function() {
        expect(_.last([1, 2, 3])).to.equal(3);
      });

      it('Input으로 index값을 받아 다룰 수 있어야합니다.', function() {
        expect(_.last([1, 2, 3], 2)).to.eql([2, 3]);
      });

      it('Index 값이 0이 주어지면 빈 배열을 리턴해야 합니다.', function() {
        expect(_.last([1, 2, 3], 0)).to.eql([]);
      });

      it('Index 값이 주어진 배열의 길이 보다 길다면 배열 전체를 리턴해야 합니다.', function() {
        expect(_.last([1, 2, 3], 5)).to.eql([1, 2, 3]);
      });
    });

    describe('each', function() {
      checkForNativeMethods(function() {
        _.each([1, 2, 3, 4], function(number) {});
      });

      it('함수이여야 합니다.', function() {
        expect(_.each).to.be.an.instanceOf(Function);
      });

      it('아무 것도 리턴하지 말아야합니다.', function() {
        const returnValue = _.each([], function() {});
        expect(returnValue).to.not.exist;
      });

      it('Input으로 받은 배열을 조작하지 말아야합니다.', function() {
        const input = [1, 2, 3, 4, 5];
        const result = _.each(input, function(item) { /* noop */ });

        /*
         * Mutation of inputs should be avoided without good justification otherwise
         * as it can often lead to hard to find bugs and confusing code!
         * Imagine we were reading the code above, and we added the following line:
         *
         * var lastElement = input[input.length - 1];
         *
         * Without knowing that mutation occured inside of each,
         * we would assume that `lastElement` is 5. But if inside of
         * each, we use the array method `pop`, we would permanently
         * change `input` and our assumption would not longer be true,
         * `lastElement` would be 4 instead!
         *
         * The tricky part is that we have no way of knowing about the mutation
         * just by looking at the code above. We'd have to dive into the
         * implementation of each to the exact line that uses `pop`.
         * If we write a lot of code with this assumption, it might be very hard
         * to trace back to the correct line in each.
         *
         * You can avoid an entire class of bugs by writing functions
         * that don't mutate their inputs!
         */

        expect(input).to.eql([1, 2, 3, 4, 5]);
      });

      it('Input으로 주어진 배열을 순환하면서 모든 element의 값에 접근할 수 있어야합니다.', function() {
        const letters = ['a', 'b', 'c'];
        const iterations = [];

        _.each(letters, function(letter) {
          iterations.push(letter);
        });

        expect(iterations).to.eql(['a', 'b', 'c']);
      });

      it('Input으로 주어진 배열을 순환하면서 모든 element의 index에 접근할 수 있어야합니다.', function() {
        const letters = ['a', 'b', 'c'];
        const iterations = [];

        _.each(letters, function(letter, index) {
          iterations.push([letter, index]);
        });

        expect(iterations).to.eql([
          ['a', 0],
          ['b', 1],
          ['c', 2]
        ]);
      });

      it('Input으로 주어진 배열을 순환하면서 collection 자체에 접근할 수 있어야합니다.', function() {
        const letters = ['a', 'b', 'c'];
        const iterations = [];

        _.each(letters, function(letter, index, collection) {
          iterations.push([letter, index, collection]);
        });

        expect(iterations).to.eql([
          ['a', 0, letters],
          ['b', 1, letters],
          ['c', 2, letters]
        ]);
      });

      it('Input으로 배열이 주어졌을 때는 배열의 index에만 접근해야합니다.', function() {
        const iterations = [];
        const letters = ['a', 'b', 'c'];
        letters.someProperty = 'Do not iterate over me!';

        _.each(letters, function(letter, index, collection) {
          iterations.push(letter);
        });

        expect(iterations).to.not.include('Do not iterate over me!');
      });

      it('Input으로 주어진 객체를 순환하면서 각각의 value에 접근할 수 있어야합니다.', function() {
        const letters = {d: 'dog', e: 'elephant', f: 'flotsam'};
        const iterations = [];

        _.each(letters, function(value) {
          iterations.push(value);
        });

        expect(iterations).to.eql(['dog', 'elephant', 'flotsam']);
      });

      it('Input으로 주어진 객체를 순환하면서 각각의 key에 접근할 수 있어야합니다.', function() {
        const letters = {d: 'dog', e: 'elephant', f: 'flotsam'};
        const iterations = [];

        _.each(letters, function(value, property) {
          iterations.push([value, property]);
        });

        expect(iterations).to.eql([
          ['dog', 'd'],
          ['elephant', 'e'],
          ['flotsam', 'f']
        ]);
      });

      it('Input으로 주어진 객체를 순환하면서 원래의 객체에 접근할 수 있어야합니다.', function() {
        const letters = {d: 'dog', e: 'elephant', f: 'flotsam'};
        const iterations = [];

        _.each(letters, function(value, property, object) {
          iterations.push([value, property, object]);
        });

        expect(iterations).to.eql([
          ['dog', 'd', letters],
          ['elephant', 'e', letters],
          ['flotsam', 'f', letters]
        ]);
      });

      it('Input으로 객체가 주어졌을 때 `length`라는 property와 객체의 length를 혼돈하지 말아야합니다.', function() {
        const dresser = { length: 39, width: 79, height: 127};
        const iterations = [];

        _.each(dresser, function(value, property, object) {
          iterations.push([value, property, object]);
        });

        expect(iterations).to.eql([
          [39, 'length', dresser],
          [79, 'width', dresser],
          [127, 'height', dresser]
        ]);
      });

    });

    describe('indexOf', function() {
      checkForNativeMethods(function() {
        _.indexOf([10, 20, 30, 40], 40);
      });

      it('Input으로 주어진 배열에 찾는 값이 있을 경우 찾는 값의 index를 리턴해야 합니다.', function() {
        const numbers = [10, 20, 30, 40, 50];

        expect(_.indexOf(numbers, 40)).to.equal(3);
        expect(_.indexOf(numbers, 20)).to.equal(1);
      });

      it('Input으로 주어진 배열에 찾는 값이 없을 때 -1을 리턴해야 합니다.', function() {
        const numbers = [10, 20, 30, 40, 50];

        expect(_.indexOf(numbers, 35)).to.equal(-1);
      });

      it('Input으로 주어진 배열에 찾는 값이 여러개 있을 때 가장 앞선 index를 리턴합니다.', function() {
        const numbers = [1, 40, 40, 40, 40, 40, 40, 40, 50, 60, 70];

        expect(_.indexOf(numbers, 40)).to.equal(1);
      });
    });

    describe('filter', function() {
      checkForNativeMethods(function() {
        const isEven = function(num) { return num % 2 === 0; };
        _.filter([1, 2, 3, 4], isEven);
      });

      it('callback으로 짝수를 찾는 함수가 주어졌을 때 짝수로만 이루어진 배열을 리턴해야 합니다.', function() {
        const isEven = function(num) { return num % 2 === 0; };
        const evens = _.filter([1, 2, 3, 4, 5, 6], isEven);

        expect(evens).to.eql([2, 4, 6]);
      });

      it('callback으로 홀수를 찾는 함수가 주어졌을 때 홀수로만 이루어진 배열을 리턴해야 합니다.', function() {
        const isOdd = function(num) { return num % 2 !== 0; };
        const odds = _.filter([1, 2, 3, 4, 5, 6], isOdd);

        expect(odds).to.eql([1, 3, 5]);
      });

      it('Input으로 주어진 배열을 직접 다루지 않고 새로운 배열을 리턴해야 합니다.', function() {
        const isOdd = function(num) { return num % 2 !== 0; };
        const numbers = [1, 2, 3, 4, 5, 6];
        const evens = _.filter(numbers, isOdd);

        expect(evens).to.not.equal(numbers);
      });
    });

    describe('reject', function() {
      checkForNativeMethods(function() {
        const isEven = function(num) { return num % 2 === 0; };
        _.reject([1, 2, 3, 4, 5, 6], isEven);
      });

      it('callback으로 짝수를 찾는 함수가 주어졌을 때 짝수가 포함되지 않은 배열을 리턴해야 합니다.', function() {
        const isEven = function(num) { return num % 2 === 0; };
        const odds = _.reject([1, 2, 3, 4, 5, 6], isEven);

        expect(odds).to.eql([1, 3, 5]);
      });

      it('callback으로 홀수를 찾는 함수가 주어졌을 때 홀수가 포함되지 않은 배열을 리턴해야 합니다.', function() {
        const isOdd = function(num) { return num % 2 !== 0; };
        const evens = _.reject([1, 2, 3, 4, 5, 6], isOdd);

        expect(evens).to.eql([2, 4, 6]);
      });

      it('Input으로 주어진 배열을 직접 다루지 않고 새로운 배열을 리턴해야 합니다.', function() {
        const isOdd = function(num) { return num % 2 !== 0; };
        const numbers = [1, 2, 3, 4, 5, 6];
        const evens = _.reject(numbers, isOdd);

        expect(evens).to.not.equal(numbers);
      });
    });

    describe('uniq', function() {
      checkForNativeMethods(function() {
        _.uniq([1, 2, 3, 4]);
      });

      it('Input으로 주어진 배열을 직접 조작하지 말아야합니다.', function() {
        const input = [1, 2, 3, 4, 5];
        const result = _.uniq(input);

        /*
         * Mutation of inputs should be avoided without good justification otherwise
         * as it can often lead to hard to find bugs and confusing code!
         * Imagine we were reading the code above, and we added the following line:
         *
         * var lastElement = input[input.length - 1];
         *
         * Without knowing that mutation occured inside of _.uniq,
         * we would assume that `lastElement` is 5. But if inside of
         * _.uniq, we use the array method `pop`, we would permanently
         * change `input` and our assumption would not longer be true,
         * `lastElement` would be 4 instead!
         *
         * The tricky part is that we have no way of knowing about the mutation
         * just by looking at the code above. We'd have to dive into the
         * implementation of _.uniq to the exact line that uses `pop`.
         * If we write a lot of code with this assumption, it might be very hard
         * to trace back to the correct line in _.uniq.
         *
         * You can avoid an entire class of bugs by writing functions
         * that don't mutate their inputs!
         */

        expect(input).to.eql([1, 2, 3, 4, 5]);
      });

      it('Input으로 정렬되지 않은 배열이 주어졌을 때도 unique한 element를 리턴해야 합니다.', function() {
        const numbers = [1, 2, 1, 3, 1, 4];

        expect(_.uniq(numbers)).to.eql([1, 2, 3, 4]);
      });

      it('Input으로 정렬된 않은 배열이 주어졌을 때도 unique한 element를 리턴해야 합니다.', function() {
        const iterator = function(value) { return value + 1; };
        const numbers = [1, 2, 2, 3, 4, 4];

        expect(_.uniq(numbers, true, iterator)).to.eql([1, 2, 3, 4]);
      });

      it('Input으로 주어진 배열을 직접 다루지 않고 새로운 배열을 리턴해야 합니다.', function() {
        const numbers = [1, 2, 1, 3, 1, 4];
        const uniqueNumbers = _.uniq(numbers);

        expect(uniqueNumbers).to.not.equal(numbers);
      });
    });

    describe('map', function() {
      checkForNativeMethods(function() {
        _.map([1, 2, 3, 4], function(num) {
          return num * 2;
        });
      });

      it('Input으로 주어진 배열을 직접 조작하지 말아야합니다.', function() {
        const input = [1, 2, 3, 4, 5];
        const result = _.map(input, function(num) { /* noop */ });

        /*
         * Mutation of inputs should be avoided without good justification otherwise
         * as it can often lead to hard to find bugs and confusing code!
         * Imagine we were reading the code above, and we added the following line:
         *
         * var lastElement = input[input.length - 1];
         *
         * Without knowing that mutation occured inside of map,
         * we would assume that `lastElement` is 5. But if inside of
         * map, we use the array method `pop`, we would permanently
         * change `input` and our assumption would not longer be true,
         * `lastElement` would be 4 instead!
         *
         * The tricky part is that we have no way of knowing about the mutation
         * just by looking at the code above. We'd have to dive into the
         * implementation of map to the exact line that uses `pop`.
         * If we write a lot of code with this assumption, it might be very hard
         * to trace back to the correct line in map.
         *
         * You can avoid an entire class of bugs by writing functions
         * that don't mutate their inputs!
         */

        expect(input).to.eql([1, 2, 3, 4, 5]);
      });

      it('Input으로 주어진 callback 함수를 배열의 모든 element에 적용해야합니다.', function() {
        const doubledNumbers = _.map([1, 2, 3], function(num) {
          return num * 2;
        });

        expect(doubledNumbers).to.eql([2, 4, 6]);
      });

      it('Input으로 주어진 배열을 직접 다루지 않고 새로운 배열을 리턴해야 합니다.', function() {
        const numbers = [1, 2, 3];
        const mappedNumbers = _.map(numbers, function(num) {
          return num;
        });

        expect(mappedNumbers).to.not.equal(numbers);
      });
    });

    describe('pluck', function() {
      checkForNativeMethods(function() {
        const people = [
          { name: 'moe', age: 30 },
          { name: 'curly', age: 50 }
        ];

        _.pluck(people, 'name');
      });

      it('객체에서 유저가 직접 만든 property만 다루어야합니다.', function() {
        const people = [
          { name: 'moe', age: 30 },
          { name: 'curly', age: 50 }
        ];

        expect(_.pluck(people, 'name')).to.eql(['moe', 'curly']);
      });

      it('Input으로 주어진 배열을 직접 조작하지 말아야합니다.', function() {
        const people = [
          { name: 'moe', age: 30 },
          { name: 'curly', age: 50 }
        ];

        _.pluck(people, 'name');

        expect(people).to.eql([{ name: 'moe', age: 30 }, { name: 'curly', age: 50 }]);
      });
    });

    describe('reduce', function() {
      checkForNativeMethods(function() {
        const add = function(tally, item) { return tally + item; };
        _.reduce([1, 2, 3, 4], add);
      });

      it('함수이여야합니다.', function() {
        expect(_.reduce).to.be.an.instanceOf(Function);
      });

      it('값을 리턴해야 합니다.', function() {
        const result = _.reduce([3, 2, 1], function(memo, item) { return item; });
        expect(result).to.be.defined;
      });

      it('Input으로 주어진 배열을 직접 조작하지 말아야합니다.', function() {
        const input = [1, 2, 3, 4, 5];
        const result = _.reduce(input, function(memo, item) { return item; });

        /*
         * Mutation of inputs should be avoided without good justification otherwise
         * as it can often lead to hard to find bugs and confusing code!
         * Imagine we were reading the code above, and we added the following line:
         *
         * var lastElement = input[input.length - 1];
         *
         * Without knowing that mutation occured inside of _.reduce,
         * we would assume that `lastElement` is 5. But if inside of
         * _.reduce, we use the array method `pop`, we would permanently
         * change `input` and our assumption would not longer be true,
         * `lastElement` would be 4 instead!
         *
         * The tricky part is that we have no way of knowing about the mutation
         * just by looking at the code above. We'd have to dive into the
         * implementation of _.reduce to the exact line that uses `pop`.
         * If we write a lot of code with this assumption, it might be very hard
         * to trace back to the correct line in _.reduce.
         *
         * You can avoid an entire class of bugs by writing functions
         * that don't mutate their inputs!
         */

        expect(input).to.eql([1, 2, 3, 4, 5]);
      });

      it('should invoke the iterator function with arguments (memo, item) in that order', function() {
        let memoInCallback, itemInCallback;

        _.reduce(['item'], function(memo, item) {
          memoInCallback = memo;
          itemInCallback = item;
        }, 'memo');

        expect(memoInCallback).to.equal('memo');
        expect(itemInCallback).to.equal('item');
      });

      it('Input으로 주어진 배열의 elment들을 차례대로 iterator로 넘겨주어야합니다.', function() {
        const orderTraversed = [];

        _.reduce([1, 2, 3, 4], function(memo, item) {
          orderTraversed.push(item);
          return memo;
        }, 10);

        expect(orderTraversed).to.eql([1, 2, 3, 4]);
      });

      it('Iterator가 undefind를 리턴하더라도 계속해서 iterator를 실행해야합니다.', function() {
        let callCount = 0;
        const returnFalsy = function(total, item) {
          callCount++;
          if (callCount === 1) {
            return undefined;
          } else {
            return item + 1;
          }
        };

        const total = _.reduce([1, 1, 2], returnFalsy);
        expect(total).to.equal(3);
      });

      it('Accumulator가 주어지면 Input으로 주어진 배열의 모든 element를 iterator에 넘겨줍니다.', function() {
        const result = _.reduce([1, 2, 3], function(memo, item) {
          return memo - item;
        }, 10);

        expect(result).to.equal(4);
      });

      it('Accumulator는 fasly한 값도 가능해야합니다.', function() {
        const result = _.reduce([1, 2, 3], function(memo, item) {
          return memo * item;
        }, 0);

        expect(result).to.equal(0);
      });

      it('Accumulator가 주어지지 않았을 때 Input으로 주어진 배열의 첫 번째 element를 accumulator로 사용해야합니다.', function() {
        const result = _.reduce([1, 2, 3], function(memo) {
          return memo;
        });

        expect(result).to.equal(1);
      });


      it('Accumulator가 주어지지 않았을 때 배열의 2번 째 element부터 iterator에 넘겨줍니다.', function() {
        const result = _.reduce([3, 2, 1], function(memo, item) {
          return memo - item;
        });

        expect(result).to.equal(0);
      });

    });
  });

}());
