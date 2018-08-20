import * as React from "react";
import BlogView from "./BlogView";

class BlogViewFactory {
    public create() : JSX.Element {
        return <BlogView />
    }
}

export default BlogViewFactory;