var common = require("./background-common");
global.moduleMerge(common, exports);
var style;
function ensureStyle() {
    if (!style) {
        style = require("./style");
    }
}
var ios;
(function (ios) {
    function createBackgroundUIColor(view, flip) {
        if (!view._nativeView) {
            return undefined;
        }
        ensureStyle();
        var background = view.style._getValue(style.backgroundInternalProperty);
        if (!background || background.isEmpty()) {
            return undefined;
        }
        if (!background.image) {
            return background.color.ios;
        }
        var frame = view._nativeView.frame;
        var boundsWidth = frame.size.width;
        var boundsHeight = frame.size.height;
        if (!boundsWidth || !boundsHeight) {
            return undefined;
        }
        var img = background.image.ios;
        var params = background.getDrawParams(boundsWidth, boundsHeight);
        if (params.sizeX > 0 && params.sizeY > 0) {
            var resizeRect = CGRectMake(0, 0, params.sizeX, params.sizeY);
            UIGraphicsBeginImageContext(resizeRect.size);
            img.drawInRect(resizeRect);
            img = UIGraphicsGetImageFromCurrentImageContext();
            UIGraphicsEndImageContext();
        }
        UIGraphicsBeginImageContextWithOptions(frame.size, false, 0.0);
        var context = UIGraphicsGetCurrentContext();
        if (background.color && background.color.ios) {
            CGContextSetFillColorWithColor(context, background.color.ios.CGColor);
            CGContextFillRect(context, CGRectMake(0, 0, boundsWidth, boundsHeight));
        }
        if (!params.repeatX && !params.repeatY) {
            img.drawAtPoint(CGPointMake(params.posX, params.posY));
        }
        else {
            var w = params.repeatX ? boundsWidth : img.size.width;
            var h = params.repeatY ? boundsHeight : img.size.height;
            CGContextSetPatternPhase(context, CGSizeMake(params.posX, params.posY));
            params.posX = params.repeatX ? 0 : params.posX;
            params.posY = params.repeatY ? 0 : params.posY;
            var patternRect = CGRectMake(params.posX, params.posY, w, h);
            img.drawAsPatternInRect(patternRect);
        }
        var bkgImage = UIGraphicsGetImageFromCurrentImageContext();
        UIGraphicsEndImageContext();
        if (flip) {
            var flippedImage = _flipImage(bkgImage);
            return UIColor.alloc().initWithPatternImage(flippedImage);
        }
        return UIColor.alloc().initWithPatternImage(bkgImage);
    }
    ios.createBackgroundUIColor = createBackgroundUIColor;
    function _flipImage(originalImage) {
        UIGraphicsBeginImageContextWithOptions(originalImage.size, false, 0.0);
        var context = UIGraphicsGetCurrentContext();
        CGContextSaveGState(context);
        CGContextTranslateCTM(context, 0.0, originalImage.size.width);
        CGContextScaleCTM(context, 1.0, -1.0);
        originalImage.drawInRect(CGRectMake(0, 0, originalImage.size.width, originalImage.size.height));
        CGContextRestoreGState(context);
        var flippedImage = UIGraphicsGetImageFromCurrentImageContext();
        UIGraphicsEndImageContext();
        return flippedImage;
    }
})(ios = exports.ios || (exports.ios = {}));
