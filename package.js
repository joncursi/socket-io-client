Package.describe({
  name: 'joncursi:socket-io-client',
  summary: 'A Meteor package wrapper for the official socket.io-client',
  version: '0.1.1',
  git: 'https://github.com/joncursi/socket-io-client'
});

Npm.depends({
  'socket.io-client': '1.2.0'
});

Package.onUse(function (api, where) {
  api.versionsFrom('0.1.0');
  api.addFiles(['joncursi:socket-io-client.js'], 'server');
  if (api.export) {
    api.export('io');
  }
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('joncursi:socket-io-client');
  api.addFiles('joncursi:socket-io-client-tests.js');
});