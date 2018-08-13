import IAccount from "../../account/entity/IAccount";
import IAccessToken from "../entity/IAccessToken";

export interface IAuthenticationChangeListener {
    onAuthenticationChange():void;
}

export interface IAuthenticationHandler {
    showAuthenticationForm():void;
}

interface IAuthenticationService {
    registerAuthenticationChangeListener(listener: IAuthenticationChangeListener):void;
    deregisterAuthenticationChangeListener(listener: IAuthenticationChangeListener):void;

    /**
     * Fetch the current access token. If no access token is present, the appropriate login screen will be shown and
     * the promise returned once the login is complete.
     *
     * @returns {null|IAccessToken}
     */
    getCurrentAccessToken() : IAccessToken|null;

    /**
     * Get the current account. If user is not logged in the login screen is shown and the promise returned once
     * the login process is complete.
     *
     * @returns {null|IAccount}
     */
    getCurrentAccount(): null|IAccount;

    /**
     * Check if we are currently authenticated
     * @returns {boolean}
     */
    isAuthenticated(): boolean;

    /**
     * @param {string} username
     * @param {string} password
     * @returns {Promise<boolean>}
     */
    authenticate(username: string, password: string): Promise<boolean>

    deauthenticate() : Promise<void>;
}

export default IAuthenticationService;
