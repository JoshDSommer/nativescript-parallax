import * as observable from 'data/observable';
import { ScrollView, ScrollEventData } from 'ui/scroll-view';
import * as pages from 'ui/page';

// Event handler for Page "loaded" event attached in main-page.xml
export function pageLoaded(args: observable.EventData) {
	let page = <pages.Page>args.object;
	page.actionBarHidden = true;
}

exports.onScroll = function (args: any) {
	var data = args.data as ScrollEventData;
	console.log("Scrolling: " + args.direction + " " + data.scrollY);
}

exports.onAnchored = function (args: any) {
	console.log("Anchored");
}

exports.onUnAnchored = function (args: any) {
	console.log("UnAnchored");
}