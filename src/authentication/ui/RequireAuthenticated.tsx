import * as React from "react";
import IAuthenticationService, {IAuthenticationChangeListener} from "../service/IAuthenticationService";

export interface IAuthenticationContextProps {
    readonly authenticationService: IAuthenticationService;
}

export interface IAuthenticationContextState {
    readonly isAuthenticated : boolean;
}

class RequireAuthenticated extends React.Component<IAuthenticationContextProps,IAuthenticationContextState> implements IAuthenticationChangeListener {
    public state : IAuthenticationContextState = {
        isAuthenticated: false
    };

    public componentDidMount = (): void => {
        this.props.authenticationService.registerAuthenticationChangeListener(this);
        this.onAuthenticationChange();
    };

    public onAuthenticationChange = ():void => {
        this.setState({
            isAuthenticated: this.props.authenticationService.isAuthenticated()
        });
    };

    public render = () => {
        return this.state.isAuthenticated?this.props.children:[];
    }
}

export default RequireAuthenticated;