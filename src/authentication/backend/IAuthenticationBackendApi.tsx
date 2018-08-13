import IAccessToken from "../entity/IAccessToken";

export interface IAuthenticationResponse {
    readonly accessToken: IAccessToken;
}

interface IAuthenticationBackendApi {
    /**
     * Authenticate against the backend API.
     * @param {string} username the username to authenticate with
     * @param {string} password the password to authenticate with
     * @returns {Promise<IAuthenticationResponse>}
     * @throws EAuthenticationFailed
     */
    authenticate(username: string, password: string): Promise<IAuthenticationResponse>;

    deauthenticate(accessTokenId: string):Promise<void>;
}

export default IAuthenticationBackendApi;
