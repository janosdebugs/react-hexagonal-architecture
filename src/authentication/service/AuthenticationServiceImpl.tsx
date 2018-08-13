import IAccount from "../../account/entity/IAccount";
import IAuthenticationBackendApi, {IAuthenticationResponse} from "../backend/IAuthenticationBackendApi";
import IAccessToken from "../entity/IAccessToken";
import EAuthenticationFailed from "../exception/EAuthenticationFailed";
import IAuthenticationService, {IAuthenticationChangeListener} from "./IAuthenticationService";

class AuthenticationServiceImpl implements IAuthenticationService {
    private accessToken: IAccessToken|null = null;
    private account: IAccount|null = null;
    private authenticationChangeListeners: IAuthenticationChangeListener[] = [];

    public constructor(
        readonly authenticationBackend: IAuthenticationBackendApi
    ) {
    }

    public authenticate = (username: string, password: string): Promise<boolean> => {
        const self = this;
        return new Promise<boolean>((onFulfilled, onRejected) => {
            this.authenticationBackend
                .authenticate(username, password)
                .then((result: IAuthenticationResponse) => {
                    self.accessToken = result.accessToken;
                    onFulfilled(true);
                })
                .catch((error) => {
                    if (error instanceof EAuthenticationFailed) {
                        onFulfilled(false);
                    } else {
                        onRejected();
                    }
                })
            });
    };

    public deauthenticate = () : Promise<void> => {
        const self = this;
        return new Promise<void>((onFulfilled, onRejected) => {
            if (self.accessToken != null) {
                self.authenticationBackend
                    .deauthenticate(self.accessToken.id)
                    .then(() => {
                            self.accessToken = null;
                            onFulfilled();
                            this.authenticationChangeListeners.forEach((changeListener) => {
                                changeListener.onAuthenticationChange();
                            });
                        }
                    )
                    .catch(
                        onRejected
                    );
            } else {
                onFulfilled();
            }
        });
    };

    public deregisterAuthenticationChangeListener = (listener: IAuthenticationChangeListener): void => {
        const index = this.authenticationChangeListeners.indexOf(listener, 0);
        if (index > -1) {
            this.authenticationChangeListeners.splice(index, 1);
        }
    };

    public getCurrentAccessToken = (): null|IAccessToken => {
        return this.accessToken;
    };

    public getCurrentAccount = (): null|IAccount => {
        return this.account;
    };

    public isAuthenticated = (): boolean => {
        return this.accessToken != null;
    };

    public registerAuthenticationChangeListener = (listener: IAuthenticationChangeListener): void => {
        this.authenticationChangeListeners.push(listener);
    };
}

export default AuthenticationServiceImpl;