import INotificationService from "./INotificationService";
import NotificationServiceImpl from "./NotificationServiceImpl";

class NotificationServiceFactory {
    private notificationService : INotificationService = new NotificationServiceImpl();

    public create() : INotificationService {
        return this.notificationService;
    }
}

export default NotificationServiceFactory;