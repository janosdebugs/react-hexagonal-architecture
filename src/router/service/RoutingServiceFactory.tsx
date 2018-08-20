import RoutingService from "./RoutingService";

class RoutingServiceFactory {
    private routingService : RoutingService;

    constructor(initialRoute: string) {
        this.routingService = new RoutingService(initialRoute);
    }

    public create = (): RoutingService => {
        return this.routingService;
    }
}

export default RoutingServiceFactory;