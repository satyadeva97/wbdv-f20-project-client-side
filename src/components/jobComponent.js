import React from 'react';
import "./JobComponent.scss"
import JobsCardComponent from "./JobsCardComponent";
class JobComponent extends React.Component{
    render() {
        return(
            <div>
                {/*<div>*/}
                {/*    {this.props.jobs.map(*/}
                {/*        (job) => {*/}
                {/*            return(*/}
                {/*                <JobsCardComponent job = {job}/>*/}
                {/*            )*/}
                {/*        }*/}
                {/*    )}*/}
                {/*</div>*/}

                {(this.props.jobs.length === 0 && <h5>no results found</h5>)}

                {(this.props.jobs != null && <ul className="flex-container wrap">
                        {this.props.jobs.map(
                            (job) => {
                                return(
                                    <JobsCardComponent job = {job}/>
                                )
                            }
                        )}
                </ul>)}


        </div>

        )
    }
}

export default JobComponent;
