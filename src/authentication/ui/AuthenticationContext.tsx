import * as React from "react";
import IAuthenticationService, {IAuthenticationChangeListener} from "../service/IAuthenticationService";

export interface AuthenticationContextProps {
    readonly authenticationService: IAuthenticationService;
}

export interface AuthenticationContextState {
    readonly isAuthenticated : boolean;
}

class AuthenticationContext extends React.Component<AuthenticationContextProps,AuthenticationContextState> implements IAuthenticationChangeListener {
    public state : AuthenticationContextState = {
        isAuthenticated: false
    };

    componentDidMount = (): void => {
        this.props.authenticationService.registerAuthenticationChangeListener(this);
        this.onAuthenticationChange();
    };



    onAuthenticationChange = ():void => {
        this.setState({
            isAuthenticated: this.props.authenticationService.isAuthenticated()
        });
    };

    public render = () => {
        return this.ch
    }
}

export default AuthenticationContext;