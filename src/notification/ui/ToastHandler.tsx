import {IconName, Intent, Position, Toaster} from "@blueprintjs/core";
import * as React from "react";
import INotificationService, {
    INotification,
    INotificationHandler,
    NotificationType
} from "../service/INotificationService";

interface IToastHandlerProps {
    notificationService: INotificationService
}

class ToastHandler extends React.PureComponent<IToastHandlerProps, {}> implements INotificationHandler {
    private toaster: Toaster;
    private refHandlers = {
        toaster: (ref: Toaster) => this.toaster = ref,
    };

    public componentDidMount(): void {
        this.props.notificationService.registerNotificationHandler(this);
    }

    public componentWillUnmount(): void {
        this.props.notificationService.deregisterNotificationHandler(this);
    }

    public handleNotification(notification: INotification): void {
        let iconName: IconName;
        let intentType: Intent;
        switch (notification.type) {
            case NotificationType.ERROR:
                iconName = "error";
                intentType = Intent.DANGER;
                break;
            case NotificationType.SUCCESS:
                iconName = "tick";
                intentType = Intent.SUCCESS;
                break;
            case NotificationType.WARNING:
                iconName = "warning-sign";
                intentType = Intent.WARNING;
                break;
            case NotificationType.INFO:
                iconName = "info-sign";
                intentType = Intent.PRIMARY;
                break;
            default:
                iconName = "help";
                intentType = Intent.NONE;
                break;
        }

        this.toaster.show({
            icon: iconName,
            intent: intentType,
            message: notification.message
        });
    }

    public render() {
        return (
            <Toaster position={Position.TOP_RIGHT} ref={this.refHandlers.toaster} />
        )
    }

}

export default ToastHandler;