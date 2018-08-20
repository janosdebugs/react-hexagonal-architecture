import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import AuthenticationBackendFactory from "./authentication/backend/AuthenticationBackendFactory";
import AuthenticationServiceFactory from "./authentication/service/AuthenticationServiceFactory";
import AuthenticationDialogFactory from "./authentication/ui/AuthenticationDialogFactory";
import RequireAuthenticatedFactory from "./authentication/ui/RequireAuthenticatedFactory";
import BlogViewFactory from "./blog/ui/BlogViewFactory";
import Dashboard from "./dashboard/ui/Dashboard";
import './index.css';
import NotificationServiceFactory from "./notification/service/NotificationServiceFactory";
import ToastHandlerFactory from "./notification/ui/ToastHandlerFactory";
import BrowserHistoryServiceFactory from "./router/service/BrowserHistoryServiceFactory";
import PageTitleServiceFactory from "./router/service/PageTitleServiceFactory";
import RoutingServiceFactory from "./router/service/RoutingServiceFactory";
import LinkFactory from "./router/ui/LinkFactory";
import RouterFactory from "./router/ui/RouterFactory";
import SidebarFactory from "./ui/SidebarFactory";

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

const routingServiceFactory = new RoutingServiceFactory(window.location.pathname);

const requireAuthenticatedFactory = new RequireAuthenticatedFactory(
    authenticationServiceFactory
);

const titleServiceFactory = new PageTitleServiceFactory(
    window
);

const routerFactory = new RouterFactory(
    routingServiceFactory.create(),
    titleServiceFactory.create()
);

const browserHistoryServiceFactory = new BrowserHistoryServiceFactory(
    window.location.protocol + "//" + window.location.hostname + (
        (window.location.protocol === "http:" && window.location.port !== "80") || (window.location.protocol === "https:" && window.location.port !== "443") ? ":" + window.location.port:""
    ),
    window,
    routingServiceFactory.create()
);
browserHistoryServiceFactory.create().register();

const linkFactory = new LinkFactory(routingServiceFactory.create());

const sidebarFactory = new SidebarFactory(linkFactory);

const blogViewFactory = new BlogViewFactory();

ReactDOM.render(
  <App
      authenticationOverlay={authenticationOverlayFactory.create()}
      toastHandler={toastHandlerFactory.create()}
      sidebar={requireAuthenticatedFactory.create(sidebarFactory.create())}
  >
      {
        requireAuthenticatedFactory.create([
            routerFactory.create("/", "Dashboard", <Dashboard/>),
            routerFactory.create("/blog", "Blog", blogViewFactory.create()),
        ])
      }
  </App>,
  document.getElementById('root') as HTMLElement
);
