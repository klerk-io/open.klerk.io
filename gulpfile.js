/**
 * IMPORTS
 */

let path = require("path");
let del = require("del");

let gulp = require("gulp");
let babel = require("gulp-babel");
let eslint = require("gulp-eslint");
let rename = require("gulp-rename");

/**
 * CONFIGURATION
 */

// Paths to relevant directories
let paths = {
  source: "src",
  build: "build"
};

/**
 * GULP TASKS
 */

// Remove previous build
gulp.task("clean", function() { del(paths.build); });

// Copy package.json for cloud function bundle
gulp.task("copy-package.json", function() {
  return gulp
    .src("package.json")
    .pipe(gulp.dest(paths.build));
});

// Copy environment for cloud function bundle
gulp.task("copy-dotenv", function() {
  return gulp
    .src(".env")
    .pipe(gulp.dest(paths.build));
});

// Copy environment for local function bundle
gulp.task("copy-dotenv-local", function() {
  return gulp
    .src(".env-local")
    .pipe(rename(".env"))
    .pipe(gulp.dest(paths.build));
});

// Transpile source code
gulp.task("transpile", function() {
  return gulp
    .src(path.join(paths.source, "**/*.js"))
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
    .pipe(babel())
    .pipe(gulp.dest(paths.build));
});

// Build the application for cloud
gulp.task("build", ["copy-package.json", "copy-dotenv", "transpile"]);

// Build the application for local
gulp.task("build-local", ["copy-package.json", "copy-dotenv-local", "transpile"]);

// Define the default task (when running 'gulp' command from CLI)
gulp.task("default", ["build"]);