import React from 'react';
import {
    TextField,
    Button,
    Switch,
} from '@mui/material';
import './css/LoginPage.css';
import {
    Link,
    Navigate,
  } from "react-router-dom";
class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            signupClicked: false,
            email: '',
            password: '',
            isAdmin: false,
            loginsuccess: false,
        };

        this.handleEmailInputChange = this.handleEmailInputChange.bind(this);
        this.handlePasswordInputChange = this.handlePasswordInputChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleSignup = this.handleSignup.bind(this);
        this.handleCreateAccount = this.handleCreateAccount.bind(this);
        this.handleSwitchChange = this.handleSwitchChange.bind(this);
    }

    handleEmailInputChange(e) {
        this.setState({ email: e.target.value });
    }
    
    handlePasswordInputChange(e) {
        this.setState({ password: e.target.value });
    }

    async handleLogin() {
        // Call Login Endpoint
        const {
            email, password
        } = this.state;
        const { handleLogin } = this.props;

        await handleLogin({email, password});

        this.setState({ loginsuccess: true });

    }

    handleSignup() {
        this.setState({ signupClicked: true });
    }

    handleCreateAccount() {
        // Call Create Account Endpoint
        const {
            email, password, isAdmin
        } = this.state;

        console.log(email, password, isAdmin);
    }

    handleSwitchChange() {
        this.setState(prevState => ({isAdmin: !prevState.isAdmin}));
    }


    render() {
        const {
            signupClicked,
            isAdmin,
            loginsuccess,
        } = this.state;
        return (
            <>
                { loginsuccess && <Navigate to="/" />}
                { !signupClicked ? (
                    <div className='login-page'>
                        SIGN IN TO YOUR PROFILE
                        <div className='login-box'>
                            <label>Email:&nbsp;</label>
                            <TextField
                                type='email'
                                placeholder='Enter Email'
                                onChange={this.handleEmailInputChange}
                            />
                        </div>
                        <div className='login-box'>
                            <label>Password:&nbsp;</label>
                            <TextField
                                type='password'
                                placeholder='Enter Password'
                                onChange={this.handlePasswordInputChange}
                            />
                        </div>
                        <div>
                            <Button onClick={this.handleLogin}>Login</Button>
                            <Button onClick={this.handleSignup}>Signup</Button>
                        </div>
                    </div>
                ) : (
                    <div className='login-page'>
                        CREATE A PROFILE
                        <div className='login-box'>
                            <label>Email:&nbsp;</label>
                            <TextField
                                type='email'
                                placeholder='Enter Email'
                                onChange={this.handleEmailInputChange}
                            />
                        </div>
                        <div className='login-box'>
                            <label>Password:&nbsp;</label>
                            <TextField
                                type='password'
                                placeholder='Enter Password'
                                onChange={this.handlePasswordInputChange}
                            />
                        </div>
                        <div className='login-box'>
                            User
                            <Switch
                                checked={isAdmin}
                                onChange={this.handleSwitchChange}
                            />
                            Admin
                        </div>
                        <div>
                            <Button onClick={this.handleCreateAccount}>CREATE ACCOUNT</Button>
                        </div>
                    </div>
                )}
            </>
        );
        // return (
        //     <div id="login-mode-div" className="padded-page">
        //     <center>
        //         <h1 />
        //         <form id="loginInterface" onSubmit={this.handleLoginSubmit} onChange={this.handleLoginChange}>
        //         <label htmlFor="emailInput" style={{ padding: 0, fontSize: 24 }}>
        //             Email:
        //             <input
        //             ref={this.emailInputRef}
        //             className="form-control login-text"
        //             type="email"
        //             placeholder="Enter Email Address"
        //             id="emailInput"
        //             pattern="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}"
        //             required={true}
        //             />
        //         </label>
        //         <p />
        //         <label htmlFor="passwordInput" style={{ padding: 0, fontSize: 24 }}>
        //             Password:
        //             <input
        //             ref={this.passwordInputRef}
        //             className="form-control login-text"
        //             type="password"
        //             placeholder="Enter Password"
        //             pattern="[A-Za-z0-9!@#$%^&*()_+\-]+"
        //             required={true}
        //             />
        //         </label>
        //         <p className="bg-danger" id="feedback" style={{ fontSize: 16 }} />
        //         <button
        //             type="submit"
        //             className="btn-color-theme btn btn-primary btn-block login-btn">
        //             <span id="login-btn-icon"/>
        //             &nbsp;
        //         </button>
        //         <p>
        //         <button type="button" className="btn btn-link login-link" >
        //             Create an account</button> | 
        //             <button type="button" className="btn btn-link login-link">
        //             Reset your password</button>
        //         </p>  
        //         </form>
        //     </center>
        // </div>
        // );
    }
}

export default LoginPage;