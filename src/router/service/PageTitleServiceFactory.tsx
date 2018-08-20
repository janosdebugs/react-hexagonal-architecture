import PageTitleService from "./PageTitleService"

class PageTitleServiceFactory {
    private readonly service: PageTitleService;
    constructor (
        window: Window
    ) {
        this.service = new PageTitleService(window);
    }

    public create() : PageTitleService {
        return this.service;
    }
}

export default PageTitleServiceFactory;