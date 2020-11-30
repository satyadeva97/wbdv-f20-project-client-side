import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {usePromiseTracker} from "react-promise-tracker";
import Loader from 'react-loader-spinner';

const LoadingIndicator = props => {
    const {promiseInProgress} = usePromiseTracker();
    return (
        promiseInProgress &&
        <div style={{
            width: "100%",
            height: "100",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        }}>
            <Loader type="ThreeDots" color="blue" height="100" width="100"/>
        </div>
    );
}

ReactDOM.render(
    <React.StrictMode>
        <App/>
        <LoadingIndicator/>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
