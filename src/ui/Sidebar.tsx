import * as React from "react";
import LinkFactory from "../router/ui/LinkFactory";

export interface ISidebarProps {
    linkFactory: LinkFactory
}

class Sidebar extends React.Component<ISidebarProps> {
    public render() {
        return <div className="sidebar">
            Logo
            <nav>
                <ul>
                    <li>
                        {
                            this.props.linkFactory.create(
                                "Home",
                                "sidebar__link",
                                "/"
                            )
                        }
                    </li>
                    <li>
                        {
                            this.props.linkFactory.create(
                                "Blog",
                                "sidebar__link",
                                "/blog"
                            )
                        }
                    </li>
                </ul>
            </nav>
        </div>
    }
}

export default Sidebar;