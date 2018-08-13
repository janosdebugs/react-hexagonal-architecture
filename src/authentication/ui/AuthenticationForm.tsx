import {Button, FormGroup, InputGroup, Spinner} from "@blueprintjs/core";
import * as React from "react";
import DialogBody from "../../ui/DialogBody";
import DialogFooter from "../../ui/DialogFooter";

export type IAuthenticationFormLoginHandler = (username: string, password: string) =>void;

export interface ILoginScreenProps {
    onLogin: IAuthenticationFormLoginHandler,
    loading: boolean
}

export interface ILoginScreenState {
    readonly password: string,
    readonly username: string,
}

class AuthenticationForm extends React.Component<ILoginScreenProps, ILoginScreenState> {
    public state: ILoginScreenState = {
        password: "",
        username: ""
    };

    private usernameInput: HTMLInputElement|null;
    private passwordInput: HTMLInputElement|null;

    public render = () => {
        return [
            <DialogBody key="login-form">
                <FormGroup
                    label="Username"
                    labelFor="username"
                    key="username"
                >
                    <InputGroup
                        id="username"
                        placeholder="your-username"
                        type="text"
                        onChange={this.onUsernameChange}
                        onKeyDown={this.onKeyDown}
                        value={this.state.username}
                        autoFocus={true}
                        inputRef={this.onUsernameInputRef}
                    />
                </FormGroup>
                <FormGroup
                    label="Password"
                    labelFor="password"
                    key="password"
                >
                    <InputGroup
                        id="password"
                        placeholder="********"
                        type="password"
                        onChange={this.onPasswordChange}
                        onKeyDown={this.onKeyDown}
                        value={this.state.password}
                        inputRef={this.onPasswordInputRef}
                    />
                </FormGroup>
            </DialogBody>,
            <DialogFooter key="login-footer">
                <Button
                    onClick={this.onLogin}
                    icon="log-in"
                    text="Login"
                    disabled={this.state.username === "" || this.state.password === "" || this.props.loading}
                    key="login"
                />
                {
                    this.props.loading?<Spinner size={Spinner.SIZE_SMALL} />:null
                }
            </DialogFooter>
        ];
    };

    private onUsernameInputRef = (input: HTMLInputElement) => {
        this.usernameInput = input;
    };

    private onPasswordInputRef = (input: HTMLInputElement) => {
        this.passwordInput = input;
    };

    private onUsernameChange = (event: React.FormEvent<HTMLInputElement>) => {
        this.setState({
            username: event.currentTarget.value
        });
    };

    private onPasswordChange = (event: React.FormEvent<HTMLInputElement>) => {
        this.setState({
            password: event.currentTarget.value
        });
    };

    private onKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            if (this.state.username !== "" && this.state.password !== "") {
                this.onLogin();
            } else if (this.state.username === "") {
                if (this.usernameInput !== null) {
                    this.usernameInput.focus();
                }
            } else if (this.state.password === "") {
                if (this.passwordInput !== null) {
                    this.passwordInput.focus();
                }
            }
        }
    };

    private onLogin = () => {
        this.props.onLogin(
            this.state.username,
            this.state.password
        );
    }
}

export default AuthenticationForm;
