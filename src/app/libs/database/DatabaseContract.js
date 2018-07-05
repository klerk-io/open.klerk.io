/**
 * Database Contract
 * Defines an interface for database interaction
 *
 * @author Philipp Bauer <pbauer@klerk.io>
 */
export default class DatabaseContract {
  /**
   * Construct the class
   *
   * @var {Object} Environment Configuration
   *
   * @return {Void}
   */
  constructor(config, table = null) {
    // No throw here, this will always be executed "as is"
  }

  /**
   * Get entity from database
   *
   * @var {String} Item ID
   * @var {String} Table (optional)
   *
   * @return {Object}
   */
  async get(id, table = null) {
    throw new Error(`DatabaseContract.get not implemented!`);
  }

  /**
   * Store entity in database
   *
   * @var {Object} Item Data
   * @var {String} Item ID (optional)
   * @var {String} Table (optional)
   *
   * @return {Object}
   */
  async store(data, id = null, table = null, indexes = null) {
    throw new Error(`DatabaseContract.store not implemented!`);
  }

  /**
   * Update entity in database
   *
   * @var {Object} Item Data
   * @var {String} Item ID
   * @var {String} Table (optional)
   *
   * @return {Object}
   */
  async update(data, id, table = null) {
    throw new Error(`DatabaseContract.update not implemented!`);
  }

  /**
   * Delete entity from database
   *
   * @var {String} Item ID
   * @var {String} Table (optional)
   *
   * @return {Boolean}
   */
  async delete(id, table = null) {
    throw new Error(`DatabaseContract.delete not implemented!`);
  }

  async query(filters = [], table = null) {
    throw new Error(`DatabaseContract.query not implemented!`);
  }
}