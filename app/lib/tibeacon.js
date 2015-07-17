var beacons = require('co.mobiledatasystems.tibeacon');
exports.beacons = beacons;

beacons.initializeBeaconMonitoring({
  success: function(e) {
    //called when we have successfully registered the core location services
    Ti.API.info('success: ' + JSON.stringify(e));
    beaconsRegistered();
  },
  error: function(e) {
    //called when we have failed to register the core location services
    Ti.API.error(JSON.stringify(e));
    if (e.message === "beacons not supported") {
      alert("Sorry, this device doesn't support iBeacons");
    } else {
      alert("Sorry, there was an error\r\n" + e.message);
    }
  },
  region: function(e) {
    Ti.API.info('region changed event: ' + JSON.stringify(e));

    if (e.status === 'entered' && e.identifier === 'all') {
      //beacons.sendLocalNotification({
      //	message:'Hello from the beacon demo',
      //	sound:'/sounds/siren.mp3'
      //});
    }
  },
  ranged: function(e) {
    //when the app is in foreground, this is fired every second or so and reports all the beacons in range
    Ti.API.info('region ranged event: ' + JSON.stringify(e));
  },
  change: function(e) {
    //called when a new beacon becomes the nearest one
    Ti.API.info('change event: ' + JSON.stringify(e));
  }
});

function beaconsRegistered() {
  beacons.startMonitoringBeaconRegion({
    uuid: 'A500248C-ABC2-4206-9BD7-034F4FC9ED10',
    identifier: 'all',
    notifyEntryStateOnDisplay: false,
    keepRanging: true
  });
}

/*
"[INFO] region ranged event:
{"success":true,
"beaconCount":"1",
"source":{"id":"co.mobiledatasystems.tibeacon"},"identifier":"all","type":"ranged",
"beacons":[
    {"major":"1111","minor":"11813","id":"0","rssi":"-67","uuid":"A500248C-ABC2-4206-9BD7-034F4FC9ED10","identifier":"all","proximity":"Far","accuracy":"3.014892"}
]
}"}
*/
