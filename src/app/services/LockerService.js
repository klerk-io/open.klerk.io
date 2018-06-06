require("dotenv").config();

const modofun = require("modofun");
const morgan = require("morgan");

const config = require("../config");
const LockerController = require("../controllers/LockerController").default;
let lockerController = new LockerController(config);

module.exports = modofun({
  "fetch": [modofun.arity(1), function(id) {
    return lockerController.get(id);
  }],
  "yield": [modofun.arity(0), function() {
    return lockerController.store(this.body);
  }]
}, {
  middleware: [morgan('tiny')]
});