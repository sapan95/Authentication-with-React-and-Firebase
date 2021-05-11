import { useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { retrieveStoredToken } from "./store/auth";
import { useDispatch, useSelector } from "react-redux";
import { authAction } from "./store/auth";
import Layout from './components/Layout/Layout';
import ProductPage from './pages/Product';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';

function App() {
  const dispatch = useDispatch();   
  const tokenData = retrieveStoredToken();
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  
  useEffect(() => {
    if (tokenData) {
      console.log(tokenData.duration);
      setTimeout(() => {
        dispatch(authAction.logout());
      },tokenData.duration);
    }
  }, [tokenData, dispatch]);

  return (
    <Layout>
      <Switch>
        <Route path='/' exact>
          <HomePage />
        </Route>
        {!isLoggedIn && (<Route path='/auth'>
          <AuthPage />
        </Route>)}
        <Route path='/product'>
          {isLoggedIn && <ProductPage />}
          {!isLoggedIn && <Redirect to = '/auth' />}
        </Route>
        <Route path='*'>
          <Redirect to = '/' />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
