import * as app from 'application';
import * as Platform from 'platform';
import {ScrollView, ScrollEventData} from 'ui/scroll-view';
import {GridLayout, ItemSpec, GridUnitType} from 'ui/layouts/grid-layout';
import {AbsoluteLayout} from 'ui/layouts/absolute-layout';
import {View, AddChildFromBuilder} from 'ui/core/view';
import {Label} from 'ui/label';
import { ListView } from 'ui/list-view';
import {StackLayout} from 'ui/layouts/stack-layout';
import {Color} from 'color';
import {ParallaxView, Header, Content, Anchored, IMinimumHeights } from './nativescript-parallax';
import { SwipeDirection, GestureEventData, SwipeGestureEventData, PanGestureEventData } from 'ui/gestures';


export class ParallaxUtilities {

	public static setMinimumHeight(contentView: Content, anchoredRow: AbsoluteLayout, minHeight: number, includesAnchored): void {
		if (includesAnchored) {
			minHeight = minHeight - (anchoredRow.height * 0.9); //0.9 is to give it a little bit extra space.
		}
		contentView.minHeight = minHeight;
	}

	public static getMinimumHeights(): IMinimumHeights {
		let height1 = Platform.screen.mainScreen.heightDIPs;
		let height2 = Platform.screen.mainScreen.widthDIPs;
		//if the first hieght is lager than the second hiehgt it's the portrait views min hieght.
		if (height1 > height2) {
			return {
				portrait: height1,
				landscape: height2
			};
		} else {
			return {
				portrait: height2,
				landscape: height1
			};
		}
	}

	public static addDropShadow(marginTop: number, width: number): StackLayout {
		let wrapper = new StackLayout();
		wrapper.width = width;
		wrapper.height = 3;
		wrapper.marginTop = marginTop;
		wrapper.addChild(this.shadowView(0.4, width));
		wrapper.addChild(this.shadowView(0.2, width));
		wrapper.addChild(this.shadowView(0.05, width));
		return wrapper;
	}

	private static shadowView(opacity: number, width: number): StackLayout {
		let shadowRow = new StackLayout();
		shadowRow.backgroundColor = new Color('black');
		shadowRow.opacity = opacity;
		shadowRow.height = 1;
		return shadowRow;
	}
	public static fadeViews(topHeight: number, verticalOffset: number, viewsToFade: View[], topOpacity): void {
		if (verticalOffset < topHeight) {
			topOpacity = parseFloat((1 - (verticalOffset * 0.01)).toString());
			if (topOpacity > 0 && topOpacity <= 1) {
				//fade each control
				viewsToFade.forEach((view: View): void => {
					view.opacity = topOpacity;
				});
			}
		}
	}
	public static getAnchoredTopHeight(topHeight: number, verticalOffset: number): number {
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
	public static getTopViewHeight(topHeight: number, verticalOffset: number): number {
		if ((topHeight - verticalOffset) >= 0) {
			return topHeight - verticalOffset;
		} else {
			return 0;
		}
	}

	public static displayDevWarning(parent:GridLayout, message: string, ...viewsToCollapse: View[]): void {
		let warningText = new Label();
		warningText.text = message;
		warningText.color = new Color('red');
		warningText.textWrap = true;
		warningText.marginTop = 50;
		parent.addChild(warningText);
		viewsToCollapse.forEach((view: View) => {
			if (view != null) {
				view.visibility = 'collapse';
			}
		});
	}
}