/**
 * Lockers Controller
 * Orchestrates the storage and retrieval of lockers.
 *
 * @author Philipp Bauer <pbauer@klerk.io>
 */
import DefaultController from "./DefaultController";
import Locker from "../models/Locker";

export default class LockerController extends DefaultController {
  /**
   * Construct the class
   *
   * @var {Object} Environment Configuration
   * @var {Object} Service Configuration
   * @var {Object} User (optional)
   *
   * @return {Void}
   */
  constructor(config) {
    super(config);

    const Database = this.requireLib("database");
    this.database = new Database(config, config.lockers.table.name);
  }

  /**
   * Gets a locker by id
   *
   * @param  {String} id
   * @return {Object}
   */
  async get(id) {
    // console.log("Called LockerController.get() with:", id);
    this.parameter.set(id).isString().isNotEmpty();

    let locker = new Locker({id});

    const lockerEntity = await this.database.get(id);

    if (Object.keys(lockerEntity).length === 0) {
      return this.responseError.notFound();
    }

    if (lockerEntity.requests === 0) {
      return this.responseError.gone();
    }

    locker.setEntity(lockerEntity).reduceRequests();
    // console.log("Called LockerController.get() locker:", locker);

    if (locker.requestsValue() === 0) {
      await this.database.delete(id);
    } else {
      await this.database.update(locker.toJson(), id);
    }
    // console.log("Called LockerController.get() result:", result);

    return locker.toJson();
  }

  /**
   * Stores a new locker
   *
   * @return {Object}
   */
  async store(data) {
    // console.log("Called LockerController.store() with:", data);
    this.parameter.set(data).isObject().isNotEmpty();

    const requests = this.config.lockers.entity.defaults.requests;
    const ttl = this.config.lockers.entity.defaults.ttl;
    const createdAt = Math.round(new Date().getTime() / 1000);
    const expiresAt = createdAt + ttl;

    const locker = new Locker({
        data: data,
        requests: requests,
        ttl: ttl,
        createdAt: createdAt,
        expiresAt: expiresAt
      })
      .createId();

    const lockerEntity = locker.toJson();
    // console.log("Called LockerController.store() entity:", lockerEntity);

    const result = await this.database.store(lockerEntity, lockerEntity.id);
    // console.log("Called LockerController.store() result:", result);

    return result;
  }

  /**
   * Update an existing locker
   *
   * @param  {String} id
   * @param  {Object} data
   *
   * @return {Response}
   */
  async update(id, data) {
    throw new Error(`Method update(id, data) is not implemented`);
  }

  /**
   * Delete an existing locker
   *
   * @param  {String} id
   * @param  {Object} data
   *
   * @return {Response}
   */
  async delete(id) {
    throw new Error(`Method delete(id) is not implemented`);
  }
}