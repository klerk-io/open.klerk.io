/**
 * Generic Model
 *
 * @author Philipp Bauer <pbauer@klerk.io>
 */
import ParameterValidator from "../libs/ParameterValidator";

export default class Model {
  constructor() {
    this.parameter = new ParameterValidator();
    return this;
  }

  toJson() {
    return this.entity || {};
  }

  toString() {
    return JSON.stringify(this.toJson());
  }
}