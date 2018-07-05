require("dotenv").config();
const config = require("../config");

const modofun = require("modofun");
const morgan = require("morgan");
const helmet = require("helmet");
const accesscontrol = require("../middleware/AccessControl");
const options = require("../middleware/OptionsResponse");

const LockerController = require("../controllers/LockerController").default;
let lockerController = new LockerController(config);

module.exports = modofun(
  {
    fetch: [
      modofun.arity(1),
      function(id) {
        return lockerController.get(id);
      }
    ],
    yield: [
      modofun.arity(0),
      function() {
        return lockerController.store(this.body);
      }
    ],
    purge: [
      modofun.arity(0),
      function() {
        return lockerController.purge();
      }
    ]
  },
  {
    middleware: [
      morgan("tiny"),
      accesscontrol(config.headers.access),
      options(),
      helmet()
    ]
  }
);