import { createSlice, configureStore } from "@reduxjs/toolkit";

const calculateRemainingTime = (expiryDate) => {
    const now = new Date().getTime();
    const expirytime = new Date(expiryDate).getTime();
  
    return expirytime - now;
};

let logoutTimer;

export const retrieveStoredToken = () => {
  const storedToken = localStorage.getItem("token");
  const storedExpirationDate = localStorage.getItem("expirationTime");

  const remainingTime = calculateRemainingTime(storedExpirationDate);

  if (remainingTime <= 3600) {
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");
    return null;
  }

  return {
    token: storedToken,
    duration: remainingTime,
  };
};

const tokenData = retrieveStoredToken();

let initialToken = null;
if (tokenData) {
  initialToken = tokenData.token;
}

const initialAuthState = {
    token: initialToken,
    isLoggedIn: !!initialToken
};
const authSlice = createSlice({
    name: 'auth',
    initialState: initialAuthState,
    reducers: {
        logout(state){
            state.isLoggedIn = false;
            state.token = null;
            localStorage.removeItem("token");
            localStorage.removeItem("expirationTime");
        
            if (logoutTimer) {
              clearTimeout(logoutTimer);
            }
        },login(state, actions){
            state.isLoggedIn = true;
            state.token = actions.payload.token;
            localStorage.setItem("token", actions.payload.token);
            localStorage.setItem("expirationTime", actions.payload.expTime);
            const remainingTime = calculateRemainingTime(actions.payload.expTime);
            logoutTimer = setTimeout(() => {
              authSlice.caseReducers.logout(state);
            }, remainingTime);
        }
    }
})

const store = configureStore({
    reducer: {auth: authSlice.reducer}
});

export const authAction = authSlice.actions;
export default store;