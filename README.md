# task-waiter

Wait a task is completed.

## Installation

```
npm i task-waiter
```

## Usage

``` javascript
const { wait } = require('task-waiter');

const then = wait(callback => {
  // Do something

  callback(null, 1, 2, 3);
});

then((err, ...args) => {
  // args is [1, 2, 3]
});
```

## License

MIT
