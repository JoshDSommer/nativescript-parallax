import * as app from 'application';
import * as _scrollViewModule from 'ui/scroll-view';
import * as _view from 'ui/core/view';
import * as _frame from 'ui/frame';
import * as _pages from 'ui/page';
import * as _stackLayout from 'ui/layouts/stack-layout';


export class ParallaxViewCommon extends _scrollViewModule.ScrollView {


	constructor() {
		super();

		let topView: _stackLayout.StackLayout;
		let scrollView: _scrollViewModule.ScrollView;
		let viewsToFade: _view.View[];
		let topViewHeight: number;
		let controlsToFade: string[];

		viewsToFade = [];

		scrollView = <_scrollViewModule.ScrollView>this;

		scrollView.on(_scrollViewModule.ScrollView.loadedEvent, (data: _scrollViewModule.ScrollEventData) => {

			if (topViewHeight == null) {
				topViewHeight = 300; //default height if it is not set.
			}
			if (controlsToFade == null) {
				controlsToFade = [];
			}
			let prevOffset = -10;
			let topOpacity = 1;

			topView = <_stackLayout.StackLayout>_view.getViewById(this, 'topView');

			if (topView == null) {
				return;
			}
			topView.height = topViewHeight;

			//find each control specified to fade.
			controlsToFade.forEach((id: string): void => {
				let newView: _view.View = _view.getViewById(this, id);
				if (newView != null) {
					viewsToFade.push(newView);
				}
			});


			scrollView.on(_scrollViewModule.ScrollView.scrollEvent, (args: _scrollViewModule.ScrollEventData) => {
				if (prevOffset <= scrollView.verticalOffset) {
					if (topView.height >= 0) {
						topView.height = this.getTopViewHeight(topViewHeight, scrollView.verticalOffset);
					}
				} else {
					if (topView.height <= topViewHeight) {
						topView.height = this.getTopViewHeight(topViewHeight, scrollView.verticalOffset);
					}
				}
				//fades in and out label in topView
				if (scrollView.verticalOffset < topViewHeight) {
					topOpacity = parseFloat((1 - (scrollView.verticalOffset * 0.01)).toString());
					if (topOpacity > 0 && topOpacity <= 1) {
						//fade each control
						viewsToFade.forEach((view: _view.View): void => {
							view.opacity = topOpacity;
						});
					}
				}
				prevOffset = scrollView.verticalOffset;
			});
		});
	}

	get android(): any {
		return;
	}

	get ios(): any {
		return;
	}

	getTopViewHeight(topHeight: number, offset: number): number {
		if ((topHeight - offset) >= 0) {
			return topHeight - offset;
		} else {
			return 0;
		}
	}
}


