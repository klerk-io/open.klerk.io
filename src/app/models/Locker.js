/**
 * Locker Model
 *
 * @author Philipp Bauer <pbauer@klerk.io>
 */
import UUIDv1 from "uuid/v1";
import MD5 from "crypto-js/md5";

import Model from "./Model";
import config from "../config";

export default class Locker extends Model {
  /**
   * Construct the class
   *
   * @param  {Object}  Locker Entity
   * @return {Self}
   */
  constructor(entity = null) {
    super();

    if (entity !== null) {
      if (entity.id && !this.verifyId(entity.id)) {
        throw new RangeError(`The lockerId "${entity.id}" is not valid.`);
      }

      this.entity = Object.assign({}, config.lockers.entity.signature, entity);
    } else {
      this.entity = config.lockers.entity.signature;
      this.createId();
    }

    return this;
  }

  /**
   * Set a value
   *
   * @todo This is horrible implementation and needs to change
   *
   * @param  {String} Key
   * @param  {Mixed}  Value
   *
   * @return {Self}
   */
  setValue(key, value) {
    this.entity[key] = value;
    return this;
  }

  /**
   * Create an id
   * @return {String}
   */
  createId() {
    const uuid = UUIDv1();
    const checksum = this.createUuidChecksum(uuid);

    this.entity.id = `${uuid}-${checksum}`;

    return this;
  }

  /**
   * Verify the id
   *
   * The id includes a partial, salted MD5 hash that is
   * used to validate the id string. This is done to prevent
   * unnecessary connections to the database and thus saves
   * processing time in case someone tries to guess ids.
   * The salt is used to make this attack even harder.
   *
   * @param  {String}  id (optional)
   * @return {Boolean}
   */
  verifyId(id = null) {
    id = id || this.entity.id;
    return this.parseChecksum(id) === this.createUuidChecksum(this.parseUuid(id));
  }

  /**
   * Create a salted checksum for the uuid
   *
   * @param  {String} uuid
   * @return {String}      Partial MD5 Hash
   */
  createUuidChecksum(uuid) {
    if (!config.lockers.salt || config.lockers.salt.length === 0) {
      throw new Error(`Please specify LOCKERS_SALT in your .env configuration file.`);
    }

    return MD5(uuid + config.lockers.salt).toString().substr(0, 16);
  }

  /**
   * Parses the uuid from a id
   *
   * @param  {String} id
   * @return {String}     UUIDv1
   */
  parseUuid(id) {
    return id.substr(0, id.length - 17);
  }

  /**
   * Parses the checksum from a id
   *
   * @param  {String} id
   * @return {String}     Checksum
   */
  parseChecksum(id) {
    return id.substr(-16);
  }

  /**
   * Returns the remaining requests value
   * @return {Integer}
   */
  requestsValue() {
    return this.entity.requests;
  }

  /**
   * Reduce the requests value by value
   *
   * @param  {Number} value
   * @return {Self}
   */
  reduceRequests(value = 1) {
    if (value < 0) {
      throw new RangeError(`Value can't be negative.`);
    }

    const current = this.entity.requests;
    const modified = !current || (current - value) < 0 ? 0 : current - value;

    this.entity.requests = modified;

    return this;
  }
}