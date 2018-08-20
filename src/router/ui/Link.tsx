import * as React from "react";
import RoutingService from "../service/RoutingService";

export interface ILinkProps {
    children: undefined|string|JSX.Element|JSX.Element[],
    className: string|undefined,
    path: string,
    routingService : RoutingService
}

class Link extends React.Component<ILinkProps> {

    public onClick = (event: React.MouseEvent<HTMLAnchorElement>):void => {
        event.preventDefault();
        this.props.routingService.changeRoute(this.props.path);
    };

    public render() {
        return <a href={this.props.path} className={this.props.className} onClick={this.onClick}>
            {this.props.children}
        </a>
    }
}

export default Link;