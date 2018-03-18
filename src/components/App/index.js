import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link, NavLink, Redirect, Switch} from "react-router-dom";
import Training from "../Training/index";
import TrainingsList from "../TrainingsList/";
import SelectCoach from "../SelectCoach/";
import styled from "styled-components";
import MenuContainer from "./MenuContainer";

const PrivateRoute = (props) => {
    if (localStorage.getItem("logged")) {
        return <Route {...props} />
    } else {
        return <Redirect to="/login"/>
    }
}

const Content = styled.div`
    padding-left: 75px;
    padding-top: 0px;
`;

class App extends Component {
    render() {
        return (
            <Router>
                <div className="App">
                    <MenuContainer />
                    <Content>
                        <Switch>
                            <Route path="/training/:id" component={Training} />
                            <Route path="/training/" component={TrainingsList}/>
                            {/*<Route path="/crossfit/:id" component={CrossFit}/>*/}
                            <Route path="/coach/" component={SelectCoach}/>
                            <Redirect from="/" to="/training/"></Redirect>
                            {/*<Route component={NoMatch}/>*/}
                        </Switch>
                    </Content>
                </div>
            </Router>
        );
    }
}

export default App;
