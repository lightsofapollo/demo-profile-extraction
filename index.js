// includes
var host = require('marionette-host-environment'),
    marionetteApps = require('marionette-apps'),
    Marionette = require('marionette-client'),
    Extract = require('./lib/extract');


var B2G_BIN = __dirname + '/b2g';
var SPAWN_OPTS = {
  settings: {
    // turn off FTU
    'ftu.manifestURL': null,
    // things are more fun with lockscreen off.
    'lockscreen.enabled': false
  }
};

// spawn the host and prepare the extractor
host.spawn(B2G_BIN, SPAWN_OPTS, function(err, port, child, profileDir) {
  // bail if we can't spawn a b2g-bin
  if (err) {
    console.error(err.toString());
    return process.exit(1);
  }

  // DEBUG: pipe the b2g-bin process stdout to nodes
  if (process.env.DEBUG)
    child.stdout.pipe(process.stdout);

  // XXX: below pyramid is because we lack some basic way to install plugins to
  // the marionette client. This is planned for JS client 0.9x.

  // create the marionette tcp driver with the random port given by the host
  var driver = new Marionette.Drivers.Tcp({ port: port });
  driver.connect(function() {
    // when the driver is ready create the client and start the extractor
    var client = new Marionette.Client(driver);
    client.startSession(function() {
      var apps = marionetteApps.setup(client, {}, function() {
        var extractor = new Extract(apps, client, profileDir, child);
        extractor.run();
      });
    });
  });
});
