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
      //console.log(message);
    }
  });

  pageWorkers.add(page);


  /* New Windows - also following some notes from Lloyd that the app 
     can simply launch in a new window.

     This Window implementation is interesting because it represents, 
     in a way, a vision towards a browser environments. It represents
     a Window which internal properties such as Tabs, Title. This could
     well serve as a reference point to what we are tring to do. A 
     window is the main entry point associated with one developer-browser
     internal page and it indeed may have tabs and other things. But 
     the tabs will eventually be an abstraction to the various 
     browser elements the HTML page has. 
     
     Ref: Window = http://127.0.0.1:8888/#module/core/windows
 
     TODO - dump the content of the loaded page in the new window
	//console.log(window.tabs.body.innerHTML);
 
  */


  var windows = require("windows").browserWindows;
  //windows.openWindow("resource://-chromeless-data/first_browser/index.html");
  windows.openWindow({
    url: "resource://-chromeless-data/first_browser/index.html",
    onOpen: function(window) {
      // do stuff like listen for content
      // loading.
    }
  });

  /* 
 
     Passing Parameters to the Jetpack App via Command Line 
 
     Ref: https://bugzilla.mozilla.org/show_bug.cgi?id=599181 - if one 
     wants to pass parameters to the Jetpack app via command line. We 
     can use this to engage with browser example a or b, so far. 

     Code in cfx: http://hg.mozilla.org/labs/jetpack-sdk/rev/74f38f55420d 

     The parameter usage is: 

     cfx run -a firefox -b ~marciogalli/Desktop/MozillaDeveloperPreview.app --static-args {\"browser\":\"resource://-chromeless-data/first_browser/index.html"\"}
 
    

  */

   var call = options.staticArgs;
   console.log(call.browser);

}


