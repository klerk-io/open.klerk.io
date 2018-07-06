
import ParameterValidator from "../libs/ParameterValidator";
import ResponseError from "../libs/ResponseError";
import RequireLibrary from "../libs/RequireLibrary";

/**
 * Default Controller
 *
 * This controller can be extended to provide common
 * functionality to child controllers.
 *
 * @author Philipp Bauer <pbauer@klerk.io>
 */
export default class DefaultController {
  /**
   * Construct the class
   * @param {Object} config
   * @returns {Void}
   */
  constructor(config) {
    this.parameter = new ParameterValidator();
    this.responseError = new ResponseError();

    this.config = this.parameter.set(config).isObject().value();
  }

  /**
   * Require a library for the current platform
   *
   * @todo:
   * This is a potential bottleneck since there is no
   * static load path that can be evaluated. But I have
   * no better implementation of how to load a file
   * dynamically for the specified platform.
   *
   * @param  {String} path
   * @returns {Class}
   */
  requireLib(path) {
    return RequireLibrary(path, this.config.app.platform);
  }
}