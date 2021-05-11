import { useState, useRef } from 'react';
import firebase from "../../firebase_config/firebaseConfig";
import classes from './OtpForm.module.css';
import { useDispatch } from "react-redux";
import { authAction } from "../../store/auth";
import { useHistory } from 'react-router';

let verifyNumber;
function OtpForm() {
    const [otpExist, setOtpExist] = useState(false);
    const mobNoRef = useRef();
    const otpRef = useRef();
    const dispatch = useDispatch();
    const history = useHistory();
    const getOtpHandler = async () => {
        if(mobNoRef.current.value.length !== 10){
          alert("Enter 10 digit mobile number!");
          return;
        }
        let recaptcha = new firebase.auth.RecaptchaVerifier("recaptcha-container");
        let number = "+91" + mobNoRef.current.value;
        debugger;
        try{
          verifyNumber = await firebase.auth().signInWithPhoneNumber(number, recaptcha);
        } catch (error){
          console.log(error);
          alert(error.message);
        }
        setOtpExist(true);
       }
       const confirmOtp = (event) => {
        event.preventDefault();
        let code = otpRef.current.value;
          if (code == null) {
            alert("Enter OTP!")
            return;
          }
          verifyNumber.confirm(code).then((res) => {
            console.log(res);
            if(res.user){
                const expirationTime = new Date(
                new Date().getTime() + 3600000
            );
            dispatch(authAction.login({token: res.user.refreshToken, expTime: expirationTime.toISOString()}));
            history.replace('/');
        }
          }).catch((e) => {
            console.log(e);
            alert(e.message);
          });
      }
    return (
        <form onSubmit = {confirmOtp}>
        {!otpExist && <div className={classes.control}>
          <label htmlFor='mobileNo'>Your Mobile Number</label>
          <input type='number' id='mobileNo' minLength = '10' maxLength = '10' ref = {mobNoRef} required/>
        </div>}
        {otpExist && <div className={classes.control}>
          <label htmlFor='otp'>Enter OTP</label>
          <input type='number' id='otp' ref = {otpRef} required/>
        </div>}
        {!otpExist && <div id="recaptcha-container"></div>}        
        <div className={classes.actions}>
          {!otpExist && <button type = 'button' onClick = {getOtpHandler}>Get OTP</button>}
          {otpExist && <button>Verify</button>}
        </div>
      </form>
    )
}

export default OtpForm
