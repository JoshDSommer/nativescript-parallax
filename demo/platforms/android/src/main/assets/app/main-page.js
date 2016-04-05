"use strict";
var main_view_model_1 = require('./main-view-model');
// Event handler for Page "loaded" event attached in main-page.xml
function pageLoaded(args) {
    // Get the event sender
    var page = args.object;
    page.bindingContext = new main_view_model_1.HelloWorldModel();
}
exports.pageLoaded = pageLoaded;
//# sourceMappingURL=main-page.js.map