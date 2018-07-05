import DefaultController from "./DefaultController";
import Locker from "../models/Locker";

/**
 * Locker Controller
 * Orchestrates the storage and retrieval of lockers.
 *
 * @author Philipp Bauer <pbauer@klerk.io>
 */
export default class LockerController extends DefaultController {
  /**
   * Construct the class
   *
   * @param   {Object} config Configuration
   * @returns {Void}
   */
  constructor(config) {
    super(config);

    const Database = this.requireLib("database");
    this.database = new Database(config, config.lockers.table.name);
  }

  /**
   * Gets a locker by id
   *
   * @param   {String} id Locker ID
   * @returns {Object}
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
   * @param   {Object} data  Locker Data
   * @returns {Object}
   */
  async store(data) {
    // console.log("Called LockerController.store() with:", data);
    this.parameter.set(data).isNotEmpty();

    const indexes = this.config.lockers.entity.indexes;
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
    });

    const lockerEntity = locker.toJson();
    // console.log("Called LockerController.store() entity:", lockerEntity);

    const result = await this.database.store(lockerEntity, lockerEntity.id, null, indexes);
    // console.log("Called LockerController.store() result:", result);

    return result;
  }

  /**
   * Update an existing locker
   *
   * @param  {String} id
   * @param  {Object} data
   *
   * @returns {Response}
   */
  async update(id, data) {
    throw new Error(`Method update(id, data) is not implemented`);
  }

  /**
   * Delete an existing locker
   *
   * @param   {String} id
   * @returns {Response}
   */
  async delete(id) {
    return await this.database.delete(id);
  }

  /**
   * Purge database from stale lockers
   *
   * @returns {Response}
   */
  async purge() {
    const now = Math.round(new Date().getTime() / 1000);

    // Get all stale lockers
    const lockers = (await this.database.query([["expiresAt", "<=", now]]))[0];

    // Delete lockers
    if (lockers.length > 0) {
      const results = await Promise.all(lockers.map(locker => this.delete(locker.id)));
      const errors = results.filter(result => result !== true);

      if (errors.length > 0) {
        throw new Error(`Couldn't purge all stale lockers.`);
      }
    }

    return true;
  }
}