export interface IPageTitleChangeHandler {
    onPageTitleChange(title: string):void;
}

class PageTitleService {
    private handlers: IPageTitleChangeHandler[] = [];

    constructor(
        private readonly window: Window
    ) {
    }

    public setPageTitle = (title: string): void => {
        this.window.document.title = title;
        this.handlers.forEach((handler) => {
            handler.onPageTitleChange(title);
        });
    };

    public registerPageTitleChangeHandler = (handler: IPageTitleChangeHandler) => {
        this.handlers.push(handler);
    };

    public deregisterPageTitleChangeHandler = (handler: IPageTitleChangeHandler) => {
        const index = this.handlers.indexOf(handler, 0);
        if (index > -1) {
            this.handlers.splice(index, 1);
        }
    }
}

export default PageTitleService;