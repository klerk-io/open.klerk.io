/**
 * Klerk API Community Edition
 *
 * This is the expected entry point for Cloud Functions
 *
 * @author  Philipp Bauer <pbauer@klerk.io>
 */

// Export modofun services as function handler
exports.lockers = require("./app/services/LockerService");