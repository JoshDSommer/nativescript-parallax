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
    controlsToFade: string;
    android: any;
    ios: any;
    constructor();
    addDropShadow(marginTop: number, width: number): StackLayout;
    shadowView(opacity: number, width: number): StackLayout;
    fadeViews(topHeight: number, verticalOffset: number, viewsToFade: View[]): void;
    getAnchoredTopHeight(topHeight: number, verticalOffset: number): number;
    getTopViewHeight(topHeight: number, verticalOffset: number): number;
    displayDevWarning(message: string, ...viewsToCollapse: View[]): void;
    _addChildFromBuilder: (name: string, value: any) => void;
}
