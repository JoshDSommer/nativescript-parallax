global.moduleMerge = function (sourceExports, destExports) {
    for (var key in sourceExports) {
        destExports[key] = sourceExports[key];
    }
};
var modules = new Map();
global.registerModule = function (name, loader) {
    modules.set(name, loader);
};
global.moduleExists = function (name) {
    return modules.has(name);
};
global.loadModule = function (name) {
    var loader = modules.get(name);
    if (loader) {
        return loader();
    }
    else {
        return require(name);
    }
};
global.registerModule("timer", function () { return require("timer"); });
global.registerModule("ui/dialogs", function () { return require("ui/dialogs"); });
global.registerModule("xhr", function () { return require("xhr"); });
global.registerModule("fetch", function () { return require("fetch"); });
var __tnsGlobalMergedModules = new Map();
function registerOnGlobalContext(name, module) {
    Object.defineProperty(global, name, {
        get: function () {
            var m = global.loadModule(module);
            if (!__tnsGlobalMergedModules.has(module)) {
                __tnsGlobalMergedModules.set(module, true);
                global.moduleMerge(m, global);
            }
            var resolvedValue = m[name];
            Object.defineProperty(this, name, { value: resolvedValue, configurable: true, writable: true });
            return resolvedValue;
        },
        configurable: true
    });
}
if (global.__snapshot) {
    var timer = require("timer");
    global.setTimeout = timer.setTimeout;
    global.clearTimeout = timer.clearTimeout;
    global.setInterval = timer.setInterval;
    global.clearInterval = timer.clearInterval;
    var dialogs = require("ui/dialogs");
    global.alert = dialogs.alert;
    global.confirm = dialogs.confirm;
    global.prompt = dialogs.prompt;
    var xhr = require("xhr");
    global.XMLHttpRequest = xhr.XMLHttpRequest;
    global.FormData = xhr.FormData;
    var fetch = require("fetch");
    global.fetch = fetch.fetch;
}
else {
    registerOnGlobalContext("setTimeout", "timer");
    registerOnGlobalContext("clearTimeout", "timer");
    registerOnGlobalContext("setInterval", "timer");
    registerOnGlobalContext("clearInterval", "timer");
    registerOnGlobalContext("alert", "ui/dialogs");
    registerOnGlobalContext("confirm", "ui/dialogs");
    registerOnGlobalContext("prompt", "ui/dialogs");
    registerOnGlobalContext("XMLHttpRequest", "xhr");
    registerOnGlobalContext("FormData", "xhr");
    registerOnGlobalContext("fetch", "fetch");
}
var platform = require("platform");
var consoleModule = require("console");
var c = new consoleModule.Console();
if (platform.device.os === platform.platformNames.android) {
    global.console = c;
}
else if (platform.device.os === platform.platformNames.ios) {
    global.console.dump = function (args) { c.dump(args); };
}
if (typeof global.__decorate !== "function") {
    global.__decorate = function (decorators, target, key, desc) {
        var c = arguments.length;
        var r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof global.Reflect === "object" && typeof global.Reflect.decorate === "function") {
            r = global.Reflect.decorate(decorators, target, key, desc);
        }
        else {
            for (var i = decorators.length - 1; i >= 0; i--) {
                if (d = decorators[i]) {
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
                }
            }
        }
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
}
if (typeof global.__metadata !== "function") {
    global.__metadata = function (k, v) {
        if (typeof global.Reflect === "object" && typeof global.Reflect.metadata === "function") {
            return global.Reflect.metadata(k, v);
        }
    };
}
if (typeof global.__param !== "function") {
    global.__param = (global && global.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); };
    };
}
function Deprecated(target, key, descriptor) {
    if (descriptor) {
        var originalMethod = descriptor.value;
        descriptor.value = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            console.log(key + " is deprecated");
            return originalMethod.apply(this, args);
        };
        return descriptor;
    }
    else {
        console.log((target && target.name || target) + " is deprecated");
        return target;
    }
}
exports.Deprecated = Deprecated;
global.Deprecated = Deprecated;
function Experimental(target, key, descriptor) {
    if (descriptor) {
        var originalMethod = descriptor.value;
        descriptor.value = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            console.log(key + " is experimental");
            return originalMethod.apply(this, args);
        };
        return descriptor;
    }
    else {
        console.log((target && target.name || target) + " is experimental");
        return target;
    }
}
exports.Experimental = Experimental;
global.Experimental = Experimental;
