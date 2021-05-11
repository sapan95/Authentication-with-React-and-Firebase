import classes from './AuthForm.module.css';
import OtpForm from './OtpForm';
import SocialLogin from './SocialLogin';
const AuthForm = () => {

  return (
    <section className={classes.auth}>
      <h1>Login</h1>
      <OtpForm/>
      <SocialLogin className={classes.actions}/>
    </section>
  );
};

export default AuthForm;
