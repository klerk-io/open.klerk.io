/**
 * Generic Model
 *
 * @author Philipp Bauer <pbauer@klerk.io>
 */
import ParameterValidator from "../libs/ParameterValidator";

/**
 * Model class for inheritance
 */
export default class Model {
  constructor() {
    this.parameter = new ParameterValidator();
    return this;
  }

  /**
   * Returns the entity of the model
   * @returns {Object}
   */
  toJson() {
    return this.entity || {};
  }

  /**
   * Returns the entity as a String
   * @returns {String}
   */
  toString() {
    return JSON.stringify(this.toJson());
  }
}