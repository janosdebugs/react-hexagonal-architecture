import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import AuthenticationBackendFactory from "./authentication/backend/AuthenticationBackendFactory";
import AuthenticationServiceFactory from "./authentication/service/AuthenticationServiceFactory";
import AuthenticationDialogFactory from "./authentication/ui/AuthenticationDialogFactory";
import './index.css';
import NotificationServiceFactory from "./notification/service/NotificationServiceFactory";
import ToastHandlerFactory from "./notification/ui/ToastHandlerFactory";

const authenticationBackendFactory = new AuthenticationBackendFactory();
const authenticationServiceFactory = new AuthenticationServiceFactory(authenticationBackendFactory);

const notificationServiceFactory = new NotificationServiceFactory();
const toastHandlerFactory = new ToastHandlerFactory(
    notificationServiceFactory
);

const authenticationOverlayFactory = new AuthenticationDialogFactory(
    authenticationServiceFactory,
    notificationServiceFactory
);

ReactDOM.render(
  <App
      toastHandler={toastHandlerFactory.create()}
      authenticationOverlay={authenticationOverlayFactory.create()}
  />,
  document.getElementById('root') as HTMLElement
);
