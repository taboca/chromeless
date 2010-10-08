var      ob = require("observer-service");
var pageMod = require("page-mod");

exports.main = function(options, callbacks) {

  // server.startListening();

  console.log('The local data is available =' + require("self").data.url(""));
  let cb = function () { console.log("App is running.."); }
  ob.add("final-ui-startup", cb);
  ob.add("quit-application", function () { console.log("Bye") } );

  /* Using the page mod to intercept a page */

  pageMod.add(new pageMod.PageMod({
    include: ["resource://-chromeless-data/first_browser/index.html"],
    contentScriptWhen: 'ready',
    contentScript: 'var el=document.createElement("div");el.innerHTML="This was inserted from the Jetpack application code";document.body.appendChild(el);'
  }));


  /* Page worker is a hidden browser */
  /* a Jetpack app can use page worker to create a hidden browser.  
     there is also a system in plact to pass messages between the page 
     and the Jetpack - see postMessage. */ 

  var pageWorkers = require("page-worker");
  var script = "postMessage(document.body.innerHTML)";

  var page = pageWorkers.Page({
    contentURL: "http://en.wikipedia.org/wiki/Internet",
    contentScript: script,
    contentScriptWhen: "ready",
    onMessage: function(message) {
      console.log(message);
    }
  });

  pageWorkers.add(page);

}


