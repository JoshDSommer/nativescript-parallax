"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var _scrollViewModule = require('ui/scroll-view');
var _view = require('ui/core/view');
var ParallaxViewCommon = (function (_super) {
    __extends(ParallaxViewCommon, _super);
    function ParallaxViewCommon() {
        var _this = this;
        _super.call(this);
        var topView;
        var scrollView;
        var viewsToFade;
        var topViewHeight;
        var controlsToFade;
        viewsToFade = [];
        scrollView = this;
        scrollView.on(_scrollViewModule.ScrollView.loadedEvent, function (data) {
            if (topViewHeight == null) {
                topViewHeight = 300;
            }
            if (controlsToFade == null) {
                controlsToFade = [];
            }
            var prevOffset = -10;
            var topOpacity = 1;
            topView = _view.getViewById(_this, 'topView');
            if (topView == null) {
                return;
            }
            topView.height = topViewHeight;
            controlsToFade.forEach(function (id) {
                var newView = _view.getViewById(_this, id);
                if (newView != null) {
                    viewsToFade.push(newView);
                }
            });
            scrollView.on(_scrollViewModule.ScrollView.scrollEvent, function (args) {
                if (prevOffset <= scrollView.verticalOffset) {
                    if (topView.height >= 0) {
                        topView.height = _this.getTopViewHeight(topViewHeight, scrollView.verticalOffset);
                    }
                }
                else {
                    if (topView.height <= topViewHeight) {
                        topView.height = _this.getTopViewHeight(topViewHeight, scrollView.verticalOffset);
                    }
                }
                if (scrollView.verticalOffset < topViewHeight) {
                    topOpacity = parseFloat((1 - (scrollView.verticalOffset * 0.01)).toString());
                    if (topOpacity > 0 && topOpacity <= 1) {
                        viewsToFade.forEach(function (view) {
                            view.opacity = topOpacity;
                        });
                    }
                }
                prevOffset = scrollView.verticalOffset;
            });
        });
    }
    Object.defineProperty(ParallaxViewCommon.prototype, "android", {
        get: function () {
            return;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ParallaxViewCommon.prototype, "ios", {
        get: function () {
            return;
        },
        enumerable: true,
        configurable: true
    });
    ParallaxViewCommon.prototype.getTopViewHeight = function (topHeight, offset) {
        if ((topHeight - offset) >= 0) {
            return topHeight - offset;
        }
        else {
            return 0;
        }
    };
    return ParallaxViewCommon;
}(_scrollViewModule.ScrollView));
exports.ParallaxViewCommon = ParallaxViewCommon;
//# sourceMappingURL=nativescript-parallax.common.js.map