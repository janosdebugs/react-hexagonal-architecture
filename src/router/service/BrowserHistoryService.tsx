import {IPageTitleChangeHandler} from "./PageTitleService";
import RoutingService, {IRouteChangeHandler} from "./RoutingService";

class BrowserHistoryService implements IRouteChangeHandler, IPageTitleChangeHandler {
    constructor(
        private readonly baseUrl: string,
        private readonly window: Window,
        private readonly routingService: RoutingService
    ) {
    }

    public register = () => {
        this.window.addEventListener("onpopstate", this.onPopState);
        this.routingService.registerRouteChangeHandler(this);
    };

    public onPopState = (event: PopStateEvent) : void => {
        this.routingService.changeRoute(this.window.location.pathname)
    };

    public onRouteChange = (route: string): void => {
        this.window.history.pushState(
            {},
            this.window.document.title,
            this.baseUrl + route
        );
    };

    public onPageTitleChange = (title: string):void => {
        this.window.history.replaceState(
            {},
            title,
            this.window.location.href
        );
    };
}

export default BrowserHistoryService;