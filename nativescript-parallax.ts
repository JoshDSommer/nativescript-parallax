import * as app from 'application';
import * as Platform from 'platform';
import {ScrollView, ScrollEventData} from 'ui/scroll-view';
import {GridLayout, ItemSpec, GridUnitType} from 'ui/layouts/grid-layout';
import {AbsoluteLayout} from 'ui/layouts/absolute-layout';
import {View, AddChildFromBuilder} from 'ui/core/view';
import {Label} from 'ui/label';
import {StackLayout} from 'ui/layouts/stack-layout';
import {Color} from 'color';
import {ParallaxUtilities} from './utilities';

export class Header extends StackLayout {

}
export class Anchored extends StackLayout {
	private _dropShadow: boolean;
	get dropShadow(): boolean {
		return this._dropShadow;
	}
	set dropShadow(value: boolean) {
		this._dropShadow = value;
	}

	constructor() {
		super();
		this.dropShadow = false;
	}
}

export class Content extends StackLayout {

}

export interface IMinimumHeights {
	portrait: number;
	landscape: number;
}

export class ParallaxView extends GridLayout implements AddChildFromBuilder {
	private _controlsToFade: string;
	private _childLayouts: View[];
	private _includesAnchored: boolean;
	private _topOpacity: number;
	private _loaded: boolean;
	private _minimumHeights: IMinimumHeights;
	private _bounce: boolean;

	get bounce(): boolean {
		return this._bounce;
	}
	set bounce(value: boolean) {
		this._bounce = value;
	}

	get controlsToFade(): string {
		return this._controlsToFade;
	}

	set controlsToFade(value: string) {
		this._controlsToFade = value;
	}

	get android(): any {
		return;
	}

	get ios(): any {
		return;
	}

	constructor() {
		super();
		this._childLayouts = [];
		let headerView: Header;
		let contentView: Content;
		let scrollView: ScrollView = new ScrollView();
		let viewsToFade: View[];
		let maxTopViewHeight: number;
		let controlsToFade: string[];
		let anchoredRow: AbsoluteLayout = new AbsoluteLayout();
		let row = new ItemSpec(2, GridUnitType.star);
		let column = new ItemSpec(1, GridUnitType.star);
		let invalidSetup = false;
		this._minimumHeights = ParallaxUtilities.getMinimumHeights();

		if (this.bounce == null) {
			this.bounce = false; //disable bounce by default.
		}
		//must set the vertical alignmnet or else there is issues with margin-top of 0 being the middle of the screen.
		this.verticalAlignment = 'top';
		scrollView.verticalAlignment = 'top';
		anchoredRow.verticalAlignment = 'top';
		this._includesAnchored = false;
		this._topOpacity = 1;
		this._loaded = false;

		this.on(GridLayout.loadedEvent, (data: any) => {
			//prevents re adding views on resume in android.
			if (!this._loaded) {
				this._loaded = true;

				this.addRow(row);
				this.addColumn(column);
				this.addChild(scrollView);
				this.addChild(anchoredRow);

				GridLayout.setRow(scrollView, 1);
				GridLayout.setRow(anchoredRow, 0);
				GridLayout.setColumn(scrollView, 1);
				GridLayout.setColumn(anchoredRow, 0);

				//creates a new stack layout to wrap the content inside of the plugin.
				let wrapperStackLayout = new StackLayout();
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
						if ((<Anchored>element).dropShadow) {
							anchoredRow.height = element.height;
							anchoredRow.addChild(ParallaxUtilities.addDropShadow(element.height, element.width));
						} else {
							anchoredRow.height = element.height;
						}
						element.verticalAlignment = 'top';
						this._includesAnchored = true;
					}
				});

				if (headerView == null || contentView == null) {
					ParallaxUtilities.displayDevWarning(this, 'Parallax ScrollView Setup Invalid. You must have Header and Content tags',
						headerView,
						contentView, contentView);
					return;
				}
				if (isNaN(headerView.height)) {
					ParallaxUtilities.displayDevWarning(this, 'Header MUST have a height set.',
						headerView,
						anchoredRow, contentView);
					return;
				}
				if (this._includesAnchored && isNaN(anchoredRow.height)) {
					ParallaxUtilities.displayDevWarning(this, 'Anchor MUST have a height set.',
						anchoredRow, headerView, contentView);
					return;
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
				//disables bounce/overscroll defaulted to false
				if (this.bounce === false) {
					if (app.ios) {
						scrollView.ios.bounces = false;
					} else if (app.android) {
						scrollView.android.setOverScrollMode(2);
					}
				}

				viewsToFade = [];
				//scrollView = <ScrollView>this;
				if (this.controlsToFade == null) {
					controlsToFade = [];
				} else {
					controlsToFade = this.controlsToFade.split(',');
				}

				controlsToFade.forEach((id: string): void => {
					let newView: View = headerView.getViewById(id);
					if (newView != null) {
						viewsToFade.push(newView);
					}
				});

				let prevOffset = -10;
				//set the min height on load
				ParallaxUtilities.setMinimumHeight(contentView, anchoredRow, Platform.screen.mainScreen.heightDIPs, this._includesAnchored);
				app.on(app.orientationChangedEvent, (args: app.OrientationChangedEventData) => {
					//sets the content view to have a min height so that scroll always allows full coverage of header, with or without anchor.
					ParallaxUtilities.setMinimumHeight(contentView, anchoredRow, this._minimumHeights[args.newValue], this._includesAnchored);
				});

				scrollView.on(ScrollView.scrollEvent, (args: ScrollEventData) => {
					if (this._includesAnchored) {
						anchoredRow.marginTop = ParallaxUtilities.getAnchoredTopHeight(maxTopViewHeight, scrollView.verticalOffset);
					}

					headerView.height = ParallaxUtilities.getTopViewHeight(maxTopViewHeight, scrollView.verticalOffset);

					//fades in and out label in topView
					ParallaxUtilities.fadeViews(maxTopViewHeight, scrollView.verticalOffset, viewsToFade, this._topOpacity);

					//leaving in the up/down detection as it may be handy in the future.
					if (prevOffset <= scrollView.verticalOffset) {
						//when scrolling down
					} else {
						//scrolling up,
					}
					prevOffset = scrollView.verticalOffset;
				});
			}
		});
	}


	_addChildFromBuilder = (name: string, value: any) => {
		if (value instanceof View) {
			this._childLayouts.push(value);
		}
	};
}