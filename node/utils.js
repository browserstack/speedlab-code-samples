function get_random_item(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

module.exports = {
  get_random_item,
  sleep,
};
