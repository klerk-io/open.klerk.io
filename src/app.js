import modofun from "modofun";
import config from "./config";

// import LockerController from "./app/controllers/LockerController";

let lockerService = modofun({
  "fetch": [modofun.arity(1), (id) => {
    return {
      data: {
        id: id,
        foo: config.lockers.salt
      }
    }
  }],
  "yield": [modofun.arity(0), () => {
    return {
      data: {
        foo: "bar"
      }
    }
  }]
});

export { lockerService };