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

## wait(task)

- `task(callback)`
    - A task funciton to wait for completion.
    - The `callback` function must be called with any number of arguments when the task is completed.

This function returns a following function:

- `then(callback)`
    - A function to specify a function that is called after the task is completed.
    - The `callback` function is called with arguments that are passed when the callback of the task is called.

## License

MIT
