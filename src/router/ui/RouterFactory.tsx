import * as React from "react";
import PageTitleService from "../service/PageTitleService";
import RoutingService from "../service/RoutingService";
import Router from "./Router";

class RouterFactory {
    constructor(
        private readonly routingService: RoutingService,
        private readonly titleService: PageTitleService
    ) {
    }

    public create(path: string, title: string, children: JSX.Element|JSX.Element[]) {
        return <Router routingService={this.routingService} path={path} title={title} titleService={this.titleService}>
            {children}
        </Router>;
    }
}

export default RouterFactory;
