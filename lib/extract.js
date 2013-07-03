var CALENDAR = 'calendar.gaiamobile.org';
var ORIGIN = 'app://' + CALENDAR;

function Extract(apps, client, profile, b2g) {
  this.apps = apps;
  this.client = client;
  this.profile = profile;
  this.b2g = b2g;
}

Extract.prototype = {
  // main
  run: function() {
    this.apps.launch(ORIGIN, function() {
      this.apps.switchToApp(ORIGIN, this.stageData.bind(this));
    }.bind(this));
  },

  stageData: function(callback) {
    // in theory this is where you stage some cool things into the calendar.
    this.apps.close(ORIGIN, this.exportDB.bind(this));
  },

  exportDB: function() {
    // close b2g and capture profile location
    this.b2g.kill();

    var idbPath = this.profile + '/indexedDB';
    var dirs = fs.readdirSync(idbPath);

    for (var i = 0, len = dirs.length; i < len; i++) {
      var dir = dirs[i];
      if (dir.indexOf(CALENDAR) !== -1) {
        // this is where you do whatever you need to with the resulting sql
        // files
        console.log('tmp path to magic idb files %s', idbPath + '/' + dir);
      }
    }
  }
};

module.exports = Extract;
