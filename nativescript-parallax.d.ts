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
    private _topOpacity;
    private _loaded;
    private _minimumHeights;
    private _bounce;
    bounce: boolean;
    controlsToFade: string;
    android: any;
    ios: any;
    constructor();
}
