import {Dialog} from "@blueprintjs/core";
import * as React from "react";
import INotificationService, {NotificationType} from "../../notification/service/INotificationService";
import IAuthenticationService from "../service/IAuthenticationService";
import AuthenticationForm from "./AuthenticationForm";

export interface IAuthenticationOverlayProps {
    readonly authenticationService: IAuthenticationService;
    readonly notificationService: INotificationService;
}

export interface IAuthenticationDialogState {
    readonly loading: boolean,
    readonly show: boolean,
}

class AuthenticationDialog extends React.Component<IAuthenticationOverlayProps, IAuthenticationDialogState> {
    public state: IAuthenticationDialogState = {
        loading: false,
        show: true,
    };

    public render = () => {
        return [
            <Dialog isOpen={this.state.show} key="authentication-dialog" icon="log-in" title="Login">
                <AuthenticationForm loading={this.state.loading} onLogin={this.onLogin}/>
            </Dialog>
        ];
    };

    private onLogin = (
        username: string,
        password: string
    ) => {
        this.setState({
            loading: true
        });
        const self = this;
        this.props.authenticationService
            .authenticate(username,password)
            .catch(() => {
                self.setState({
                    loading: false
                });
                this.props.notificationService.notifyUser({
                    message: "There was a problem logging you in, please try again later.",
                    type: NotificationType.ERROR
                });
            })
            .then((result: boolean) => {
                self.setState({
                    loading: false
                });
                if (result) {
                    this.props.notificationService.notifyUser({
                        message: "Successful login!",
                        type: NotificationType.SUCCESS
                    });
                } else {
                    this.props.notificationService.notifyUser({
                        message: "Login failed, please try again!",
                        type: NotificationType.WARNING
                    });
                }
            })
    };
}

export default AuthenticationDialog