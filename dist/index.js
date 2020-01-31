module.exports =
/******/ (function(modules, runtime) { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	__webpack_require__.ab = __dirname + "/";
/******/
/******/ 	// the startup function
/******/ 	function startup() {
/******/ 		// Load entry module and return exports
/******/ 		return __webpack_require__(676);
/******/ 	};
/******/
/******/ 	// run startup
/******/ 	return startup();
/******/ })
/************************************************************************/
/******/ ({

/***/ 622:
/***/ (function(module) {

module.exports = require("path");

/***/ }),

/***/ 676:
/***/ (function(__unusedmodule, __unusedexports, __webpack_require__) {

const path = __webpack_require__(622)
const core = __webpack_require__(990);
const github = __webpack_require__(690);

function getCurrentVerison() {
  // const {version} = require(path.resolve(process.env.GITHUB_WORKSPACE, 'package.json'));
  console.log(__webpack_require__.ab + "npm-release-action/" + process.env.GITHUB_WORKSPACE + '/package.json')
  // core.exportVariable("NPM_PKG_VERSION", version);
  return '1.0.1'
}

function getCurrentTag() {
  const ref = github.context.ref;
  const tagPath = "refs/tags/";
  if (ref && ref.startsWith(tagPath)) {
    const tag = ref.substr(tagPath.length, ref.length);
    core.exportVariable("GITHUB_TAG_NAME", tag);
    return tag
  }
}

try {
  const currentTag = getCurrentTag();
  const curenttVersion = getCurrentVerison();

  console.log('Current tag: ',currentTag);
  console.log('Current version: ', currentVersion);
  console.log('Samever: ', currentVersion === currentTag);

} catch (error) {
  core.setFailed(error.message);
}

/***/ }),

/***/ 690:
/***/ (function() {

eval("require")("@actions/github");


/***/ }),

/***/ 990:
/***/ (function() {

eval("require")("@actions/core");


/***/ })

/******/ });