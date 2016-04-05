var frame = require("ui/frame");
var types = require("utils/types");
var trace = require("trace");
var UIViewControllerAnimatedTransitioningMethods;
(function (UIViewControllerAnimatedTransitioningMethods) {
    var methodSignature = NSMethodSignature.signatureWithObjCTypes("v@:c");
    var invocation = NSInvocation.invocationWithMethodSignature(methodSignature);
    invocation.selector = "completeTransition:";
    function completeTransition(didComplete) {
        var didCompleteReference = new interop.Reference(interop.types.bool, didComplete);
        invocation.setArgumentAtIndex(didCompleteReference, 2);
        invocation.invokeWithTarget(this);
    }
    UIViewControllerAnimatedTransitioningMethods.completeTransition = completeTransition;
})(UIViewControllerAnimatedTransitioningMethods || (UIViewControllerAnimatedTransitioningMethods = {}));
var AnimatedTransitioning = (function (_super) {
    __extends(AnimatedTransitioning, _super);
    function AnimatedTransitioning() {
        _super.apply(this, arguments);
    }
    AnimatedTransitioning.init = function (transition, operation, fromVC, toVC) {
        var impl = AnimatedTransitioning.new();
        impl._transition = transition;
        impl._operation = operation;
        impl._fromVC = fromVC;
        impl._toVC = toVC;
        return impl;
    };
    AnimatedTransitioning.prototype.animateTransition = function (transitionContext) {
        var containerView = transitionContext.valueForKey("containerView");
        var completion = UIViewControllerAnimatedTransitioningMethods.completeTransition.bind(transitionContext);
        switch (this._operation) {
            case UINavigationControllerOperation.UINavigationControllerOperationPush:
                this._transitionType = "push";
                break;
            case UINavigationControllerOperation.UINavigationControllerOperationPop:
                this._transitionType = "pop";
                break;
            case UINavigationControllerOperation.UINavigationControllerOperationNone:
                this._transitionType = "none";
                break;
        }
        trace.write("START " + this._transition + " " + this._transitionType, trace.categories.Transition);
        this._transition.animateIOSTransition(containerView, this._fromVC.view, this._toVC.view, this._operation, completion);
    };
    AnimatedTransitioning.prototype.transitionDuration = function (transitionContext) {
        return this._transition.getDuration();
    };
    AnimatedTransitioning.prototype.animationEnded = function (transitionCompleted) {
        if (transitionCompleted) {
            trace.write("END " + this._transition + " " + this._transitionType, trace.categories.Transition);
        }
        else {
            trace.write("CANCEL " + this._transition + " " + this._transitionType, trace.categories.Transition);
        }
    };
    AnimatedTransitioning.ObjCProtocols = [UIViewControllerAnimatedTransitioning];
    return AnimatedTransitioning;
}(NSObject));
var Transition = (function () {
    function Transition(duration, curve) {
        this._duration = duration ? (duration / 1000) : 0.35;
        if (curve) {
            this._curve = frame._getNativeCurve(curve);
        }
        else {
            this._curve = UIViewAnimationCurve.UIViewAnimationCurveEaseInOut;
        }
    }
    Transition.prototype.getDuration = function () {
        return this._duration;
    };
    Transition.prototype.getCurve = function () {
        return this._curve;
    };
    Transition.prototype.animateIOSTransition = function (containerView, fromView, toView, operation, completion) {
        throw new Error("Abstract method call");
    };
    Transition.prototype.createAndroidAnimator = function (transitionType) {
        throw new Error("Abstract method call");
    };
    Transition.prototype.toString = function () {
        return types.getClass(this) + "@" + this._id;
    };
    return Transition;
}());
exports.Transition = Transition;
function _createIOSAnimatedTransitioning(navigationTransition, operation, fromVC, toVC) {
    var transition;
    if (navigationTransition.name) {
        var name = navigationTransition.name.toLowerCase();
        if (name.indexOf("slide") === 0) {
            var slideTransitionModule = require("./slide-transition");
            var direction = name.substr("slide".length) || "left";
            transition = new slideTransitionModule.SlideTransition(direction, navigationTransition.duration, navigationTransition.curve);
        }
        else if (name === "fade") {
            var fadeTransitionModule = require("./fade-transition");
            transition = new fadeTransitionModule.FadeTransition(navigationTransition.duration, navigationTransition.curve);
        }
    }
    else {
        transition = navigationTransition.instance;
    }
    if (transition) {
        return AnimatedTransitioning.init(transition, operation, fromVC, toVC);
    }
    return null;
}
exports._createIOSAnimatedTransitioning = _createIOSAnimatedTransitioning;
