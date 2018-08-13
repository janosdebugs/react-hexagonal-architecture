import {ChronoUnit, LocalDateTime} from "js-joda";
import EAuthenticationFailed from "../exception/EAuthenticationFailed";
import IAuthenticationBackendApi, {IAuthenticationResponse} from "./IAuthenticationBackendApi";

class FakeAuthenticationBackendApi implements IAuthenticationBackendApi {
    public authenticate = (username: string, password: string): Promise<IAuthenticationResponse> => {
        return new Promise<IAuthenticationResponse>((resolve, reject) => {
            setTimeout(() => {
                if (password === "letmein") {
                    resolve({
                        accessToken: {
                            accountId: username,
                            expires: LocalDateTime.now().plus(1, ChronoUnit.HOURS),
                            id: "asdf"
                        }
                    });
                } else {
                    reject(new EAuthenticationFailed());
                }
            }, 500);
        });
    };

    public deauthenticate = (accessTokenId: string): Promise<void> => {
        return new Promise<void>((onFulfill, onReject) => {
            onFulfill();
        });
    };
}

export default FakeAuthenticationBackendApi;