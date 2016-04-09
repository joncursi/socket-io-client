# socket-io-client
A Meteor wrapper for the npm [socket.io-client](https://www.npmjs.org/package/socket.io-client) binary package.

## Meteor 1.3+
Meteor 1.3+ projects should install [Socket IO](https://www.npmjs.com/package/socket.io-client) directly from npm instead of using this package.

```
meteor npm install --save socket.io-client
```

For more information, refer to the [Meteor Guide](http://guide.meteor.com/1.3-migration.html#packages)

## Pre Meteor 1.3

### Purpose
This package enables the Meteor server to communicate with an external server over a socket.io connection. Once a the connection is established to the external server, the Meteor server behaves as the client and receives the data stream.

### Usage
This package exposes a global variable `io` on the Meteor server in order to establish a websocket connection. Example usage:

```javascript
// server/file.js

// define the websocket connection using the `io` global variable
var socket = io('https://path-to-external-server-goes-here/');

// subscribe to a data feed
socket.emit('subscribe', 'data-feed-name-goes-here');

// we can now handle connect, disconnect, and data-driven events
// NOTE: you must open up a new fiber using Meteor.bindEnvironment
// in order to perform Mongo read/writes or call Meteor methods
// within the socket connection

// on connect
socket.on('connect', Meteor.bindEnvironment(function() {
  console.log('Connected to the websocket!');
  Meteor.call('methodName1');

  // on data event
  socket.on('data-event', Meteor.bindEnvironment(function(data) {
    console.log(data);
    Meteor.call('methodName2');
  }, function(e) {
    throw e;
  }));

  // on disconnect
  socket.on('disconnect', Meteor.bindEnvironment(function() {
    console.log('Disconnected from the websocket!');
    Meteor.call('methodName3');
  }, function(e) {
    throw e;
  }));

}, function(e) {
  throw e;
}));
```

### Supported Architectures
This binary package is compiled with [Meteor Build](https://www.meteor.com/services/build) and should work on all four of the officially supported Meteor architectures:
- OS X (`os.osx.x86_64`)
- Linux on 64-bit Intel (`os.linux.x86_64`)
- Linux on 32-bit Intel (`os.linux.x86_32`)
- Windows (`os.windows.x86_32`)
