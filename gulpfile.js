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
gulp.task("clean", () => del(paths.build));

// Copy package.json for cloud function bundle
gulp.task("copy-package.json", () => {
  return gulp
    .src("package.json")
    .pipe(gulp.dest(paths.build));
});

// Copy environment for cloud function bundle
gulp.task("copy-dotenv", () => {
  return gulp
    .src(".env")
    .pipe(gulp.dest(paths.build));
});

// Build the application
gulp.task("build", ["copy-package.json", "copy-dotenv"], () => {
  return gulp
    .src(path.join(paths.source, "**/*.js"))
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
    .pipe(babel())
    .pipe(gulp.dest(paths.build));
});

// Define the default task (when running 'gulp' command from CLI)
gulp.task("default", ["build"]);