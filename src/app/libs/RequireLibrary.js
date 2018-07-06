/**
 * Capitalize a string (how is this not a String prototype in 2018?)
 * @param  {String} string
 * @returns {String}
 */
function capitalize(string) {
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
 * @returns {Class}
 */
function requireLib(path, platform) {
  return require(`../libs/${path}/${capitalize(path)}${capitalize(platform)}`).default;
}

module.exports = requireLib;