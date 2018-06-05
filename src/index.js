/**
 * Klerk API Community Edition
 *
 * This is the expected entry point for Cloud Functions
 *
 * @author  Philipp Bauer <pbauer@klerk.io>
 */
require("dotenv").config();

// Export modofun services as function handler
exports.lockers = require("./app").lockerService;