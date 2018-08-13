export enum NotificationType {
    INFO,
    SUCCESS,
    WARNING,
    ERROR
}

export interface INotification {
    message: string,
    type: NotificationType
}

export interface INotificationHandler {
    handleNotification(notification: INotification):void;
}

interface INotificationService {
    notifyUser(notification: INotification):void;

    registerNotificationHandler(handler: INotificationHandler): void;
    deregisterNotificationHandler(handler: INotificationHandler): void;
}

export default INotificationService;