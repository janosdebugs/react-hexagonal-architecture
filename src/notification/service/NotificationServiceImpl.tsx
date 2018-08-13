import INotificationService, {INotification, INotificationHandler, NotificationType} from "./INotificationService";

class NotificationServiceImpl implements INotificationService{
    private notificationHandlers : INotificationHandler[] = [];

    public deregisterNotificationHandler(handler: INotificationHandler): void {
        const index = this.notificationHandlers.indexOf(handler, 0);
        if (index > -1) {
            this.notificationHandlers.splice(index, 1);
        }
    }

    public notifyUser(notification: INotification): void {
        this.notificationHandlers.forEach((handler) => {
            handler.handleNotification(notification);
        })
    }

    public success(messageText: string) : void {
        this.notifyUser({
            message: messageText,
            type: NotificationType.SUCCESS
        })
    }

    public error(messageText: string) : void {
        this.notifyUser({
            message: messageText,
            type: NotificationType.ERROR
        })
    }

    public warning(messageText: string) : void {
        this.notifyUser({
            message: messageText,
            type: NotificationType.WARNING
        })
    }

    public info(messageText: string) : void {
        this.notifyUser({
            message: messageText,
            type: NotificationType.INFO
        })
    }

    public registerNotificationHandler(handler: INotificationHandler): void {
        this.notificationHandlers.push(handler);
    }

}

export default NotificationServiceImpl;