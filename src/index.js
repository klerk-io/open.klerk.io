/**
 * Klerk API Community Edition
 *
 * This is the expected entry point for Cloud Functions
 *
 * @author  Philipp Bauer <pbauer@klerk.io>
 */
require("dotenv").config();

if (process.env.APP_PLATFORM === "gcloud") {
  console.log("Start Google Cloud Trace Agent");
  require('@google-cloud/trace-agent').start({
    plugins: { 'modofun': 'modofun-trace-agent-plugin' }
  });
}

// Export modofun services as function handler
exports.lockers = require("./app/services/LockerService");