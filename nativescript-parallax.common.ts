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
		let maxTopViewHeight: number;
		let controlsToFade: string[];

		viewsToFade = [];

		scrollView = <_scrollViewModule.ScrollView>this;

		scrollView.on(_scrollViewModule.ScrollView.loadedEvent, (data: _scrollViewModule.ScrollEventData) => {

			if (maxTopViewHeight == null) {
				maxTopViewHeight = 300;
			}
			if (controlsToFade == null) {
				controlsToFade = [];
			}
			//setting this to negative 10 assures there is no confusion when starting the on scroll event.
			let prevOffset = -10;
			let topOpacity = 1;

			topView = <_stackLayout.StackLayout>_view.getViewById(this, 'topView');

			if (topView == null) {
				return;
			}
			topView.height = maxTopViewHeight;

			//find each control specified to fade.
			controlsToFade.forEach((id: string): void => {
				let newView: _view.View = _view.getViewById(this, id);
				if (newView != null) {
					viewsToFade.push(newView);
				}
			});


			scrollView.on(_scrollViewModule.ScrollView.scrollEvent, (args: _scrollViewModule.ScrollEventData) => {
				if (prevOffset <= scrollView.verticalOffset) {
					//when scrolling down
					if (topView.height >= 0) {
						topView.height = this.getTopViewHeight(maxTopViewHeight, scrollView.verticalOffset);
					}
				} else {
					//scrolling up, as long as the view's hieght is not taller than it's initial height;
					if (topView.height <= maxTopViewHeight) {
						topView.height = this.getTopViewHeight(maxTopViewHeight, scrollView.verticalOffset);
					}
				}
				//fades in and out label in topView
				if (scrollView.verticalOffset < maxTopViewHeight) {
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
	//calcutes the top views height  using the scrollview's verticalOffset
	getTopViewHeight(topHeight: number, verticalOffset: number): number {
		if ((topHeight - verticalOffset) >= 0) {
			return topHeight - verticalOffset;
		} else {
			return 0;
		}
	}
}


