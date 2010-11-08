

var gURLBarBoxObject = { width:100 };

function initStatus() { 
try { 
   var gBrowser = document.getElementById("content");
   gBrowserStatusHandler = new nsBrowserStatusHandler();
   gBrowserStatusHandler.init();
   gBrowser.addProgressListener(gBrowserStatusHandler, Ci.nsIWebProgress.NOTIFY_ALL);
} catch (i) { alert(i) } 
} 

function nsBrowserStatusHandler() {

}

nsBrowserStatusHandler.prototype = 
{
  QueryInterface : function(aIID)
  {
    if (aIID.equals(Ci.nsIWebProgressListener) ||
        aIID.equals(Ci.nsIXULBrowserWindow) ||
        aIID.equals(Ci.nsISupportsWeakReference) ||
        aIID.equals(Ci.nsISupports))
    {
      return this;
    }
    throw Cr.NS_NOINTERFACE;
  },
  
  init : function()
  {
  },
  
  destroy : function()
  {
  },
  
  onStateChange : function(aWebProgress, aRequest, aStateFlags, aStatus)
  {
    if (aStateFlags & Ci.nsIWebProgressListener.STATE_IS_NETWORK)
    {
      if (aStateFlags & Ci.nsIWebProgressListener.STATE_START)
      {
		if(aRequest && aWebProgress.DOMWindow == content) {
         		 this.startDocumentLoad(aRequest);
		}
        return;
      }
      if (aStateFlags & Ci.nsIWebProgressListener.STATE_STOP)
      {
        if (aRequest) {
            if (aWebProgress.DOMWindow == content) this.endDocumentLoad(aRequest, aStatus);
        }
        return;
      }
      return;
    }
    
    if (aStateFlags & Ci.nsIWebProgressListener.STATE_IS_DOCUMENT)
    { 
      if (aStateFlags & Ci.nsIWebProgressListener.STATE_START)
      {
        return;
      }
      if (aStateFlags & Ci.nsIWebProgressListener.STATE_STOP)
      {
        return;
      }
      return;
    }
  },
  onProgressChange : function(aWebProgress, aRequest, aCurSelfProgress, aMaxSelfProgress, aCurTotalProgress, aMaxTotalProgress)
  {
    this.currentTotalProgress = aCurTotalProgress;
    this.maxTotalProgress     = aMaxTotalProgress;
    var percentage = parseInt((aCurTotalProgress/aMaxTotalProgress)*parseInt(gURLBarBoxObject.width));
	document.getElementById("awesomeBox").value=percentage;
    if(percentage<0) percentage=10;

  },
  onLocationChange : function(aWebProgress, aRequest, aLocation)
  {
      domWindow = aWebProgress.DOMWindow;
      // Update urlbar only if there was a load on the root docshell
      if (domWindow == domWindow.top) {
        this.urlBar.value = aLocation.spec;
      }
  },
  onStatusChange : function(aWebProgress, aRequest, aStatus, aMessage)
  {
  },
  startDocumentLoad : function(aRequest)
  {
  },
  endDocumentLoad : function(aRequest, aStatus)
  {
  },
  onSecurityChange : function(aWebProgress, aRequest, aState)
  {
  },
  setJSStatus : function(status)
  {
  },
  setJSDefaultStatus : function(status)
  {
  },
  setDefaultStatus : function(status)
  {
  },
  setOverLink : function(link, b)
  {
  }
}

