exports.wait = task => {
  const queue = [];

  function enqueue(callback) {
    queue.push(callback);
  }

  let acceptor = enqueue;

  task((...args) => {
    acceptor = callback => callback(...args);
    queue.forEach(acceptor);
  });

  return callback => {
    acceptor(callback);
  };
};

exports.lazy = task => {
  let acceptor = runTask;
  const queue = [];

  function runTask(callback) {
    acceptor = enqueue;

    acceptor(callback);

    task((...args) => {
      acceptor = callback => callback(...args);
      queue.forEach(acceptor);
    });
  }

  function enqueue(callback) {
    queue.push(callback);
  }

  return callback => {
    acceptor(callback);
  };
};
