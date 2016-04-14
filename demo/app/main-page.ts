import * as observable from 'data/observable';
import * as pages from 'ui/page';

// Event handler for Page "loaded" event attached in main-page.xml
export function pageLoaded(args: observable.EventData) {
	let page = <pages.Page>args.object;
	page.actionBarHidden = true;
}