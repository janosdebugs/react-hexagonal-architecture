import AuthenticationBackendFactory from "../backend/AuthenticationBackendFactory";
import AuthenticationServiceImpl from "./AuthenticationServiceImpl";
import IAuthenticationService from "./IAuthenticationService";

class AuthenticationServiceFactory {
    private authenticationService: IAuthenticationService = new AuthenticationServiceImpl(
        this.authenticationBackendFactory.create()
    );

    public constructor(
        readonly authenticationBackendFactory: AuthenticationBackendFactory
    ) {
    }

    public create = () : IAuthenticationService => {
        return this.authenticationService;
    };
}

export default AuthenticationServiceFactory;