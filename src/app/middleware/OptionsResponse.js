function options() {
  return function headers(req, res, next) {
    if (req.method === "OPTIONS") {
      res.sendStatus(200);
    } else {
      next();
    }
  }
}

module.exports = options;