import RequireLibrary from "../libs/RequireLibrary";

function accesslog(config) {
  return function(req, res, next) {
    const Database = RequireLibrary('database', config.app.platform);
    const database = new Database(config, config.logs.table.name);

    const log = {
      ip: req.ip,
      path: req.path,
      createdAt: Math.round(new Date().getTime() / 1000)
    }

    database.store(log, null, null, config.logs.entity.indexes);

    next();
  };
}

module.exports = accesslog;
