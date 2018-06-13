function accesscontrol(config) {
  return function headers(req, res, next) {
    res.setHeader("Access-Control-Allow-Headers", config.headers);
    res.setHeader("Access-Control-Allow-Methods", config.methods);
    res.setHeader("Access-Control-Allow-Origin", config.origin);

    next();
  }
}

module.exports = accesscontrol;