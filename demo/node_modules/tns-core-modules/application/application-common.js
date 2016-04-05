require("globals");
var observable = require("data/observable");
var events = new observable.Observable();
global.moduleMerge(events, exports);
exports.launchEvent = "launch";
exports.suspendEvent = "suspend";
exports.resumeEvent = "resume";
exports.exitEvent = "exit";
exports.lowMemoryEvent = "lowMemory";
exports.uncaughtErrorEvent = "uncaughtError";
exports.orientationChangedEvent = "orientationChanged";
exports.cssFile = "app.css";
exports.cssSelectorsCache = undefined;
exports.resources = {};
exports.onUncaughtError = undefined;
exports.onLaunch = undefined;
exports.onSuspend = undefined;
exports.onResume = undefined;
exports.onExit = undefined;
exports.onLowMemory = undefined;
exports.android = undefined;
exports.ios = undefined;
function loadCss(cssFile) {
    if (!cssFile) {
        return undefined;
    }
    var result;
    var fs = require("file-system");
    var styleScope = require("ui/styling/style-scope");
    var cssFileName = fs.path.join(fs.knownFolders.currentApp().path, cssFile);
    if (fs.File.exists(cssFileName)) {
        var file = fs.File.fromPath(cssFileName);
        var applicationCss = file.readTextSync();
        if (applicationCss) {
            result = styleScope.StyleScope.createSelectorsFromCss(applicationCss, cssFileName);
        }
    }
    return result;
}
exports.loadCss = loadCss;
