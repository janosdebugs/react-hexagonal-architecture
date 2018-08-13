import {Classes} from "@blueprintjs/core";
import * as React from "react";

class DialogBody extends React.Component {
    public render() {
        return (
            <div className={Classes.DIALOG_BODY}>
                {this.props.children}
            </div>
        )
    }
}

export default DialogBody;