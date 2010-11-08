/* -*- Mode: Java; tab-width: 2; indent-tabs-mode: nil; c-basic-offset: 2 -*- */
/* vim:set ts=2 sw=2 sts=2 et: */
/* ***** BEGIN LICENSE BLOCK *****
 * Version: MPL 1.1/GPL 2.0/LGPL 2.1
 *
 * The contents of this file are subject to the Mozilla Public License Version
 * 1.1 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 * http://www.mozilla.org/MPL/
 *
 * Software distributed under the License is distributed on an "AS IS" basis,
 * WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 * for the specific language governing rights and limitations under the
 * License.
 *
 * The Original Code is Jetpack.
 *
 * The Initial Developer of the Original Code is
 * the Mozilla Foundation.
 * Portions created by the Initial Developer are Copyright (C) 2010
 * the Initial Developer. All Rights Reserved.
 *
 * Contributor(s):
 *   Marcio Galli <mgalli@mgalli.com>
 *
 * Alternatively, the contents of this file may be used under the terms of
 * either the GNU General Public License Version 2 or later (the "GPL"), or
 * the GNU Lesser General Public License Version 2.1 or later (the "LGPL"),
 * in which case the provisions of the GPL or the LGPL are applicable instead
 * of those above. If you wish to allow use of your version of this file only
 * under the terms of either the GPL or the LGPL, and not to allow others to
 * use your version of this file under the terms of the MPL, indicate your
 * decision by deleting the provisions above and replace them with the notice
 * and other provisions required by the GPL or the LGPL. If you do not delete
 * the provisions above, a recipient may use your version of this file under
 * the terms of any one of the MPL, the GPL or the LGPL.
 *
 * ***** END LICENSE BLOCK ***** */


/* Important
   -- 
   This is really early implementation with a history proxy abstraction
   that can be associated with browser elements that could be part of 
   a developers HTML browser application. We may re-evaluate this 
   and eventually make these features avaiable via the HTML DOM. 
   
   THis is initialized in the session-store, it assumes the 
   nsISessionHistory service is availabe in the given window. 
   It also does not work with more than one browser, needs 
   to be fixed and better API design. 

*/
const {Cc, Ci, Cu} = require("chrome");

let gHistory = { 
 
  windows: [], 
  addWindow: function addWindow (aWindow) { 
    this.windows.push(aWindow);
  }, 
  back: function back() { 
    this.windows[0].contentWindow.history.back();
  }, 
  forward: function forward () { 
    this.windows[0].contentWindow.history.forward();
  } 
} 

exports.init = function init(aBrowser) {
  gHistory.addWindow(aBrowser);
}
exports.back = function back() { 
  gHistory.back();
} 
exports.forward = function forward() { 
  gHistory.forward(); 
} 
