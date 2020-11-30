import React from 'react';
import HeaderComponent from "../components/HeaderComponent";
import {getAllJobs} from "../services/JobService";
import JobComponent from "../components/jobComponent";
import { trackPromise } from 'react-promise-tracker';

class HomeContainer extends React.Component{

    componentDidMount() {
        if (this.props.text) {
            trackPromise(
            this.getJobs(this.props.text))
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.text !== this.props.text) {
            trackPromise(
            this.getJobs(this.props.text))
        }
    }

    state = {
        jobs: [],
    }


    getJobs = async (input) => {
        const jobs = await getAllJobs(input)
        console.log(jobs);
        this.setState({jobs: jobs});
    }

    //
    // getJobs = (input) => {
    //     const jobs = getAllJobs(input).then(this.setState({jobs: jobs});)
    // }

    render() {
        return(
            <div className="container">
                <HeaderComponent
                    // onSearch = {(input) => this.getJobs(input)}
                    onSearch = {(input) => this.props.history.push("/search/"+input)}
                    onSearchByLoc = {(loc) => this.props.history.push("/search/"+loc)}
                />
                <div className="text-center">
                    {this.props.text && `showing results for ${this.props.text}`}
                </div>
                <JobComponent jobs={this.state.jobs}/>

            </div>
        )
    }
}

export default HomeContainer;
