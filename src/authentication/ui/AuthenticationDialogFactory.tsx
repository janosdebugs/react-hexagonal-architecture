import * as React from "react";
import NotificationServiceFactory from "../../notification/service/NotificationServiceFactory";
import AuthenticationServiceFactory from "../service/AuthenticationServiceFactory";
import AuthenticationDialog from "./AuthenticationDialog";

class AuthenticationDialogFactory {
    public constructor(
        readonly authenticationServiceFactory: AuthenticationServiceFactory,
        readonly notificationServiceFactory : NotificationServiceFactory
    ) {

    }

    public create = () : JSX.Element => {
        return <AuthenticationDialog
            authenticationService={this.authenticationServiceFactory.create()}
            notificationService={this.notificationServiceFactory.create()}
        />
    }
}

export default AuthenticationDialogFactory;