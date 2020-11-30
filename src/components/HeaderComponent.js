import React from 'react';
import "./HeaderComponent.scss"
import {Link} from "react-router-dom";
import logo from "../assets/job-search.png"

class HeaderComponent extends React.Component {

    state = {
        search: "",
        searchLoc: ""
    }

    search = () => {
        this.props.onSearch(this.state.search)
        this.setState({search:""})
    }

    render() {
        return (
//             <nav class="navbar navbar-expand-lg navbar-light bg-light">
//   <a class="navbar-brand" href="#">Navbar</a>
//   <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
//     <span class="navbar-toggler-icon"></span>
//   </button>

//   <div class="collapse navbar-collapse" id="navbarSupportedContent">
//     <ul class="navbar-nav mr-auto">
//       <li class="nav-item active">
//         <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
//       </li>
//       <li class="nav-item">
//         <a class="nav-link" href="#">Link</a>
//       </li>
//       <li class="nav-item dropdown">
//         <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
//           Dropdown
//         </a>
//         <div class="dropdown-menu" aria-labelledby="navbarDropdown">
//           <a class="dropdown-item" href="#">Action</a>
//           <a class="dropdown-item" href="#">Another action</a>
//           <div class="dropdown-divider"></div>
//           <a class="dropdown-item" href="#">Something else here</a>
//         </div>
//       </li>
//       <li class="nav-item">
//         <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
//       </li>
//     </ul>
//     <form class="form-inline my-2 my-lg-0">
//       <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
//       <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
//     </form>
//   </div>
// </nav>
            <div className="container-fluid Header">
                <div className="header-text">
                    <h3>Search for your next job here</h3>
                </div>
                <div className="row HeaderContainer">
                    <div className="col-sm-1">
                        <img src={logo} className="logo" alt="Logo"/>
                    </div>
                    <div className="col-sm-2">
                        <h2>Job Panda</h2>
                    </div>
                    <div className="col-sm-3">
                        <input id="search" type="text" className="search-bar"
                               placeholder="search by key word" value={this.state.search}
                               onChange={(e) => this.setState(
                                   {search: e.target.value}
                               )}/>
                               {/*<Link to={`/search/${this.state.search}`}>*/}
                               {/*    <button className="searchbtn"*/}
                               {/*            onClick={this.search}>search*/}
                               {/*    </button>*/}
                               {/*</Link>*/}
                        <button className="searchbtn"
                                onClick={this.search}>search
                        </button>
                    </div>
                    <div className="col-sm-3">
                        <input id="search" type="text" className="search-bar"
                               placeholder="search by location" value={this.state.searchLoc}
                               onChange={(e) => this.setState(
                                   {searchLoc: e.target.value}
                               )}/>
                        <button className="searchbtn" onClick={() => this.props.onSearchByLoc(
                            this.state.searchLoc)}>search
                        </button>
                    </div>
                    <div className="col-sm-1">
                        <a href="">About</a>
                    </div>
                    <div className="col-sm-1">
                        <Link to="/signIn">
                            <button type="submit sign" className="signupbtn">login</button>
                        </Link>
                        {/*<button type="submit sign" className="signupbtn" onClick={}>login</button>*/}
                    </div>
                    <div className="col-sm-1">
                        <Link to="/signUp">
                            <button type="submit" className="signupbtn">register</button>
                        </Link>
                    </div>

                </div>

            </div>
        )
    }
}

export default HeaderComponent;



