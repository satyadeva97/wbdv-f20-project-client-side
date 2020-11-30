import React from 'react';
import "./JobComponent.scss"
class JobsCardComponent extends React.Component {
    render() {
        return (
            <a href={this.props.job.url}>
                <li className="flex-item">
                    <div className="flex-col-container">
                        <div className="company-logo">
                            <img src={this.props.job.company_logo} alt="Card image cap"/>
                        </div>
                        <div className="job-designation">
                            {this.props.job.title}
                        </div>
                        <div className="company-name">
                            {this.props.job.company}
                        </div>
                    </div>
                </li>
            </a>
        )
    }
}
export default JobsCardComponent;
