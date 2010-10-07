ob  = require("observer-service");

exports.main = function(options, callbacks) {

  // server.startListening();
  console.log('The local data is available =' + require("self").data.url(""));
  let cb = function () { console.log("App is running.."); }
  ob.add("final-ui-startup", cb);
  ob.add("quit-application", function () { console.log("Bye") } );
}


