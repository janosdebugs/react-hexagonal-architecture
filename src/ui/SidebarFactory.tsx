import * as React from "react";
import LinkFactory from "../router/ui/LinkFactory";
import Sidebar from "./Sidebar";

class SidebarFactory {
    constructor(
        private readonly linkFactory: LinkFactory
    ) {
    }

    public create = ():JSX.Element => {
        return <Sidebar linkFactory={this.linkFactory} />
    };
}

export default SidebarFactory;