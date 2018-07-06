function accesscontrol(config) {
  return function(req, res, next) {
    res.setHeader("Access-Control-Allow-Headers", config.headers);
    res.setHeader("Access-Control-Allow-Methods", config.methods);
    res.setHeader("Access-Control-Allow-Origin", config.origin);
    res.setHeader("Access-Control-Expose-Headers", config.expose);

    next();
  }
}

module.exports = accesscontrol;