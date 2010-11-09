let {Cc, Ci} = require("chrome");

var xpcom = require("xpcom");

/* We want to observe when the iframe inner documents are created 
   but before the DOMContentLoad event. This is an event outside 
   the scope of the inner, iframes, window's events */

var observers = require("observer-service");

var xulNs = "http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul";

var blankXul = ('<?xml version="1.0"?>' +
                '<?xml-stylesheet href="chrome://global/skin/"  ' +
                '                 type="text/css"?>' +
                '<window xmlns="' + xulNs + '">' +
                '</window>');

var windows = [];


function gDocumentCreatedCallback(subject, data) { 
  subject.top = subject.self; 
  subject.__defineSetter__("self",function () {
       console.log("self called!");
  } );
  subject.__defineSetter__("top",function () {
       console.log("top called!");
  } );
  console.log(subject +" is subject and data is "+ data);
} 

function Window(options) {
  memory.track(this);

  var ww = Cc["@mozilla.org/embedcomp/window-watcher;1"]
           .getService(Ci.nsIWindowWatcher);
  var url = "data:application/vnd.mozilla.xul+xml," + escape(blankXul);

  var features = ["",
                  "width=" + options.width,
                  "height=" + options.height,
                  "centerscreen"];

  if (options.titleBar == false)
    features.push("titlebar=no");


  /* https://developer.mozilla.org/en/Observer_Notifications */
  observers.add("content-document-global-created", gDocumentCreatedCallback );

  var window = ww.openWindow(null, options.url, null, features.join(","), null);
  
  this._id = windows.push(this) - 1;
  this._window = window;
  this._browser = null;
  this._injector = null;
  this.options = options;

  window.addEventListener("close", this, false);
  window.addEventListener("DOMContentLoaded", this, false);
}

Window.prototype = {
  handleEvent: function handleEvent(event) {
    switch (event.type) {
    case "close":
      if (event.target == this._window) {
        if (windows[this._id])
          delete windows[this._id];
        this._window.removeEventListener("close", this, false);
      }
      break;
    case "DOMContentLoaded":
      console.log("!");
      if (event.target == this._window.document) {
        this._window.removeEventListener("DOMContentLoaded", this, false);
        this.options.onStartLoad(this._window);
      }
      break;
    }
  },
  close: function() {
    this._window.close();
  }
};

require("errors").catchAndLogProps(Window.prototype, "handleEvent");

exports.Window = Window;

require("unload").when(
  function() {
    windows.slice().forEach(function(window) { window.close(); });
  });
