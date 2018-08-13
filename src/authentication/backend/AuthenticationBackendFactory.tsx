import FakeAuthenticationBackendApi from "./FakeAuthenticationBackendApi";
import IAuthenticationBackendApi from "./IAuthenticationBackendApi";

class AuthenticationBackendFactory {
    public create = () : IAuthenticationBackendApi => {
        return new FakeAuthenticationBackendApi();
    };
}

export default AuthenticationBackendFactory;