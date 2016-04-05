var common = require("./text-base-common");
var types = require("utils/types");
var TextBase = (function (_super) {
    __extends(TextBase, _super);
    function TextBase() {
        _super.apply(this, arguments);
    }
    TextBase.prototype._onTextPropertyChanged = function (data) {
        if (this.android) {
            var newValue = types.isNullOrUndefined(data.newValue) ? "" : data.newValue + "";
            this.android.setText(newValue);
        }
    };
    TextBase.prototype._setFormattedTextPropertyToNative = function (value) {
        if (this.android) {
            this.android.setText(value._formattedText);
        }
    };
    return TextBase;
}(common.TextBase));
exports.TextBase = TextBase;
