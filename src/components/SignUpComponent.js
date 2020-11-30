import React from 'react';

class SignUpComponent extends React.Component{
    render() {
        return(
            <div className="container">
                <h1>Sign Up</h1>
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
                        <label className="col-sm-2 col-form-label" htmlFor="verifyPassword">Verify
                            Password</label>
                        <div className="col-sm-10">
                            <input className="form-control wbdv-field wbdv-password-verify"
                                   id="verifyPassword" placeholder="123qwe#$%"
                                   type="password"/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="col-sm-10 offset-sm-2">
                            <a className="btn btn-primary btn-block wbdv-button wbdv-register"
                               href="../profile/profile.template.client.html" role="button">
                                Sign up
                            </a>
                            <div className="row">
                                <div className="col">
                                    <a className="wbdv-link wbdv-link wbdv-login"
                                       href="../login/login.template.client.html">
                                        Login
                                    </a>
                                </div>
                                <div className="col">
                                    <a className="float-right"
                                       href="../course-list/course-list.template.client.html">
                                        Cancel
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

export default SignUpComponent;
