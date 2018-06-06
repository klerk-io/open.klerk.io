/**
 * Parameter Class
 * Checks parameters against defined constraints
 *
 * @author Philipp Bauer <pbauer@klerk.io>
 */
export default class ParameterValidator {
  constructor(parameter = null) {
    this.parameter = parameter;
    return this;
  }

  /**
   * Set the current parameter
   *
   * @param {Mixed} parameter
   * @return {Self}
   */
  set(parameter) {
    if (arguments.length === 0 || parameter === undefined) {
      throw new TypeError(`Parameter is not defined.`);
    }

    this.parameter = parameter;

    return this;
  }

  /**
   * Return the value of the parameter
   * @return {Mixed}
   */
  value() {
    return this.parameter;
  }

  /**
   * Check for a type
   *
   * @param  {String} type
   * @param  {Mixed}  paramter (optional)
   *
   * @return {Self}
   */
  checkType(type, parameter = null) {
    parameter = parameter || this.parameter;

    if (typeof parameter !== type) {
      throw new TypeError(`Parameter is not of type "${type}".`);
    }

    return this;
  }

  /**
   * Call custom parameter verification function
   *
   * @param  {Function}  callback Callback function must expect 'parameter' as first parameter
   * @param  {...Mixed} args      Optional Arguments for callback functions
   *
   * @return {Self}
   */
  isCustom(callback, ...args) {
    try {
      this.checkType('function', callback);
    } catch(e) {
      throw new TypeError(`Callback is not a function.`);
    }

    callback(this.parameter, ...args);

    return this;
  }

  /**
   * Check if parameter is an object
   * @return {Self}
   */
  isObject() {
    return this.checkType("object");
  }

  /**
   * Check if parameter is a string
   * @return {Self}
   */
  isString() {
    return this.checkType("string");
  }

  /**
   * Check if parameter is a number
   * @return {Self}
   */
  isNumber() {
    return this.checkType("number");
  }

  /**
   * Check if parameter is a function
   * @return {Self}
   */
  isFunction() {
    return this.checkType("function");
  }

  /**
   * Check if parameter is empty
   * @return {Self}
   */
  isEmpty() {
    const type = typeof this.parameter;

    switch (type) {
      // Check if hash is empty
      case "object": {
        let empty = true, item;
        for (item in this.parameter) {
          empty = false;
          break;
        }

        if (empty) {
          return this;
        }

        break;
      }

      // Soft check on default
      default: {
        if (this.parameter === null || this.parameter.length === 0) {
          return this;
        }
        break;
      }
    }

    throw new RangeError(`Parameter is not empty.`);
  }

  /**
   * Check if parameter is not empty
   * @return {Self}
   */
  isNotEmpty() {
    try {
      this.isEmpty();
    } catch(e) {
      return this;
    }

    throw new RangeError(`Parameter is empty.`);
  }
}