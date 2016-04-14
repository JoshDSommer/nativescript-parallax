import * as app from 'application';
import * as _scrollViewModule from 'ui/scroll-view';
import * as _gridLayout from 'ui/layouts/grid-layout';
import * as _absoluteLayout from 'ui/layouts/absolute-layout';
import * as _view from 'ui/core/view';
import * as _frame from 'ui/frame';
import * as _pages from 'ui/page';
import * as _label from 'ui/label';
import * as _stackLayout from 'ui/layouts/stack-layout';
import * as _color from 'color';

export class Header extends _stackLayout.StackLayout {

}
export class Anchored extends _stackLayout.StackLayout {

}

export class Content extends _stackLayout.StackLayout {

}

export class ParallaxViewCommon extends _gridLayout.GridLayout implements _view.AddChildFromBuilder {
	private _controlsToFade: string;
	private _childLayouts: _view.View[];
	private _includesAnchored: boolean;
	private _topOpacity: number;
	private _loaded: boolean;

	get controlsToFade(): string {
		return this._controlsToFade;
	}

	set controlsToFade(value: string) {
		this._controlsToFade = value;
	}

	constructor() {
		super();
		this._childLayouts = [];
		let headerView: Header;
		let contentView: Content;
		let scrollView: _scrollViewModule.ScrollView = new _scrollViewModule.ScrollView();
		let viewsToFade: _view.View[];
		let maxTopViewHeight: number;
		let controlsToFade: string[];
		let anchoredRow: _absoluteLayout.AbsoluteLayout = new _absoluteLayout.AbsoluteLayout();
		let row = new _gridLayout.ItemSpec(2, _gridLayout.GridUnitType.star);
		let column = new _gridLayout.ItemSpec(1, _gridLayout.GridUnitType.star);
		let invalidSetup = false;



		//must set the vertical alignmnet or else there is issues with margin-top of 0 being the middle of the screen.
		this.verticalAlignment = 'top';
		scrollView.verticalAlignment = 'top';
		anchoredRow.verticalAlignment = 'top';
		this._includesAnchored = false;
		this._topOpacity = 1;
		this._loaded = false;

		this.on(_gridLayout.GridLayout.loadedEvent, (data: any) => {

			if (!this._loaded) {
				this._loaded = true;

				this.addRow(row);
				this.addColumn(column);
				this.addChild(scrollView);
				this.addChild(anchoredRow);

				_gridLayout.GridLayout.setRow(scrollView, 1);
				_gridLayout.GridLayout.setRow(anchoredRow, 0);
				_gridLayout.GridLayout.setColumn(scrollView, 1);
				_gridLayout.GridLayout.setColumn(anchoredRow, 0);

				//creates a new stack layout to wrap the content inside of the plugin.
				let wrapperStackLayout = new _stackLayout.StackLayout();
				scrollView.content = wrapperStackLayout;

				this._childLayouts.forEach(element => {
					if (element instanceof Header) {
						wrapperStackLayout.addChild(element);
						headerView = element;
					}
				});
				this._childLayouts.forEach(element => {
					if (element instanceof Content) {
						wrapperStackLayout.addChild(element);
						contentView = element;
					}
				});
				this._childLayouts.forEach(element => {
					if (element instanceof Anchored) {
						anchoredRow.addChild(element);
						anchoredRow.height = element.height;
						this._includesAnchored = true;
					}
				});
				if (headerView == null || contentView == null) {
					let warningText = new _label.Label();
					warningText.text = "Parallax ScrollView Setup Invalid. You must have Header and Content tags";
					warningText.color = new _color.Color('red');
					warningText.textWrap = true;
					warningText.marginTop = 50;
					this.addChild(warningText);

					if (headerView != null) {
						headerView.visibility = 'collapse';
					}
					if (contentView != null) {
						contentView.visibility = 'collapse';

						return;
					}
				}
				maxTopViewHeight = headerView.height;

				if (this._includesAnchored) {
					anchoredRow.marginTop = maxTopViewHeight;
					if (app.android) { //helps prevent background leaking int on scroll;
						anchoredRow.marginTop = anchoredRow.marginTop - 5; // get rid of white line that happens on android
					}
					//pushes content down a to compensate for anchor.
					contentView.marginTop = anchoredRow.height;
				}

				viewsToFade = [];

				//scrollView = <_scrollViewModule.ScrollView>this;
				if (controlsToFade == null && this.controlsToFade == null) {
					controlsToFade = [];
				} else {
					controlsToFade = this.controlsToFade.split(',');
				}

				maxTopViewHeight = headerView.height;

				controlsToFade.forEach((id: string): void => {
					let newView: _view.View = headerView.getViewById(id);
					if (newView != null) {
						viewsToFade.push(newView);
					}
				});

				if (headerView == null) {
					return;
				}

				headerView.height = maxTopViewHeight;

				scrollView.on(_scrollViewModule.ScrollView.loadedEvent, (data: _scrollViewModule.ScrollEventData) => {
					//sets up controls to fade in and out.

				});
				let prevOffset = -10;

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
					if (this._includesAnchored) {
						anchoredRow.marginTop = this.getAnchoredTopHeight(maxTopViewHeight, scrollView.verticalOffset);
					}
					//fades in and out label in topView
					this.fadeViews(maxTopViewHeight, scrollView.verticalOffset, viewsToFade);

					prevOffset = scrollView.verticalOffset;
				});
			}

		});

	}

	get android(): any {
		return;
	}

	get ios(): any {
		return;
	}
	fadeViews(topHeight: number, verticalOffset: number, viewsToFade: _view.View[]): void {
		if (verticalOffset < topHeight) {
			this._topOpacity = parseFloat((1 - (verticalOffset * 0.01)).toString());
			if (this._topOpacity > 0 && this._topOpacity <= 1) {
				//fade each control
				viewsToFade.forEach((view: _view.View): void => {
					view.opacity = this._topOpacity;
				});
			}
		}
	}
	getAnchoredTopHeight(topHeight: number, verticalOffset: number): number {
		let marginTop: number;
		if (verticalOffset <= topHeight) {
			marginTop = topHeight - (verticalOffset * 2);
			if (marginTop > topHeight) {
				marginTop = topHeight;
			}
			if (app.android) {
				marginTop = marginTop - 5; // get rid of white line that happens on android
			}
		} else {
			marginTop = 0;
		}
		if (marginTop < 0) {
			marginTop = 0;
		}

		return marginTop;
	}
	//calcutes the top views height  using the scrollview's verticalOffset
	getTopViewHeight(topHeight: number, verticalOffset: number): number {
		if ((topHeight - verticalOffset) >= 0) {
			return topHeight - verticalOffset;
		} else {
			return 0;
		}
	}
	_addChildFromBuilder = (name: string, value: any) => {
		if (value instanceof _view.View) {
			this._childLayouts.push(value);
		}
	};
}