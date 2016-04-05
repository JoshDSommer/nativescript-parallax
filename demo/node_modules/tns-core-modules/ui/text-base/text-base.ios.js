var common = require("./text-base-common");
var types = require("utils/types");
var TextBase = (function (_super) {
    __extends(TextBase, _super);
    function TextBase() {
        _super.apply(this, arguments);
    }
    TextBase.prototype._onTextPropertyChanged = function (data) {
        var newValue = types.isNullOrUndefined(data.newValue) ? "" : data.newValue + "";
        this.ios.text = newValue;
        this.style._updateTextDecoration();
        this.style._updateTextTransform();
    };
    TextBase.prototype._setFormattedTextPropertyToNative = function (value) {
        this.ios.attributedText = value._formattedText;
        this.style._updateTextDecoration();
        this.style._updateTextTransform();
        this.requestLayout();
    };
    TextBase.prototype._onStylePropertyChanged = function (property) {
        if (this.formattedText) {
            this._setFormattedTextPropertyToNative(this.formattedText);
        }
    };
    return TextBase;
}(common.TextBase));
exports.TextBase = TextBase;
