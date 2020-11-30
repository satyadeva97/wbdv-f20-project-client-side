import React from 'react';

class ProfileComponent extends React.Component{
    render() {
        return (
            <div className="container">
                <h1>Profile</h1>
                <div className="alert alert-success wbdv-message" role="alert">
                    Profile successfully saved
                </div>
                <form>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label"
                               htmlFor="username">Username</label>
                        <div className="col-sm-10">
                            <input className="form-control wbdv-field wbdv-username" id="username"
                                   placeholder="Alice" readOnly
                                   type="text"/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label" htmlFor="phone">Phone</label>
                        <div className="col-sm-10">
                            <input className="form-control wbdv-field wbdv-phone" id="phone"
                                   placeholder="(555) 123-4324" type="tel"/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label" htmlFor="email">Email</label>
                        <div className="col-sm-10">
                            <input className="form-control wbdv-field wbdv-email" id="email"
                                   placeholder="alice@wonderland.com"
                                   type="email"/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label" htmlFor="role">Role</label>
                        <div className="col-sm-10">
                            <select className="form-control wbdv-field wbdv-role" id="role">
                                <option value="Faculty">Job Seeker</option>
                                <option value="Student">Recruiter</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label" htmlFor="dob">Date of
                            Birth</label>
                        <div className="col-sm-10">
                            <input className="form-control wbdv-field wbdv-dob" id="dob"
                                   type="date"/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="col-sm-10 offset-sm-2">
                            <a className="btn btn-success btn-block wbdv-button wbdv-button wbdv-update"
                               href="#">
                                Update
                            </a>
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="col-sm-10 offset-sm-2">
                            <a className="btn btn-danger btn-block wbdv-button wbdv-logout"
                               href="/">
                                Logout
                            </a>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default ProfileComponent;
