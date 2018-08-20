import * as React from 'react';
import '../node_modules/@blueprintjs/core/lib/css/blueprint.css';
import '../node_modules/@blueprintjs/icons/lib/css/blueprint-icons.css';
import './App.css';

interface IAppProps {
    authenticationOverlay: JSX.Element,
    toastHandler: JSX.Element,
    sidebar: JSX.Element
}

class App extends React.Component<IAppProps> {
  public render() {
    return <div className="app">
        {this.props.toastHandler}
        {this.props.authenticationOverlay}
        <div className="app__sidebar">
            {this.props.sidebar}
        </div>
        <div className="app__main">
            <div className="app__pages">
              {this.props.children}
            </div>
        </div>
      </div>
    ;
  }
}

export default App;
