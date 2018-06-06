import DatabaseContract from "./DatabaseContract";
import ParameterValidator from "../ParameterValidator";

export default class AbstractDatabase extends DatabaseContract {
  /**
   * Construct the class
   *
   * @var {Object} Configuration
   * @return {Void}
   */
  constructor(config, table = null) {
    super();
    this.parameter = new ParameterValidator(null);
    this.config = this.parameter.set(config).isObject().value();
    this.table = table || null;
  }
}