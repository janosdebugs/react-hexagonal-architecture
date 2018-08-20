import * as React from "react";
import PageTitleService from "../service/PageTitleService";
import RoutingService, {IRouteChangeHandler} from "../service/RoutingService";
import "./Router.css";

export interface IRouterProps {
    routingService: RoutingService,
    path: string,
    title: string
    titleService: PageTitleService
}

export enum RouterStatus {
    INACTIVE = "inactive",
    PREACTIVATING = "preactivating",
    ACTIVATING = "activating",
    ACTIVE = "active",
    DEACTIVATING = "deactivating"
}

export interface IRouterState {
    status: RouterStatus,
    matches: boolean,
    timer: NodeJS.Timer|null;
}

class Router extends React.Component<IRouterProps, IRouterState> implements IRouteChangeHandler {
    public state = {
        matches: false,
        status: RouterStatus.INACTIVE,
        timer: null
    };

    public componentDidMount = (): void => {
        this.props.routingService.registerRouteChangeHandler(this);
        this.onRouteChange(this.props.routingService.getCurrentRoute());
    };

    public componentWillUnmount = (): void => {
        this.props.routingService.unregisterRouteChangeHandler(this);
    };

    public onRouteChange = (path: string) :void => {
        const matches : boolean = (path === this.props.path);
        let newStatus : RouterStatus = RouterStatus.INACTIVE;
        let newTimer : NodeJS.Timer|null = this.state.timer;
        switch (this.state.status) {
            case RouterStatus.INACTIVE:
                if (matches) {
                    newStatus = RouterStatus.PREACTIVATING;
                    if (this.state.timer !== null) {
                        // @ts-ignore
                        clearTimeout(this.state.routerTimer);
                    }
                    newTimer = setTimeout(
                        this.handleNextStep,0
                    );
                    this.props.titleService.setPageTitle(this.props.title)
                }
                break;
            case RouterStatus.PREACTIVATING:
                if (!matches) {
                    newStatus = RouterStatus.INACTIVE;
                    if (this.state.timer !== null) {
                        // @ts-ignore
                        clearTimeout(this.state.routerTimer);
                    }
                }
                break;
            case RouterStatus.ACTIVATING:
                if (!matches) {
                    newStatus = RouterStatus.DEACTIVATING;
                    if (this.state.timer !== null) {
                        // @ts-ignore
                        clearTimeout(this.state.routerTimer);
                    }
                    newTimer = setTimeout(
                        this.handleNextStep,250
                    );
                }
                break;
            case RouterStatus.ACTIVE:
                if (!matches) {
                    newStatus = RouterStatus.DEACTIVATING;
                    if (this.state.timer !== null) {
                        // @ts-ignore
                        clearTimeout(this.state.routerTimer);
                    }
                    newTimer = setTimeout(
                        this.handleNextStep,250
                    );
                }
                break;
            case RouterStatus.DEACTIVATING:
                if (matches) {
                    newStatus = RouterStatus.ACTIVATING;
                    if (this.state.timer !== null) {
                        // @ts-ignore
                        clearTimeout(this.state.routerTimer);
                    }
                    newTimer = setTimeout(
                        this.handleNextStep,250
                    );
                }
                break;
        }
        this.setState({
            "matches": matches,
            "status": newStatus,
            "timer": newTimer
        });
    };

    public handleNextStep = () => {
        switch (this.state.status) {
            case RouterStatus.PREACTIVATING:
                this.setState({
                    "status": RouterStatus.ACTIVATING,
                    "timer": setTimeout(
                        this.handleNextStep,250
                    )
                });
                break;
            case RouterStatus.ACTIVATING:
                this.setState({
                   "status": RouterStatus.ACTIVE,
                    "timer": null
                });
                break;
            case RouterStatus.DEACTIVATING:
                this.setState({
                    "status": RouterStatus.INACTIVE,
                    "timer": null
                });
                break;
        }
    };

    public render = () => {
        return <div className={"router router--" + this.state.status.toString().toLowerCase() + (this.state.matches?" router--matches":"")}>
            {this.state.status === RouterStatus.INACTIVE?null:this.props.children}
        </div>;
    }
}

export default Router;