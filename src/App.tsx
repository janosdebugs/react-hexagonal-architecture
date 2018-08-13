import * as React from 'react';
import '../node_modules/@blueprintjs/core/lib/css/blueprint.css';
import '../node_modules/@blueprintjs/icons/lib/css/blueprint-icons.css';
import './App.css';

interface IAppProps {
  toastHandler: JSX.Element,
  authenticationOverlay: JSX.Element
}

class App extends React.Component<IAppProps> {
  public render() {
    return [
      this.props.toastHandler,
      this.props.authenticationOverlay
    ];
  }
}

export default App;
