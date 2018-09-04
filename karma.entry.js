require('es6-shim');
require('reflect-metadata');
require('ts-helpers');
// Prevent Karma from running prematurely.
__karma__.loaded = function() { return; };
Promise.all([])
    .then(function() { return require.context('./tests/', true, /index\.spec\.ts/); })
    .then(function(context) { return context.keys().map(context); })
    .then(__karma__.start, __karma__.error);