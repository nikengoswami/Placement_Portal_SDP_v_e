import React, { lazy, useEffect } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import Loadable from '../ui-component/Loadable';

// project imports
import MinimalLayout from './../layout/MinimalLayout';

// login option 3 routing
const AuthLogin3 = Loadable(lazy(() => import('../views/pages/authentication/authentication3/Login3')));
const AuthRegister3 = Loadable(lazy(() => import('../views/pages/authentication/authentication3/Register3')));
const StudentLogin = Loadable(lazy(() => import('../views/Student_Views/Login/StudentLogin')));
const AdminLogin = Loadable(lazy(() => import('../views/Login/AdminLogin')));
const FirstTimeLogin = Loadable(lazy(() => import('../views/Student_Views/Login/FirstTimeLogin')));
const ForgotPassword = Loadable(lazy(() => import('../views/Student_Views/Login/ForgotPassword')));

//-----------------------|| AUTHENTICATION ROUTING ||-----------------------//

const AuthenticationRoutes = () => {
    const location = useLocation();

    return (
        <Route path={['/admin/login', '/_student/login', '/pages/login/login3', '/pages/register/register3', "/_student/firstTimeLogin", "/_student/forgotPassword"]}>
            <MinimalLayout>
                <Switch location={location} key={location.pathname}>
                    <Route path="/admin/login" component={AdminLogin} />
                    <Route path="/_student/login" component={StudentLogin} />
                    <Route path="/_student/forgotPassword" component={ForgotPassword} />
                    <Route path="/_student/firstTimeLogin" component={FirstTimeLogin} />
                    <Route path="/pages/login/login3" component={AuthLogin3} />
                    <Route path="/pages/register/register3" component={AuthRegister3} />
                </Switch>
            </MinimalLayout>
        </Route>
    );
};

export default AuthenticationRoutes;
