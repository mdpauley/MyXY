function mapviewRegionchanged(e) {
  $.mapView.removeEventListener("regionchanged", mapviewRegionchanged);
  Ti.Geolocation.getCurrentPosition(function(e) {
    if (!e.error && e.success) {
      $.mapView.setRegion({
        latitude: (e.coords.latitude - 0.00207081337554841),
        latitudeDelta: 0.005,
        longitude: e.coords.longitude,
        longitudeDelta: 0.005
      });
    }
  });
}

function leftAction(e) {
  if ($.leftNavBtn.getTitle() === "Edit") {

  } else {
    closeDetail(e)
  }
}

function addXY() {
  $.addXY = Alloy.createController("add").getView();
  $.index.openWindow($.addXY);
}

function openDetail(e) {
  $.index.setTitle(e.row.children[1].children[0].getText());
  $.leftNavBtn.setTitle("Back");

  var tableAnimation = Titanium.UI.createAnimation({
    "duration": 400,
    "top": "100%"
  });

  var toolBarAnimation = Titanium.UI.createAnimation({
    "duration": 400,
    "top": -1
  });

  $.deviceTable.animate(tableAnimation);
  $.toolBar.animate(toolBarAnimation);
}

function closeDetail(e) {
  $.index.setTitle("My XY");
  $.leftNavBtn.setTitle("Edit");

  var tableAnimation = Titanium.UI.createAnimation({
    "duration": 400,
    "top": "45%"
  });

  var toolBarAnimation = Titanium.UI.createAnimation({
    "duration": 400,
    "top": -44
  });

  $.deviceTable.animate(tableAnimation);
  $.toolBar.animate(toolBarAnimation);
}

$.mapView.addEventListener("regionchanged", mapviewRegionchanged);

Alloy.Globals.API.showMe({
  userId: Ti.App.Properties.getString("userId", null)
}, function(resp) {
  console.log(resp);
  $.index.open();
});
