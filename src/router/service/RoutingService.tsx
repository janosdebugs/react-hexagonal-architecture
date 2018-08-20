export interface IRouteChangeHandler {
    onRouteChange(route: string) : void;
}

class RoutingService {
    private routeChangeHandlers: IRouteChangeHandler[] = [];
    private currentRoute: string;

    constructor(initialRoute: string) {
        this.changeRoute(initialRoute);
    }

    public changeRoute = (path: string) : void => {
        this.currentRoute = path;
        this.routeChangeHandlers.forEach((handler) => {
            handler.onRouteChange(path);
        })
    };

    public getCurrentRoute = () : string => {
        return this.currentRoute;
    };

    public registerRouteChangeHandler = (handler: IRouteChangeHandler) : void => {
        this.routeChangeHandlers.push(handler);
    };

    public unregisterRouteChangeHandler = (handler: IRouteChangeHandler) : void => {
        const index = this.routeChangeHandlers.indexOf(handler, 0);
        if (index > -1) {
            this.routeChangeHandlers.splice(index, 1);
        }
    }
}

export default RoutingService;