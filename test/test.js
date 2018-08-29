const test = require('tape');
const {
  wait,
  lazy,
} = require('..');

test('test wait()', t => {
  t.plan(13);

  let counter = 0;
  let resume;

  t.equal(counter++, 0);

  const then = wait(callback => {
    t.equal(counter++, 1);

    resume = () => {
      t.equal(counter++, 4);

      callback(null, 1, 2, 3);
    };
  });

  t.equal(counter++, 2);

  then((err, ...args) => {
    t.equal(counter++, 5);

    t.error(err);
    t.deepEqual(args, [1, 2, 3]);
  });

  t.equal(counter++, 3);

  resume();

  t.equal(counter++, 6);

  then((err, ...args) => {
    t.equal(counter++, 7);

    t.error(err);
    t.deepEqual(args, [1, 2, 3]);
  });

  t.equal(counter++, 8);
});

test('test lazy()', t => {
  t.plan(13);

  let counter = 0;
  let resume;

  t.equal(counter++, 0);

  const then = lazy(callback => {
    t.equal(counter++, 2);

    resume = () => {
      t.equal(counter++, 4);

      callback(null, 1, 2, 3);
    };
  });

  t.equal(counter++, 1);

  then((err, ...args) => {
    t.equal(counter++, 5);

    t.error(err);
    t.deepEqual(args, [1, 2, 3]);
  });

  t.equal(counter++, 3);

  resume();

  t.equal(counter++, 6);

  then((err, ...args) => {
    t.equal(counter++, 7);

    t.error(err);
    t.deepEqual(args, [1, 2, 3]);
  });

  t.equal(counter++, 8);
});
