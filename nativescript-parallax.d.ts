import { GridLayout } from 'ui/layouts/grid-layout';
import { View, AddChildFromBuilder } from 'ui/core/view';
import { StackLayout } from 'ui/layouts/stack-layout';
export declare class Header extends StackLayout {
}
export declare class Anchored extends StackLayout {
    private _dropShadow;
    dropShadow: boolean;
    constructor();
}
export declare class Content extends StackLayout {
}
export declare class ParallaxView extends GridLayout implements AddChildFromBuilder {
    private _controlsToFade;
    private _childLayouts;
    private _includesAnchored;
    private _topOpacity;
    private _loaded;
    private _minimumHeights;
    private _bounce;
    bounce: boolean;
    controlsToFade: string;
    android: any;
    ios: any;
    constructor();
    private setMinimumHeight(contentView, anchoredRow, minHeight);
    private getMinimumHeights();
    private addDropShadow(marginTop, width);
    private shadowView(opacity, width);
    private fadeViews(topHeight, verticalOffset, viewsToFade);
    private getAnchoredTopHeight(topHeight, verticalOffset);
    private getTopViewHeight(topHeight, verticalOffset);
    displayDevWarning(message: string, ...viewsToCollapse: View[]): void;
    _addChildFromBuilder: (name: string, value: any) => void;
}
