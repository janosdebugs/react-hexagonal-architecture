import BrowserHistoryService from "./BrowserHistoryService";
import RoutingService from "./RoutingService";

class BrowserHistoryServiceFactory {
    private readonly service: BrowserHistoryService;

    constructor(
        baseUrl: string,
        window: Window,
        routingService: RoutingService
    ) {
        this.service = new BrowserHistoryService(
            baseUrl,
            window,
            routingService
        );
    }

    public create():BrowserHistoryService {
        return this.service;
    }
}

export default BrowserHistoryServiceFactory;