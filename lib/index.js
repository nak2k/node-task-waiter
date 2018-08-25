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
