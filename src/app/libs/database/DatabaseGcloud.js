/**
 * Google Cloud Platform Datastore
 *
 * @author Philipp Bauer <pbauer@klerk.io>
 */
import UUIDv1 from "uuid/v1";
import Datastore from "@google-cloud/datastore";
import DatabaseAbstract from "./DatabaseAbstract";

export default class DatabaseGcloud extends DatabaseAbstract {
  /**
   * Construct the class
   *
   * @var {Object} Configuration
   * @returns {Void}
   */
  constructor(config, table = null) {
    super(config, table);

    if (!config.app.gcloud.projectId || config.app.gcloud.projectId.length === 0) {
      throw new Error(`Please specify GCLOUD_PROJECT_ID in your .env configuration file.`);
    }

    this.datastore = new Datastore({
      keyFilename: config.app.gcloud.appCredentials,
      projectId: config.app.gcloud.projectId
    });
  }

  /**
   * Get entity from database
   *
   * @var {String} Item ID
   * @var {String} Table (optional)
   *
   * @returns {Object}
   */
  async get(id, table = null) {
    this.parameter.set(id).isString().isNotEmpty();

    table = table || this.table;

    try {
      const key = this.datastore.key([table, id]);
      const result = (await this.datastore.get(key))[0];

      if (!result) {
        return {};
      }

      const entity = this.outputConversion(result);
      return this.normalizedEntity(entity);
    } catch(e) {
      console.error(e);
      throw e;
    }
  }

  /**
   * Store entity in database
   *
   * @var {Object} Item Data
   * @var {String} Item ID (optional)
   * @var {String} Table (optional)
   *
   * @returns {Object}
   */
  async store(data, id = null, table = null) {
    this.parameter.set(data).isObject().isNotEmpty();

    id = id || UUIDv1();
    table = table || this.table;

    const entity = this.makeEntity(data, id, table);

    try {
      await this.datastore.save(entity);
      return this.normalizedEntity(entity);
    } catch(e) {
      console.error(e);
      throw e;
    }
  }

  /**
   * Update entity in database
   *
   * @var {Object} Item Data
   * @var {String} Item ID
   * @var {String} Table (optional)
   *
   * @returns {Object}
   */
  async update(data, id, table = null) {
    this.parameter.set(data).isObject().isNotEmpty();
    this.parameter.set(id).isString().isNotEmpty();

    table = table || this.table;

    const entity = this.makeEntity(data, id, table);

    try {
      await this.datastore.update(entity);
      return this.normalizedEntity(entity);
    } catch(e) {
      console.error(e);
      throw e;
    }
  }

  /**
   * Delete entity from database
   *
   * @var {String} Item ID
   * @var {String} Table (optional)
   *
   * @returns {Boolean}
   */
  async delete(id, table = null) {
    this.parameter.set(id).isString().isNotEmpty();

    table = table || this.table;

    const key = this.datastore.key([table, id]);

    try {
      await this.datastore.delete(key);
      return true;
    } catch(e) {
      console.error(e);
      throw e;
    }
  }

  /**
   * Input Conversion
   *
   * @param  {Object} data
   * @returns {Object}
   */
  inputConversion(data) {
    let gdata = [];

    for (let key of Object.keys(data)) {
      gdata.push({
        name: key,
        value: data[key],
        excludeFromIndexes: true
      });
    }
    console.log(gdata);

    return gdata;
  }

  /**
   * Output Conversion
   *
   * @param  {Object} data
   * @returns {Object}
   */
  outputConversion(data) {
    return data;
  }

  /**
   * Make a Google Datastore data entity
   *
   * @param  {Object} data
   * @param  {String} id
   * @param  {String} table
   *
   * @returns {Object}
   */
  makeEntity(data, id, table) {
    this.parameter.set(data).isObject().isNotEmpty();
    this.parameter.set(id).isString().isNotEmpty();
    this.parameter.set(table).isString().isNotEmpty();

    return {
      key: this.datastore.key([table, id]),
      data: this.inputConversion(data)
    };
  }

  /**
   * Normalize Entity
   *
   * Normalize entity to read more like traditional SQL results.
   * We set the id in the data object and return it.
   *
   * @param  {Object} entity
   * @returns {Object}
   */
  normalizedEntity(entity) {
    // If the entity object is empty (array / object without results)
    // make sure to return an empty object and nothing else.
    try {
      this.parameter.set(entity).isNotEmpty();
    } catch(e) {
      // If "is empty" error is thrown
      // return empty object.
      return {};
    }

    const key = entity[this.datastore.KEY] || entity.key;

    if (key === undefined && entity.id !== undefined && entity.id !== null) {
      return entity;
    } else if (key !== undefined) {
      let result = {};

      if (entity[this.datastore.KEY]) {
        result = Object.assign({}, entity, {id: key.name});
        delete result[this.datastore.KEY];
      } else {
        result = Object.assign({}, entity.data, {id: key.name});
      }

      return result;
    } else {
      throw new TypeError(`Entity has no ID.`);
    }
  }
}