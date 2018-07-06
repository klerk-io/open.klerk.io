function options() {
  return function(req, res, next) {
    if (req.method === "OPTIONS") {
      res.sendStatus(200);
    } else {
      next();
    }
  }
}

module.exports = options;