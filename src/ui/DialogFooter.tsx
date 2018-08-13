import {Classes} from "@blueprintjs/core";
import * as React from "react";

class DialogFooter extends React.Component {
    public render() {
        return (
            <div className={Classes.DIALOG_FOOTER}>
                {this.props.children}
            </div>
        )
    }
}

export default DialogFooter;