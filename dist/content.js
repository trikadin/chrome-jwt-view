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
/***/ function(module, exports, __webpack_require__) {

	'use strict';function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { 'default': obj };}var _page = __webpack_require__(1);var _page2 = _interopRequireDefault(_page);var _utils = __webpack_require__(
	2);
	
	const initialJWT = document.body.textContent.trim();
	
	if ((0, _utils.isJWT)(initialJWT)) {
	  (0, _page2.default)(initialJWT);} else 
	{
	  console.error('Invalid token');}

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';Object.defineProperty(exports, '__esModule', { value: true });exports.default = 
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	init;function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { 'default': obj };}function _asyncToGenerator(fn) {return function () {var gen = fn.apply(this, arguments);return new Promise(function (resolve, reject) {var callNext = step.bind(null, 'next');var callThrow = step.bind(null, 'throw');function step(key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(callNext, callThrow);}}callNext();});};}var _utils = __webpack_require__(2);var _editorHbs = __webpack_require__(3);var _editorHbs2 = _interopRequireDefault(_editorHbs);function parseChunk(str) {return JSON.parse(_utils.base64.from(str));}function renderChunk(node, str) {let newValue = '';try {newValue = JSON.stringify(parseChunk(str), null, 4);node.parentNode.classList.remove('error');} catch (ignore) {node.parentNode.classList.add('error');}node.textContent = newValue;}function onPasteCleaner(event) {event.preventDefault();const data = event.clipboardData.getData('text/plain');if (data) {document.execCommand('insertText', null, data);}}function init() {let 
	
	
	
	
	
	
	
	
	
	
	
	  updateVerifyBlock = _asyncToGenerator(function* () {
	    try {
	      if (yield (0, _utils.verifyJWT)(textarea.value, secret.value)) {
	        footer.classList.add('ok');
	        footer.textContent = 'Signature verified';} else 
	      {
	        footer.classList.remove('ok');
	        footer.textContent = 'Invalid signature';}} 
	
	    catch (err) {
	      console.error(err.stack);}});let 
	
	
	
	
	
	
	
	
	
	
	
	
	  rebuildToken = _asyncToGenerator(function* () {
	    try {
	      JSON.parse(this.textContent);
	      this.parentNode.classList.remove('error');} 
	    catch (ignore) {
	      this.parentNode.classList.add('error');}
	
	
	    let 
	    token = '', 
	    headerObj, 
	    payloadObj;
	
	    try {
	      headerObj = JSON.parse(header.textContent);
	      payloadObj = JSON.parse(payload.textContent);
	
	      token += (0, _utils.stringifyChunk)(headerObj) + '.' + (0, _utils.stringifyChunk)(payloadObj) + '.';} 
	    catch (ignore) {
	      updateVerifyBlock();
	      return;}
	
	
	    try {
	      token += _utils.base64.to((yield (0, _utils.signJWT)(headerObj, payloadObj, secret.value || '')));} 
	    catch (err) {
	      updateVerifyBlock();
	      console.error(err);
	      throw err;}
	
	
	    textarea.value = token;
	    updateVerifyBlock();});let initialToken = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];__webpack_require__(23);document.body.innerHTML = (0, _editorHbs2.default)({ token: initialToken });const textarea = document.getElementById('jwt'), header = document.getElementById('header'), payload = document.getElementById('payload'), secret = document.getElementById('secret'), footer = document.querySelector('footer');secret.addEventListener('input', updateVerifyBlock, false);function renderParsedJWT() {const token = textarea.value.split('.');renderChunk(header, token[0]);renderChunk(payload, token[1]);updateVerifyBlock();}
	
	
	  textarea.addEventListener('input', renderParsedJWT, false);
	  header.addEventListener('input', rebuildToken, false);
	  payload.addEventListener('input', rebuildToken, false);
	
	  header.addEventListener('paste', onPasteCleaner, false);
	  payload.addEventListener('paste', onPasteCleaner, false);
	
	  renderParsedJWT();}module.exports = exports.default;

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';Object.defineProperty(exports, '__esModule', { value: true });exports.stringifyChunk = stringifyChunk;exports.isJWT = isJWT;let 
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	signJWT = _asyncToGenerator(function* (header, payload, secret) {
	  const 
	  encoder = new TextEncoder(), 
	  algo = algorithms[header.alg], 
	  cryptoSubtle = crypto.subtle;
	
	  if (!algo) {
	    throw new TypeError('Unsupported algorithm');}
	
	
	  let partialToken = stringifyChunk(header) + '.' + stringifyChunk(payload);
	
	  const 
	  key = yield cryptoSubtle.importKey('raw', encoder.encode(secret), algo, false, ['sign']);
	
	  const 
	  signature = yield cryptoSubtle.sign(algo, key, encoder.encode(partialToken).buffer);
	
	  return toByteString(signature);});exports.signJWT = signJWT;let 
	
	
	verifyJWT = _asyncToGenerator(function* (token, secret) {let alg = arguments.length <= 2 || arguments[2] === undefined ? 'HS256' : arguments[2];
	  if (!isJWT(token)) {
	    return false;}
	
	
	  const 
	  algo = algorithms[alg], 
	  encoder = new TextEncoder(), 
	  chunks = token.split('.'), 
	  message = chunks.slice(0, 2).join('.'), 
	  signature = base64.from(chunks[2]), 
	  key = yield crypto.subtle.importKey('raw', encoder.encode(secret), algo, false, ['sign']), 
	  testSignature = yield crypto.subtle.sign(algo, key, encoder.encode(message));
	
	  return toByteString(testSignature) === signature;});exports.verifyJWT = verifyJWT;function _asyncToGenerator(fn) {return function () {var gen = fn.apply(this, arguments);return new Promise(function (resolve, reject) {var callNext = step.bind(null, 'next');var callThrow = step.bind(null, 'throw');function step(key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(callNext, callThrow);}}callNext();});};}function toByteString(buff) {return String.fromCharCode(...new Uint8Array(buff.buffer || buff));}const algorithms = { HS256: { name: 'HMAC', hash: { name: 'SHA-256' } } };exports.algorithms = algorithms;const base64 = { from(str) {return atob(str.replace(/-/g, '+').replace(/_/g, '/').replace(/\s/g, ''));}, to(str) {return btoa(str).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');} };exports.base64 = base64;function stringifyChunk(chunk) {if (typeof chunk === 'string') {chunk = JSON.parse(chunk);}return base64.to(JSON.stringify(chunk));}function isJWT(str) {const chunks = str.split('.');return chunks.length === 3 && chunks.every(function (chunk, index) {try {chunk = base64.from(chunk);if (index < 2) {JSON.parse(chunk);}return true;} catch (ignore) {console.error(ignore);console.error(ignore.stack);return false;}});}

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var Handlebars = __webpack_require__(4);
	module.exports = (Handlebars["default"] || Handlebars).template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
	    var helper;
	
	  return "<main>\n  <section class=\"column\">\n    <h1>\n      Encoded\n      <small>\n        Paste a token here\n      </small>\n    </h1>\n\n    <div class=\"section-body\">\n      <textarea id=\"jwt\">"
	    + container.escapeExpression(((helper = (helper = helpers.token || (depth0 != null ? depth0.token : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"token","hash":{},"data":data}) : helper)))
	    + "</textarea>\n    </div>\n  </section>\n\n  <section class=\"column\">\n    <h1>\n      Decoded\n    </h1>\n\n    <div class=\"section-body\">\n      <div class=\"chunk\">\n        <h2>Header</h2>\n\n        <div id=\"header\" class=\"chunk-body\" contenteditable></div>\n      </div>\n\n      <div class=\"chunk\">\n        <h2>Payload</h2>\n\n        <div id=\"payload\" class=\"chunk-body\" contenteditable></div>\n      </div>\n\n      <div class=\"chunk\">\n        <h2>Verify signature</h2>\n\n        <div id=\"signature\" class=\"chunk-body\">\n  HMACSHA256(\n    base64UrlEncode(header) + \".\" +\n    base64UrlEncode(payload),\n    <input type=\"text\" id=\"secret\" value=\"secret\">\n  )\n        </div>\n      </div>\n    </div>\n  </section>\n</main>\n<footer>\n\n</footer>\n";
	},"useData":true});

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	// Create a simple path alias to allow browserify to resolve
	// the runtime on a supported path.
	'use strict';module.exports = __webpack_require__(5)['default'];

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	// istanbul ignore next
	
	function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { 'default': obj };}
	
	// istanbul ignore next
	
	function _interopRequireWildcard(obj) {if (obj && obj.__esModule) {return obj;} else {var newObj = {};if (obj != null) {for (var key in obj) {if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];}}newObj['default'] = obj;return newObj;}}
	
	var _handlebarsBase = __webpack_require__(6);
	
	// Each of these augment the Handlebars object. No need to setup here.
	// (This is done to easily share code between commonjs and browse envs)
	
	var base = _interopRequireWildcard(_handlebarsBase);
	
	var _handlebarsSafeString = __webpack_require__(20);
	
	var _handlebarsSafeString2 = _interopRequireDefault(_handlebarsSafeString);
	
	var _handlebarsException = __webpack_require__(8);
	
	var _handlebarsException2 = _interopRequireDefault(_handlebarsException);
	
	var _handlebarsUtils = __webpack_require__(7);
	
	var Utils = _interopRequireWildcard(_handlebarsUtils);
	
	var _handlebarsRuntime = __webpack_require__(21);
	
	var runtime = _interopRequireWildcard(_handlebarsRuntime);
	
	var _handlebarsNoConflict = __webpack_require__(22);
	
	// For compatibility and usage outside of module systems, make the Handlebars object a namespace
	
	var _handlebarsNoConflict2 = _interopRequireDefault(_handlebarsNoConflict);
	
	function create() {
	  var hb = new base.HandlebarsEnvironment();
	
	  Utils.extend(hb, base);
	  hb.SafeString = _handlebarsSafeString2['default'];
	  hb.Exception = _handlebarsException2['default'];
	  hb.Utils = Utils;
	  hb.escapeExpression = Utils.escapeExpression;
	
	  hb.VM = runtime;
	  hb.template = function (spec) {
	    return runtime.template(spec, hb);};
	
	
	  return hb;}
	
	
	var inst = create();
	inst.create = create;
	
	_handlebarsNoConflict2['default'](inst);
	
	inst['default'] = inst;
	
	exports['default'] = inst;
	module.exports = exports['default'];

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.HandlebarsEnvironment = HandlebarsEnvironment;
	// istanbul ignore next
	
	function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { 'default': obj };}
	
	var _utils = __webpack_require__(7);
	
	var _exception = __webpack_require__(8);
	
	var _exception2 = _interopRequireDefault(_exception);
	
	var _helpers = __webpack_require__(9);
	
	var _decorators = __webpack_require__(17);
	
	var _logger = __webpack_require__(19);
	
	var _logger2 = _interopRequireDefault(_logger);
	
	var VERSION = '4.0.4';
	exports.VERSION = VERSION;
	var COMPILER_REVISION = 7;
	
	exports.COMPILER_REVISION = COMPILER_REVISION;
	var REVISION_CHANGES = { 
	  1: '<= 1.0.rc.2', // 1.0.rc.2 is actually rev2 but doesn't report it
	  2: '== 1.0.0-rc.3', 
	  3: '== 1.0.0-rc.4', 
	  4: '== 1.x.x', 
	  5: '== 2.0.0-alpha.x', 
	  6: '>= 2.0.0-beta.1', 
	  7: '>= 4.0.0' };
	
	
	exports.REVISION_CHANGES = REVISION_CHANGES;
	var objectType = '[object Object]';
	
	function HandlebarsEnvironment(helpers, partials, decorators) {
	  this.helpers = helpers || {};
	  this.partials = partials || {};
	  this.decorators = decorators || {};
	
	  _helpers.registerDefaultHelpers(this);
	  _decorators.registerDefaultDecorators(this);}
	
	
	HandlebarsEnvironment.prototype = { 
	  constructor: HandlebarsEnvironment, 
	
	  logger: _logger2['default'], 
	  log: _logger2['default'].log, 
	
	  registerHelper: function registerHelper(name, fn) {
	    if (_utils.toString.call(name) === objectType) {
	      if (fn) {
	        throw new _exception2['default']('Arg not supported with multiple helpers');}
	
	      _utils.extend(this.helpers, name);} else 
	    {
	      this.helpers[name] = fn;}}, 
	
	
	  unregisterHelper: function unregisterHelper(name) {
	    delete this.helpers[name];}, 
	
	
	  registerPartial: function registerPartial(name, partial) {
	    if (_utils.toString.call(name) === objectType) {
	      _utils.extend(this.partials, name);} else 
	    {
	      if (typeof partial === 'undefined') {
	        throw new _exception2['default']('Attempting to register a partial called "' + name + '" as undefined');}
	
	      this.partials[name] = partial;}}, 
	
	
	  unregisterPartial: function unregisterPartial(name) {
	    delete this.partials[name];}, 
	
	
	  registerDecorator: function registerDecorator(name, fn) {
	    if (_utils.toString.call(name) === objectType) {
	      if (fn) {
	        throw new _exception2['default']('Arg not supported with multiple decorators');}
	
	      _utils.extend(this.decorators, name);} else 
	    {
	      this.decorators[name] = fn;}}, 
	
	
	  unregisterDecorator: function unregisterDecorator(name) {
	    delete this.decorators[name];} };
	
	
	
	var log = _logger2['default'].log;
	
	exports.log = log;
	exports.createFrame = _utils.createFrame;
	exports.logger = _logger2['default'];

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';
	
	exports.__esModule = true;
	exports.extend = extend;
	exports.indexOf = indexOf;
	exports.escapeExpression = escapeExpression;
	exports.isEmpty = isEmpty;
	exports.createFrame = createFrame;
	exports.blockParams = blockParams;
	exports.appendContextPath = appendContextPath;
	var escape = { 
	  '&': '&amp;', 
	  '<': '&lt;', 
	  '>': '&gt;', 
	  '"': '&quot;', 
	  "'": '&#x27;', 
	  '`': '&#x60;', 
	  '=': '&#x3D;' };
	
	
	var badChars = /[&<>"'`=]/g, 
	possible = /[&<>"'`=]/;
	
	function escapeChar(chr) {
	  return escape[chr];}
	
	
	function extend(obj /* , ...source */) {
	  for (var i = 1; i < arguments.length; i++) {
	    for (var key in arguments[i]) {
	      if (Object.prototype.hasOwnProperty.call(arguments[i], key)) {
	        obj[key] = arguments[i][key];}}}
	
	
	
	
	  return obj;}
	
	
	var toString = Object.prototype.toString;
	
	// Sourced from lodash
	// https://github.com/bestiejs/lodash/blob/master/LICENSE.txt
	/* eslint-disable func-style */
	exports.toString = toString;
	var isFunction = function isFunction(value) {
	  return typeof value === 'function';};
	
	// fallback for older versions of Chrome and Safari
	/* istanbul ignore next */
	if (isFunction(/x/)) {
	  exports.isFunction = isFunction = function (value) {
	    return typeof value === 'function' && toString.call(value) === '[object Function]';};}
	
	
	exports.isFunction = isFunction;
	
	/* eslint-enable func-style */
	
	/* istanbul ignore next */
	var isArray = Array.isArray || function (value) {
	  return value && typeof value === 'object' ? toString.call(value) === '[object Array]' : false;};
	
	
	// Older IE versions do not directly support indexOf so we must implement our own, sadly.
	exports.isArray = isArray;
	
	function indexOf(array, value) {
	  for (var i = 0, len = array.length; i < len; i++) {
	    if (array[i] === value) {
	      return i;}}
	
	
	  return -1;}
	
	
	function escapeExpression(string) {
	  if (typeof string !== 'string') {
	    // don't escape SafeStrings, since they're already safe
	    if (string && string.toHTML) {
	      return string.toHTML();} else 
	    if (string == null) {
	      return '';} else 
	    if (!string) {
	      return string + '';}
	
	
	    // Force a string conversion as this will be done by the append regardless and
	    // the regex test will do this transparently behind the scenes, causing issues if
	    // an object's to string has escaped characters in it.
	    string = '' + string;}
	
	
	  if (!possible.test(string)) {
	    return string;}
	
	  return string.replace(badChars, escapeChar);}
	
	
	function isEmpty(value) {
	  if (!value && value !== 0) {
	    return true;} else 
	  if (isArray(value) && value.length === 0) {
	    return true;} else 
	  {
	    return false;}}
	
	
	
	function createFrame(object) {
	  var frame = extend({}, object);
	  frame._parent = object;
	  return frame;}
	
	
	function blockParams(params, ids) {
	  params.path = ids;
	  return params;}
	
	
	function appendContextPath(contextPath, id) {
	  return (contextPath ? contextPath + '.' : '') + id;}

/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict';
	
	exports.__esModule = true;
	
	var errorProps = ['description', 'fileName', 'lineNumber', 'message', 'name', 'number', 'stack'];
	
	function Exception(message, node) {
	  var loc = node && node.loc, 
	  line = void 0, 
	  column = void 0;
	  if (loc) {
	    line = loc.start.line;
	    column = loc.start.column;
	
	    message += ' - ' + line + ':' + column;}
	
	
	  var tmp = Error.prototype.constructor.call(this, message);
	
	  // Unfortunately errors are not enumerable in Chrome (at least), so `for prop in tmp` doesn't work.
	  for (var idx = 0; idx < errorProps.length; idx++) {
	    this[errorProps[idx]] = tmp[errorProps[idx]];}
	
	
	  /* istanbul ignore else */
	  if (Error.captureStackTrace) {
	    Error.captureStackTrace(this, Exception);}
	
	
	  if (loc) {
	    this.lineNumber = line;
	    this.column = column;}}
	
	
	
	Exception.prototype = new Error();
	
	exports['default'] = Exception;
	module.exports = exports['default'];

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.registerDefaultHelpers = registerDefaultHelpers;
	// istanbul ignore next
	
	function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { 'default': obj };}
	
	var _helpersBlockHelperMissing = __webpack_require__(10);
	
	var _helpersBlockHelperMissing2 = _interopRequireDefault(_helpersBlockHelperMissing);
	
	var _helpersEach = __webpack_require__(11);
	
	var _helpersEach2 = _interopRequireDefault(_helpersEach);
	
	var _helpersHelperMissing = __webpack_require__(12);
	
	var _helpersHelperMissing2 = _interopRequireDefault(_helpersHelperMissing);
	
	var _helpersIf = __webpack_require__(13);
	
	var _helpersIf2 = _interopRequireDefault(_helpersIf);
	
	var _helpersLog = __webpack_require__(14);
	
	var _helpersLog2 = _interopRequireDefault(_helpersLog);
	
	var _helpersLookup = __webpack_require__(15);
	
	var _helpersLookup2 = _interopRequireDefault(_helpersLookup);
	
	var _helpersWith = __webpack_require__(16);
	
	var _helpersWith2 = _interopRequireDefault(_helpersWith);
	
	function registerDefaultHelpers(instance) {
	  _helpersBlockHelperMissing2['default'](instance);
	  _helpersEach2['default'](instance);
	  _helpersHelperMissing2['default'](instance);
	  _helpersIf2['default'](instance);
	  _helpersLog2['default'](instance);
	  _helpersLookup2['default'](instance);
	  _helpersWith2['default'](instance);}

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _utils = __webpack_require__(7);
	
	exports['default'] = function (instance) {
	  instance.registerHelper('blockHelperMissing', function (context, options) {
	    var inverse = options.inverse, 
	    fn = options.fn;
	
	    if (context === true) {
	      return fn(this);} else 
	    if (context === false || context == null) {
	      return inverse(this);} else 
	    if (_utils.isArray(context)) {
	      if (context.length > 0) {
	        if (options.ids) {
	          options.ids = [options.name];}
	
	
	        return instance.helpers.each(context, options);} else 
	      {
	        return inverse(this);}} else 
	
	    {
	      if (options.data && options.ids) {
	        var data = _utils.createFrame(options.data);
	        data.contextPath = _utils.appendContextPath(options.data.contextPath, options.name);
	        options = { data: data };}
	
	
	      return fn(context, options);}});};
	
	
	
	
	module.exports = exports['default'];

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	// istanbul ignore next
	
	function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { 'default': obj };}
	
	var _utils = __webpack_require__(7);
	
	var _exception = __webpack_require__(8);
	
	var _exception2 = _interopRequireDefault(_exception);
	
	exports['default'] = function (instance) {
	  instance.registerHelper('each', function (context, options) {
	    if (!options) {
	      throw new _exception2['default']('Must pass iterator to #each');}
	
	
	    var fn = options.fn, 
	    inverse = options.inverse, 
	    i = 0, 
	    ret = '', 
	    data = void 0, 
	    contextPath = void 0;
	
	    if (options.data && options.ids) {
	      contextPath = _utils.appendContextPath(options.data.contextPath, options.ids[0]) + '.';}
	
	
	    if (_utils.isFunction(context)) {
	      context = context.call(this);}
	
	
	    if (options.data) {
	      data = _utils.createFrame(options.data);}
	
	
	    function execIteration(field, index, last) {
	      if (data) {
	        data.key = field;
	        data.index = index;
	        data.first = index === 0;
	        data.last = !!last;
	
	        if (contextPath) {
	          data.contextPath = contextPath + field;}}
	
	
	
	      ret = ret + fn(context[field], { 
	        data: data, 
	        blockParams: _utils.blockParams([context[field], field], [contextPath + field, null]) });}
	
	
	
	    if (context && typeof context === 'object') {
	      if (_utils.isArray(context)) {
	        for (var j = context.length; i < j; i++) {
	          if (i in context) {
	            execIteration(i, i, i === context.length - 1);}}} else 
	
	
	      {
	        var priorKey = void 0;
	
	        for (var key in context) {
	          if (context.hasOwnProperty(key)) {
	            // We're running the iterations one step out of sync so we can detect
	            // the last iteration without have to scan the object twice and create
	            // an itermediate keys array.
	            if (priorKey !== void 0) {
	              execIteration(priorKey, i - 1);}
	
	            priorKey = key;
	            i++;}}
	
	
	        if (priorKey !== void 0) {
	          execIteration(priorKey, i - 1, true);}}}
	
	
	
	
	    if (i === 0) {
	      ret = inverse(this);}
	
	
	    return ret;});};
	
	
	
	module.exports = exports['default'];

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	// istanbul ignore next
	
	function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { 'default': obj };}
	
	var _exception = __webpack_require__(8);
	
	var _exception2 = _interopRequireDefault(_exception);
	
	exports['default'] = function (instance) {
	  instance.registerHelper('helperMissing', function () /* [args, ]options */{
	    if (arguments.length === 1) {
	      // A missing field in a {{foo}} construct.
	      return void 0;} else 
	    {
	      // Someone is actually trying to call something, blow up.
	      throw new _exception2['default']('Missing helper: "' + arguments[arguments.length - 1].name + '"');}});};
	
	
	
	
	module.exports = exports['default'];

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _utils = __webpack_require__(7);
	
	exports['default'] = function (instance) {
	  instance.registerHelper('if', function (conditional, options) {
	    if (_utils.isFunction(conditional)) {
	      conditional = conditional.call(this);}
	
	
	    // Default behavior is to render the positive path if the value is truthy and not empty.
	    // The `includeZero` option may be set to treat the condtional as purely not empty based on the
	    // behavior of isEmpty. Effectively this determines if 0 is handled by the positive path or negative.
	    if (!options.hash.includeZero && !conditional || _utils.isEmpty(conditional)) {
	      return options.inverse(this);} else 
	    {
	      return options.fn(this);}});
	
	
	
	  instance.registerHelper('unless', function (conditional, options) {
	    return instance.helpers['if'].call(this, conditional, { fn: options.inverse, inverse: options.fn, hash: options.hash });});};
	
	
	
	module.exports = exports['default'];

/***/ },
/* 14 */
/***/ function(module, exports) {

	'use strict';
	
	exports.__esModule = true;
	
	exports['default'] = function (instance) {
	  instance.registerHelper('log', function () /* message, options */{
	    var args = [void 0], 
	    options = arguments[arguments.length - 1];
	    for (var i = 0; i < arguments.length - 1; i++) {
	      args.push(arguments[i]);}
	
	
	    var level = 1;
	    if (options.hash.level != null) {
	      level = options.hash.level;} else 
	    if (options.data && options.data.level != null) {
	      level = options.data.level;}
	
	    args[0] = level;
	
	    instance.log.apply(instance, args);});};
	
	
	
	module.exports = exports['default'];

/***/ },
/* 15 */
/***/ function(module, exports) {

	'use strict';
	
	exports.__esModule = true;
	
	exports['default'] = function (instance) {
	  instance.registerHelper('lookup', function (obj, field) {
	    return obj && obj[field];});};
	
	
	
	module.exports = exports['default'];

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _utils = __webpack_require__(7);
	
	exports['default'] = function (instance) {
	  instance.registerHelper('with', function (context, options) {
	    if (_utils.isFunction(context)) {
	      context = context.call(this);}
	
	
	    var fn = options.fn;
	
	    if (!_utils.isEmpty(context)) {
	      var data = options.data;
	      if (options.data && options.ids) {
	        data = _utils.createFrame(options.data);
	        data.contextPath = _utils.appendContextPath(options.data.contextPath, options.ids[0]);}
	
	
	      return fn(context, { 
	        data: data, 
	        blockParams: _utils.blockParams([context], [data && data.contextPath]) });} else 
	
	    {
	      return options.inverse(this);}});};
	
	
	
	
	module.exports = exports['default'];

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.registerDefaultDecorators = registerDefaultDecorators;
	// istanbul ignore next
	
	function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { 'default': obj };}
	
	var _decoratorsInline = __webpack_require__(18);
	
	var _decoratorsInline2 = _interopRequireDefault(_decoratorsInline);
	
	function registerDefaultDecorators(instance) {
	  _decoratorsInline2['default'](instance);}

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _utils = __webpack_require__(7);
	
	exports['default'] = function (instance) {
	  instance.registerDecorator('inline', function (fn, props, container, options) {
	    var ret = fn;
	    if (!props.partials) {
	      props.partials = {};
	      ret = function (context, options) {
	        // Create a new partials stack frame prior to exec.
	        var original = container.partials;
	        container.partials = _utils.extend({}, original, props.partials);
	        var ret = fn(context, options);
	        container.partials = original;
	        return ret;};}
	
	
	
	    props.partials[options.args[0]] = options.fn;
	
	    return ret;});};
	
	
	
	module.exports = exports['default'];

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _utils = __webpack_require__(7);
	
	var logger = { 
	  methodMap: ['debug', 'info', 'warn', 'error'], 
	  level: 'info', 
	
	  // Maps a given level value to the `methodMap` indexes above.
	  lookupLevel: function lookupLevel(level) {
	    if (typeof level === 'string') {
	      var levelMap = _utils.indexOf(logger.methodMap, level.toLowerCase());
	      if (levelMap >= 0) {
	        level = levelMap;} else 
	      {
	        level = parseInt(level, 10);}}
	
	
	
	    return level;}, 
	
	
	  // Can be overridden in the host environment
	  log: function log(level) {
	    level = logger.lookupLevel(level);
	
	    if (typeof console !== 'undefined' && logger.lookupLevel(logger.level) <= level) {
	      var method = logger.methodMap[level];
	      if (!console[method]) {
	        // eslint-disable-line no-console
	        method = 'log';}
	
	
	      for (var _len = arguments.length, message = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	        message[_key - 1] = arguments[_key];}
	
	
	      console[method].apply(console, message); // eslint-disable-line no-console
	    }} };
	
	
	
	exports['default'] = logger;
	module.exports = exports['default'];

/***/ },
/* 20 */
/***/ function(module, exports) {

	// Build out our basic SafeString type
	'use strict';
	
	exports.__esModule = true;
	function SafeString(string) {
	  this.string = string;}
	
	
	SafeString.prototype.toString = SafeString.prototype.toHTML = function () {
	  return '' + this.string;};
	
	
	exports['default'] = SafeString;
	module.exports = exports['default'];

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.checkRevision = checkRevision;
	exports.template = template;
	exports.wrapProgram = wrapProgram;
	exports.resolvePartial = resolvePartial;
	exports.invokePartial = invokePartial;
	exports.noop = noop;
	// istanbul ignore next
	
	function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { 'default': obj };}
	
	// istanbul ignore next
	
	function _interopRequireWildcard(obj) {if (obj && obj.__esModule) {return obj;} else {var newObj = {};if (obj != null) {for (var key in obj) {if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];}}newObj['default'] = obj;return newObj;}}
	
	var _utils = __webpack_require__(7);
	
	var Utils = _interopRequireWildcard(_utils);
	
	var _exception = __webpack_require__(8);
	
	var _exception2 = _interopRequireDefault(_exception);
	
	var _base = __webpack_require__(6);
	
	function checkRevision(compilerInfo) {
	  var compilerRevision = compilerInfo && compilerInfo[0] || 1, 
	  currentRevision = _base.COMPILER_REVISION;
	
	  if (compilerRevision !== currentRevision) {
	    if (compilerRevision < currentRevision) {
	      var runtimeVersions = _base.REVISION_CHANGES[currentRevision], 
	      compilerVersions = _base.REVISION_CHANGES[compilerRevision];
	      throw new _exception2['default']('Template was precompiled with an older version of Handlebars than the current runtime. ' + 'Please update your precompiler to a newer version (' + runtimeVersions + ') or downgrade your runtime to an older version (' + compilerVersions + ').');} else 
	    {
	      // Use the embedded version info since the runtime doesn't know about this revision yet
	      throw new _exception2['default']('Template was precompiled with a newer version of Handlebars than the current runtime. ' + 'Please update your runtime to a newer version (' + compilerInfo[1] + ').');}}}
	
	
	
	
	function template(templateSpec, env) {
	  /* istanbul ignore next */
	  if (!env) {
	    throw new _exception2['default']('No environment passed to template');}
	
	  if (!templateSpec || !templateSpec.main) {
	    throw new _exception2['default']('Unknown template object: ' + typeof templateSpec);}
	
	
	  templateSpec.main.decorator = templateSpec.main_d;
	
	  // Note: Using env.VM references rather than local var references throughout this section to allow
	  // for external users to override these as psuedo-supported APIs.
	  env.VM.checkRevision(templateSpec.compiler);
	
	  function invokePartialWrapper(partial, context, options) {
	    if (options.hash) {
	      context = Utils.extend({}, context, options.hash);
	      if (options.ids) {
	        options.ids[0] = true;}}
	
	
	
	    partial = env.VM.resolvePartial.call(this, partial, context, options);
	    var result = env.VM.invokePartial.call(this, partial, context, options);
	
	    if (result == null && env.compile) {
	      options.partials[options.name] = env.compile(partial, templateSpec.compilerOptions, env);
	      result = options.partials[options.name](context, options);}
	
	    if (result != null) {
	      if (options.indent) {
	        var lines = result.split('\n');
	        for (var i = 0, l = lines.length; i < l; i++) {
	          if (!lines[i] && i + 1 === l) {
	            break;}
	
	
	          lines[i] = options.indent + lines[i];}
	
	        result = lines.join('\n');}
	
	      return result;} else 
	    {
	      throw new _exception2['default']('The partial ' + options.name + ' could not be compiled when running in runtime-only mode');}}
	
	
	
	  // Just add water
	  var container = { 
	    strict: function strict(obj, name) {
	      if (!(name in obj)) {
	        throw new _exception2['default']('"' + name + '" not defined in ' + obj);}
	
	      return obj[name];}, 
	
	    lookup: function lookup(depths, name) {
	      var len = depths.length;
	      for (var i = 0; i < len; i++) {
	        if (depths[i] && depths[i][name] != null) {
	          return depths[i][name];}}}, 
	
	
	
	    lambda: function lambda(current, context) {
	      return typeof current === 'function' ? current.call(context) : current;}, 
	
	
	    escapeExpression: Utils.escapeExpression, 
	    invokePartial: invokePartialWrapper, 
	
	    fn: function fn(i) {
	      var ret = templateSpec[i];
	      ret.decorator = templateSpec[i + '_d'];
	      return ret;}, 
	
	
	    programs: [], 
	    program: function program(i, data, declaredBlockParams, blockParams, depths) {
	      var programWrapper = this.programs[i], 
	      fn = this.fn(i);
	      if (data || depths || blockParams || declaredBlockParams) {
	        programWrapper = wrapProgram(this, i, fn, data, declaredBlockParams, blockParams, depths);} else 
	      if (!programWrapper) {
	        programWrapper = this.programs[i] = wrapProgram(this, i, fn);}
	
	      return programWrapper;}, 
	
	
	    data: function data(value, depth) {
	      while (value && depth--) {
	        value = value._parent;}
	
	      return value;}, 
	
	    merge: function merge(param, common) {
	      var obj = param || common;
	
	      if (param && common && param !== common) {
	        obj = Utils.extend({}, common, param);}
	
	
	      return obj;}, 
	
	
	    noop: env.VM.noop, 
	    compilerInfo: templateSpec.compiler };
	
	
	  function ret(context) {
	    var options = arguments.length <= 1 || arguments[1] === void 0 ? {} : arguments[1];
	
	    var data = options.data;
	
	    ret._setup(options);
	    if (!options.partial && templateSpec.useData) {
	      data = initData(context, data);}
	
	    var depths = void 0, 
	    blockParams = templateSpec.useBlockParams ? [] : void 0;
	    if (templateSpec.useDepths) {
	      if (options.depths) {
	        depths = context !== options.depths[0] ? [context].concat(options.depths) : options.depths;} else 
	      {
	        depths = [context];}}
	
	
	
	    function main(context /*, options*/) {
	      return '' + templateSpec.main(container, context, container.helpers, container.partials, data, blockParams, depths);}
	
	    main = executeDecorators(templateSpec.main, main, container, options.depths || [], data, blockParams);
	    return main(context, options);}
	
	  ret.isTop = true;
	
	  ret._setup = function (options) {
	    if (!options.partial) {
	      container.helpers = container.merge(options.helpers, env.helpers);
	
	      if (templateSpec.usePartial) {
	        container.partials = container.merge(options.partials, env.partials);}
	
	      if (templateSpec.usePartial || templateSpec.useDecorators) {
	        container.decorators = container.merge(options.decorators, env.decorators);}} else 
	
	    {
	      container.helpers = options.helpers;
	      container.partials = options.partials;
	      container.decorators = options.decorators;}};
	
	
	
	  ret._child = function (i, data, blockParams, depths) {
	    if (templateSpec.useBlockParams && !blockParams) {
	      throw new _exception2['default']('must pass block params');}
	
	    if (templateSpec.useDepths && !depths) {
	      throw new _exception2['default']('must pass parent depths');}
	
	
	    return wrapProgram(container, i, templateSpec[i], data, 0, blockParams, depths);};
	
	  return ret;}
	
	
	function wrapProgram(container, i, fn, data, declaredBlockParams, blockParams, depths) {
	  function prog(context) {
	    var options = arguments.length <= 1 || arguments[1] === void 0 ? {} : arguments[1];
	
	    var currentDepths = depths;
	    if (depths && context !== depths[0]) {
	      currentDepths = [context].concat(depths);}
	
	
	    return fn(container, context, container.helpers, container.partials, options.data || data, blockParams && [options.blockParams].concat(blockParams), currentDepths);}
	
	
	  prog = executeDecorators(fn, prog, container, depths, data, blockParams);
	
	  prog.program = i;
	  prog.depth = depths ? depths.length : 0;
	  prog.blockParams = declaredBlockParams || 0;
	  return prog;}
	
	
	function resolvePartial(partial, context, options) {
	  if (!partial) {
	    if (options.name === '@partial-block') {
	      partial = options.data['partial-block'];} else 
	    {
	      partial = options.partials[options.name];}} else 
	
	  if (!partial.call && !options.name) {
	    // This is a dynamic partial that returned a string
	    options.name = partial;
	    partial = options.partials[partial];}
	
	  return partial;}
	
	
	function invokePartial(partial, context, options) {
	  options.partial = true;
	  if (options.ids) {
	    options.data.contextPath = options.ids[0] || options.data.contextPath;}
	
	
	  var partialBlock = void 0;
	  if (options.fn && options.fn !== noop) {
	    options.data = _base.createFrame(options.data);
	    partialBlock = options.data['partial-block'] = options.fn;
	
	    if (partialBlock.partials) {
	      options.partials = Utils.extend({}, options.partials, partialBlock.partials);}}
	
	
	
	  if (partial === void 0 && partialBlock) {
	    partial = partialBlock;}
	
	
	  if (partial === void 0) {
	    throw new _exception2['default']('The partial ' + options.name + ' could not be found');} else 
	  if (partial instanceof Function) {
	    return partial(context, options);}}
	
	
	
	function noop() {
	  return '';}
	
	
	function initData(context, data) {
	  if (!data || !('root' in data)) {
	    data = data ? _base.createFrame(data) : {};
	    data.root = context;}
	
	  return data;}
	
	
	function executeDecorators(fn, prog, container, depths, data, blockParams) {
	  if (fn.decorator) {
	    var props = {};
	    prog = fn.decorator(prog, props, container, depths && depths[0], data, blockParams, depths);
	    Utils.extend(prog, props);}
	
	  return prog;}

/***/ },
/* 22 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {/* global window */
	'use strict';
	
	exports.__esModule = true;
	
	exports['default'] = function (Handlebars) {
	  /* istanbul ignore next */
	  var root = typeof global !== 'undefined' ? global : window, 
	  $Handlebars = root.Handlebars;
	  /* istanbul ignore next */
	  Handlebars.noConflict = function () {
	    if (root.Handlebars === Handlebars) {
	      root.Handlebars = $Handlebars;}};};
	
	
	
	
	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(24);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(26)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js!./editor.css", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js!./editor.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(25)();
	// imports
	
	
	// module
	exports.push([module.id, "main{width:90%;margin:0 auto;display:flex;justify-content:space-between;font-family:Helvetica,Arial,sans-serif}.column{width:48%;display:flex;flex-direction:column}.column>h1{font-size:28px;font-weight:400;margin:0 0 20px}.column>h1>small{font-size:10px;color:#979797;text-transform:uppercase}.section-body{flex-grow:1;display:flex;flex-direction:column}#jwt{display:block;flex-grow:1;width:100%;font-family:Courier New,monospace;font-size:20px;border:1px solid hsla(0,0%,61%,.5);padding:20px;outline:none;resize:vertical}.chunk{flex-grow:1;display:flex;flex-direction:column;border:solid hsla(0,0%,61%,.5);border-width:1px 1px 0}.chunk:last-child{border-bottom-width:1px}.chunk>h2{font-size:12px;padding:0 10px;margin:0;border-bottom:1px solid hsla(0,0%,61%,.5);line-height:30px;font-weight:400;text-transform:uppercase}.chunk.error>h2{background-color:rgba(255,0,0,.5)}.chunk>h2>span{color:#979797}.chunk-body{box-sizing:border-box;flex-grow:1;font-size:14px;color:#333;padding:20px;white-space:pre-wrap}#header{color:#fb015b}#payload{color:#d63aff}#signature{color:#00b9f1}footer{width:90%;background:red;margin:20px auto;color:#fff;font-size:30px;text-align:center;padding:10px 0}footer.ok{background:#00b9f1}", ""]);
	
	// exports


/***/ },
/* 25 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	"use strict";module.exports = function () {
		var list = [];
	
		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for (var i = 0; i < this.length; i++) {
				var item = this[i];
				if (item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");} else 
				{
					result.push(item[1]);}}
	
	
			return result.join("");};
	
	
		// import a list of modules into the list
		list.i = function (modules, mediaQuery) {
			if (typeof modules === "string") 
			modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for (var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if (typeof id === "number") 
				alreadyImportedModules[id] = true;}
	
			for (i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if (typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if (mediaQuery && !item[2]) {
						item[2] = mediaQuery;} else 
					if (mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";}
	
					list.push(item);}}};
	
	
	
		return list;};

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];
	
	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}
	
		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();
	
		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";
	
		var styles = listToStyles(list);
		addStylesToDom(styles, options);
	
		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}
	
	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}
	
	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}
	
	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}
	
	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}
	
	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}
	
	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}
	
	function addStyle(obj, options) {
		var styleElement, update, remove;
	
		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}
	
		update(obj);
	
		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}
	
	var replaceText = (function () {
		var textStore = [];
	
		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();
	
	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;
	
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}
	
	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;
	
		if(media) {
			styleElement.setAttribute("media", media)
		}
	
		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}
	
	function updateLink(linkElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;
	
		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}
	
		var blob = new Blob([css], { type: "text/css" });
	
		var oldSrc = linkElement.href;
	
		linkElement.href = URL.createObjectURL(blob);
	
		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ }
/******/ ]);