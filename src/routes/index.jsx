import React  from 'react'
import {
    BrowserRouter,
    Redirect,
    Route,
    Switch,
} from "react-router-dom";
import Home from "../pages/Home"
import SideBar from "../layouts/MainLayout";
import TrackPage from "../pages/TrackPage";
import CreatePage from '../pages/Create'
import Login from '../pages/Login'
import Register from '../pages/Register'
const isAuthenticated = () => {
    // const token = localStorage.getItem('token');
    // const refreshToken = localStorage.getItem('refreshToken');
    // try {
    //     decode(token);
    //     decode(refreshToken);
    // } catch (err) {
    //     return false;
    // }

    return true;
};

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            (isAuthenticated() ? (
                <Component {...props} />
            ) : (
                <Redirect
                    to={{
                        pathname: '/login',
                    }}
                />
            ))}
    />
);

export default () => (
    <BrowserRouter>
        <SideBar />
        <Switch>
            <Route path="/" exact component={Home}/>
            <Route path="/login" exact component={Login}/>
            <Route path="/register" exact component={Register}/>
            <Route path="/tracks" exact component={TrackPage}/>
            <PrivateRoute path="/create-track" exact component={CreatePage}/>
        </Switch>
    </BrowserRouter>
);
