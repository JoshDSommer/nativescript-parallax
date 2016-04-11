import * as app from 'application';
import * as _scrollViewModule from 'ui/scroll-view';
import * as _view from 'ui/core/view';
import * as _frame from 'ui/frame';
import * as _pages from 'ui/page';
import * as _stackLayout from 'ui/layouts/stack-layout';

export class ParallaxViewCommon extends _scrollViewModule.ScrollView implements _view.AddChildFromBuilder {
	private _controlsToFade: string;


	get controlsToFade(): string {
		return this._controlsToFade;
	}

	set controlsToFade(value: string) {
		this._controlsToFade = value;
	}

	constructor() {
		super();
		let headerView: _view.View;
		let scrollView: _scrollViewModule.ScrollView;
		let viewsToFade: _view.View[];
		let maxTopViewHeight: number;
		let controlsToFade: string[];

		//creates a new stack layout to wrap the content inside of the plugin.
		let wrapperStackLayout = new _stackLayout.StackLayout();
		//overides default addChildFromBuilder to insert the wrapper and then add any child views.
		this._addChildFromBuilder = (name: string, value: any) => {
			if (value instanceof _view.View) {
				if (this.content == null) {
					this.content = wrapperStackLayout;
				}
				wrapperStackLayout.addChild(value);
			}
		};
		//not supported yet;
		viewsToFade = [];

		scrollView = <_scrollViewModule.ScrollView>this;

		scrollView.on(_scrollViewModule.ScrollView.loadedEvent, (data: _scrollViewModule.ScrollEventData) => {
			//sets up controls to fade in and out.
			if (controlsToFade == null && this.controlsToFade == null) {
				controlsToFade = [];
			} else {
				controlsToFade = this.controlsToFade.split(',');
			}

			//setting this to negative 10 assures there is no confusion when starting the on scroll event.
			let prevOffset = -10;
			let topOpacity = 1;

			//first child always needs to be the headerView
			headerView = wrapperStackLayout.getChildAt(0);

			maxTopViewHeight = headerView.height;

			controlsToFade.forEach((id: string): void => {
				let newView: _view.View = wrapperStackLayout.getViewById(id);
				if (newView != null) {
					viewsToFade.push(newView);
				}
			});

			if (headerView == null) {
				return;
			}

			headerView.height = maxTopViewHeight;

			scrollView.on(_scrollViewModule.ScrollView.scrollEvent, (args: _scrollViewModule.ScrollEventData) => {
				if (prevOffset <= scrollView.verticalOffset) {
					//when scrolling down
					if (headerView.height >= 0) {
						headerView.height = this.getTopViewHeight(maxTopViewHeight, scrollView.verticalOffset);
					}
				} else {
					//scrolling up, as long as the view's hieght is not taller than it's initial height;
					if (headerView.height <= maxTopViewHeight) {
						headerView.height = this.getTopViewHeight(maxTopViewHeight, scrollView.verticalOffset);
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


