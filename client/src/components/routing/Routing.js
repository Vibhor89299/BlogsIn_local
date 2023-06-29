import React, { useEffect, useContext } from 'react'
import { Switch, Route, useHistory } from 'react-router-dom'
import Dashboard from '../../pages/Dashboard';
import Compose from '../../pages/Compose';
import NotFound from '../../pages/NotFound'
import SignInForm from '../SignInForm';
import SignUpForm from '../SignUpForm';
import { AuthContext } from '../../App';
import DisplayPost from '../DisplayPost'

const Router = () => {
    const history = useHistory();
    const authContext = useContext(AuthContext)
    useEffect(() => { 
        if (!authContext.userState.isAuthenticated) {
            history.push('/')
        }

    },[history, authContext.userState.isAuthenticated])
    
    return (
        <Switch>
            <Route path="/" exact component={Dashboard} />
            <Route path="/compose" component={Compose} />
            <Route path="/signin" component={SignInForm} />
            <Route path="/signup" component={SignUpForm} />
            <Route path="/posts/post-details/:postid" component={DisplayPost} />
            <Route component={NotFound} />
        </Switch>
    )
}

export default Router;