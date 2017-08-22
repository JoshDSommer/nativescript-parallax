import { GridLayout } from 'ui/layouts/grid-layout';
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
export interface IMinimumHeights {
    portrait: number;
    landscape: number;
}
export declare class ParallaxView extends GridLayout {
    private _controlsToFade;
    private _childLayouts;
    private _includesAnchored;
    private _isAnchored;
    private _topOpacity;
    private _loaded;
    private _minimumHeights;
    private _bounce;
    static scrollEvent: string;
    static anchoredEvent: string;
    static unanchoredEvent: string;
    bounce: boolean;
    controlsToFade: string;
    readonly isAnchored: boolean;
    readonly android: any;
    readonly ios: any;
    constructor();
}
