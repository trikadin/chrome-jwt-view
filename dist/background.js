/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	'use strict';
	
	const 
	editedRequests = {}, 
	requestsFilter = { 
	  urls: ['http://*/*', 'https://*/*'], 
	  types: ['main_frame'] };
	
	
	chrome.webRequest.onHeadersReceived.addListener(
	function (_ref) {let responseHeaders = _ref.responseHeaders;let requestId = _ref.requestId;let tabId = _ref.tabId;return (function () 
	
	  {
	    if (responseHeaders && tabId !== -1) {
	      const ctHeader = responseHeaders.find(function (_ref2) {let name = _ref2.name;return (/^content-type$/i.test(name));});
	
	      if (ctHeader && ctHeader.value === 'application/jwt') {
	        ctHeader.value = 'text/jwt';
	        editedRequests[requestId] = true;
	        return { responseHeaders };}}})();}, 
	
	
	
	
	requestsFilter, 
	
	['responseHeaders', 'blocking']);
	
	
	chrome.webRequest.onCompleted.addListener(
	function (_ref3) {let requestId = _ref3.requestId;let tabId = _ref3.tabId;return (function () {
	    if (editedRequests[requestId]) {
	      chrome.tabs.executeScript(tabId, { file: 'content.js' });}})();}, 
	
	
	
	requestsFilter);

/***/ }
/******/ ]);