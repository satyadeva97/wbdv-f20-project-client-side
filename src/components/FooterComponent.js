import React from 'react';
import "./footerComponent.scss"

class FooterComponent extends React.Component{
    render() {
        return (
            <div className="container">
            <footer className="page-footer font-small blue">
                <div className="row">
                <div >
                    <a href="/privacy">Privacy Policy</a>
                </div>
                <div>
                    About
                </div>
                </div>
            </footer>
            </div>


        )
    }
}

export default FooterComponent;
