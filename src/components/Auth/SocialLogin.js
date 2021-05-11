import React from 'react'
import { facebookProvider, googleProvider } from '../../firebase_config/authMethods';
import SocialMediaAuth from '../../service/SocialMediaAuth';
import { useDispatch } from "react-redux";
import { authAction } from "../../store/auth";
import { useHistory } from 'react-router';
import classes from './SocialLogin.module.css';

function SocialLogin() {
    const history = useHistory();
    const dispatch = useDispatch();
    const loginHandler = async provider => {
        const res = await SocialMediaAuth(provider);
        console.log(res);
        if(res.user){
            const expirationTime = new Date(
                new Date().getTime() + 3600000
            );
            dispatch(authAction.login({token: res.user.refreshToken, expTime: expirationTime.toISOString()}));
            history.replace('/');
        }
        
    }
    
    return (
        <div>
            <button type = 'button' className = {`${classes.loginBtn} ${classes.loginBtn_facebook}`} onClick = {() => loginHandler(facebookProvider)}>Facebook</button>
            <button type = 'button' className = {`${classes.loginBtn} ${classes.loginBtn_google}`} onClick = {() => loginHandler(googleProvider)}>Google</button>
        </div>
    )
}

export default SocialLogin;
