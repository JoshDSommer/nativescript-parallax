"use strict";
var core_1 = require('angular2/core');
var _scrollViewModule = require('ui/scroll-view');
var _frame = require('ui/frame');
var ParallaxPage = (function () {
    function ParallaxPage() {
        this.page = _frame.topmost().currentPage;
    }
    ParallaxPage.prototype.ngOnInit = function () {
        var _this = this;
        this.page.actionBarHidden = false;
        var scrollView = this.page.getViewById('scrollView');
        var topView = this.page.getViewById('topView');
        var headerLabel = this.page.getViewById('headerLabel');
        var originalTopViewHeight = topView.height;
        var prevOffset = -10;
        scrollView.on(_scrollViewModule.ScrollView.scrollEvent, function (args) {
            if (prevOffset <= scrollView.verticalOffset) {
                if (topView.height != null && topView.height >= 0) {
                    topView.height = _this.getTopViewHeight(originalTopViewHeight, scrollView.verticalOffset);
                }
            }
            else {
                if (topView.height <= originalTopViewHeight) {
                    topView.height = _this.getTopViewHeight(originalTopViewHeight, scrollView.verticalOffset);
                }
            }
            //fades in and out label in topView
            if (scrollView.verticalOffset < originalTopViewHeight) {
                var topOpacity = parseFloat((1 - (scrollView.verticalOffset * 0.01)).toString());
                if (topOpacity > 0 && topOpacity <= 1) {
                    headerLabel.opacity = topOpacity;
                }
            }
            prevOffset = scrollView.verticalOffset;
        });
    };
    ParallaxPage.prototype.getTopViewHeight = function (topHeight, offset) {
        if ((topHeight - offset) >= 0) {
            return topHeight - offset;
        }
        else {
            return 0;
        }
    };
    ParallaxPage = __decorate([
        core_1.Component({
            selector: 'parallax-page',
            template: "\n\t\t\t<ActionBar id=\"parallaxActionBar\" title=\"Parallax Example\" class=\"action-bar\">\n\t\t\t</ActionBar>\n\t\t\t<ScrollView id=\"scrollView\">\n\t\t\t\t<StackLayout id=\"scrollViewContent\">\n\t\t\t\t\t<StackLayout id=\"topView\" class=\"top-content\">\n\t\t\t\t\t\t<Label id=\"headerLabel\" text=\"Parallax\"></Label>\n\t\t\t\t\t</StackLayout>\n\t\t\t\t\t<StackLayout id=\"bottomView\">\n\t\t\t\t\t\t<TextView editable=\"false\" text=\"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut scelerisque, est in viverra vehicula, enim lacus fermentum mi, vel tincidunt libero diam quis nulla. In sem tellus, eleifend quis egestas at, ultricies a neque. Cras facilisis lacinia velit ut lacinia. Phasellus fermentum libero et est ultricies venenatis sit amet ac lectus. Curabitur faucibus nisi id tellus vehicula luctus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nunc condimentum est id nibh volutpat tempor. Phasellus sodales velit vel dui feugiat, eget tincidunt tortor sollicitudin. Donec nec risus in purus interdum eleifend. Praesent placerat urna aliquet orci suscipit laoreet. In ac purus nec sapien rhoncus egestas.\n\n\t\t\t\t\t\tUt at consequat libero, at pharetra purus. Integer mi lorem, luctus eget porttitor vitae, pharetra et urna. Morbi et euismod lacus. Vestibulum a massa odio. Aenean at neque hendrerit, consequat sem et, congue mi. Sed egestas, ante feugiat lacinia tempus, lacus lorem laoreet magna, a hendrerit augue leo vitae risus. Integer ornare odio nec libero elementum malesuada. Cras sem sapien, aliquet eget nibh molestie, finibus dictum augue. Nulla mi metus, finibus id arcu nec, molestie venenatis libero. Morbi a pharetra odio. Maecenas viverra, quam at sollicitudin sodales, diam purus lacinia dolor, vitae scelerisque erat mi nec nibh. Quisque egestas et nunc in pharetra. Sed vitae tincidunt justo, dictum tincidunt nisi. Quisque tempus dolor urna, et mattis velit porta vitae.\">\n\t\t\t\t\t\t</TextView>\n\t\t\t\t\t</StackLayout>\n\t\t\t\t</StackLayout>\n\t\t\t</ScrollView>\n\t",
            styles: ["\n\t\t.top-content label{\n\t\t\tfont-size: 45;\n\t\t\thorizontal-align: center;\n\t\t\tpadding-top:75;\n\t\t\tcolor:#B2EBF2;\n\t\t}\n\t\t.top-content{\n\t\t\tbackground-color:#212121;\n\t\t\tbackground-image:url('~/images/mountains.png');\n\t\t\theight:230;\n\t\t\tbackground-size:cover;\n\t\t}\n\t\t.top-scroll-content, ScrollView{\n\t\t}\n\t\t#bottomView label{\n\t\t\tfont-size:20;\n\t\t}\n\t\t.action-bar{\n\t\t\tbackground-color:#727272;\n\t\t\tcolor:#fff;\n\t\t}\n\t\tTextView{\n\t\t\tpadding:5 15;\n\t\t}\n\t"]
        })
    ], ParallaxPage);
    return ParallaxPage;
}());
exports.ParallaxPage = ParallaxPage;
//# sourceMappingURL=parallax-page.js.map