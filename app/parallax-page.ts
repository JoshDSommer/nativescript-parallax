import {Component, OnInit} from 'angular2/core';
import * as _scrollViewModule from 'ui/scroll-view';
import * as _pages from 'ui/page';
import * as _frame from 'ui/frame';
import * as _label from 'ui/label';
import * as _stackLayout from 'ui/layouts/stack-layout';

@Component({
	selector: 'parallax-page',
	template: `
			<ActionBar id="parallaxActionBar" title="Parallax Example" class="action-bar">
			</ActionBar>
			<ScrollView id="scrollView">
				<StackLayout id="scrollViewContent">
					<StackLayout id="topView" class="top-content">
						<Label id="headerLabel" text="Parallax"></Label>
					</StackLayout>
					<StackLayout id="bottomView">
						<TextView editable="false" text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut scelerisque, est in viverra vehicula, enim lacus fermentum mi, vel tincidunt libero diam quis nulla. In sem tellus, eleifend quis egestas at, ultricies a neque. Cras facilisis lacinia velit ut lacinia. Phasellus fermentum libero et est ultricies venenatis sit amet ac lectus. Curabitur faucibus nisi id tellus vehicula luctus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nunc condimentum est id nibh volutpat tempor. Phasellus sodales velit vel dui feugiat, eget tincidunt tortor sollicitudin. Donec nec risus in purus interdum eleifend. Praesent placerat urna aliquet orci suscipit laoreet. In ac purus nec sapien rhoncus egestas.

						Ut at consequat libero, at pharetra purus. Integer mi lorem, luctus eget porttitor vitae, pharetra et urna. Morbi et euismod lacus. Vestibulum a massa odio. Aenean at neque hendrerit, consequat sem et, congue mi. Sed egestas, ante feugiat lacinia tempus, lacus lorem laoreet magna, a hendrerit augue leo vitae risus. Integer ornare odio nec libero elementum malesuada. Cras sem sapien, aliquet eget nibh molestie, finibus dictum augue. Nulla mi metus, finibus id arcu nec, molestie venenatis libero. Morbi a pharetra odio. Maecenas viverra, quam at sollicitudin sodales, diam purus lacinia dolor, vitae scelerisque erat mi nec nibh. Quisque egestas et nunc in pharetra. Sed vitae tincidunt justo, dictum tincidunt nisi. Quisque tempus dolor urna, et mattis velit porta vitae.">
						</TextView>
					</StackLayout>
				</StackLayout>
			</ScrollView>
	`,
	styles: [`
		.top-content label{
			font-size: 45;
			horizontal-align: center;
			padding-top:75;
			color:#B2EBF2;
		}
		.top-content{
			background-color:#212121;
			background-image:url('~/images/mountains.png');
			height:230;
			background-size:cover;
		}
		.top-scroll-content, ScrollView{
		}
		#bottomView label{
			font-size:20;
		}
		.action-bar{
			background-color:#727272;
			color:#fff;
		}
		TextView{
			padding:5 15;
		}
	`]
})

export class ParallaxPage implements OnInit {
	public page: _pages.Page;

	constructor() {
		this.page = _frame.topmost().currentPage;
	}
	ngOnInit(): void {
		this.page.actionBarHidden = false;

		let scrollView = <_scrollViewModule.ScrollView>this.page.getViewById('scrollView');
		let topView = <_stackLayout.StackLayout>this.page.getViewById('topView');
		let headerLabel = <_label.Label>this.page.getViewById('headerLabel');
		let originalTopViewHeight = topView.height;
		let prevOffset = -10;

		scrollView.on(_scrollViewModule.ScrollView.scrollEvent, (args: _scrollViewModule.ScrollEventData) => {
			if (prevOffset <= scrollView.verticalOffset) {
				if (topView.height != null && topView.height >= 0) {
					topView.height = this.getTopViewHeight(originalTopViewHeight, scrollView.verticalOffset);
				}
			} else {
				if (topView.height <= originalTopViewHeight) {
					topView.height = this.getTopViewHeight(originalTopViewHeight, scrollView.verticalOffset);
				}
			}
			//fades in and out label in topView
			if (scrollView.verticalOffset < originalTopViewHeight) {
				let topOpacity = parseFloat((1 - (scrollView.verticalOffset * 0.01)).toString());
				if (topOpacity > 0 && topOpacity <= 1) {

					headerLabel.opacity = topOpacity;
				}
			}
			prevOffset = scrollView.verticalOffset;
		});
	}

	getTopViewHeight(topHeight: number, offset: number): number {
		if ((topHeight - offset) >= 0) {
			return topHeight - offset;
		} else {
			return 0;
		}
	}

}