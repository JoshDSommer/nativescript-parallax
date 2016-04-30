import { GridLayout } from 'ui/layouts/grid-layout';
import { AbsoluteLayout } from 'ui/layouts/absolute-layout';
import { View } from 'ui/core/view';
import { StackLayout } from 'ui/layouts/stack-layout';
import { Content, IMinimumHeights } from './nativescript-parallax';
export declare class ParallaxUtilities {
    static setMinimumHeight(contentView: Content, anchoredRow: AbsoluteLayout, minHeight: number, includesAnchored: any): void;
    static getMinimumHeights(): IMinimumHeights;
    static addDropShadow(marginTop: number, width: number): StackLayout;
    private static shadowView(opacity, width);
    static fadeViews(topHeight: number, verticalOffset: number, viewsToFade: View[], topOpacity: any): void;
    static getAnchoredTopHeight(topHeight: number, verticalOffset: number): number;
    static getTopViewHeight(topHeight: number, verticalOffset: number): number;
    static displayDevWarning(parent: GridLayout, message: string, ...viewsToCollapse: View[]): void;
}
