/**
 * Default Controller
 *
 * This controller can be extended to provide common
 * functionality to child controllers.
 *
 * @author Philipp Bauer <pbauer@klerk.io>
 */
import ParameterValidator from "../libs/ParameterValidator";
import ResponseError from "../libs/ResponseError";

export default class DefaultController {
  constructor(config) {
    this.parameter = new ParameterValidator();
    this.responseError = new ResponseError();

    this.config = this.parameter.set(config).isObject().value();
  }

  /**
   * Capitalize a string (how is this not a String prototype in 2018?)
   * @param  {String} string
   * @return {String}
   */
  capitalize(string) {
    return string.replace(/\b\w/g, s => s.toUpperCase());
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
   * @return {Class}
   */
  requireLib(path) {
    return require(`../libs/${path}/${this.capitalize(path)}${this.capitalize(this.config.app.platform)}`).default;
  }
}