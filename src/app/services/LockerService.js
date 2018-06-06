require("dotenv").config();

let modofun = require("modofun");
let config = require("../config");
let LockerController = require("../controllers/LockerController").default;

let lockerController = new LockerController(config);

exports.default = modofun({
  "fetch": [modofun.arity(1), function(id) {
    return lockerController.get(id);
  }],
  "yield": [modofun.arity(0), function() {
    console.log(this);
    return lockerController.store(this.body);
  }]
});