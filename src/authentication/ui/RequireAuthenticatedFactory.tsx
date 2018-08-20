import * as React from "react";
import AuthenticationServiceFactory from "../service/AuthenticationServiceFactory";
import RequireAuthenticated from "./RequireAuthenticated";

class RequireAuthenticatedFactory {
    public constructor(
        readonly authenticationServiceFactory: AuthenticationServiceFactory
    ) {

    }

    public create = (children : JSX.Element|JSX.Element[]) : JSX.Element => {
        return <RequireAuthenticated
            authenticationService={this.authenticationServiceFactory.create()}
        >
            {
                children
            }
        </RequireAuthenticated>
    }
}

export default RequireAuthenticatedFactory;