import React from 'react';
import {Link} from "react-router-dom";
// import "./SignInComponent.scss"

class SignInComponent extends React.Component{
    render() {
        return(
            <div className="container">
                <h1>Sign In</h1>
                <form>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label"
                               htmlFor="username">Username</label>
                        <div className="col-sm-10">
                            <input className="form-control wbdv-field wbdv-username" id="username"
                                   placeholder="Alice" type="text"/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label"
                               htmlFor="password">Password</label>
                        <div className="col-sm-10">
                            <input className="form-control wbdv-field wbdv-password" id="password"
                                   placeholder="123qwe#$%"
                                   type="password"/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="col-sm-10 offset-sm-2">
                            <a className="btn btn-primary btn-block wbdv-button wbdv-login"
                               href="/profile" role="button">
                                Sign in
                            </a>
                            <div className="row">
                                <div className="col">
                                    <a className="wbdv-link wbdv-forgot-password" href="#">Forgot
                                        Password?</a>
                                </div>
                                <div className="col">
                                    <a className="float-right wbdv-link wbdv-register">
                                    <Link to="/signUp">
                                        Sign up
                                    </Link>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
    )
    }
}

export default SignInComponent;
