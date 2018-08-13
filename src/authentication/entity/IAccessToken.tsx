import {LocalDateTime} from "js-joda";

interface IAccessToken {
    readonly id: string;
    readonly accountId: string;
    readonly expires: LocalDateTime;
}

export default IAccessToken;