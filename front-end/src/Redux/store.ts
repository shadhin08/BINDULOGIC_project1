import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { userLoginApi } from './services/login.redux-services';
import { rentPostApi } from './services/rent-post.redux-services';
import { userSignupApi } from './services/signup.redux-services';
import { findUserByUsernameApi } from './services/user.redux-services';

export const store = configureStore({
  reducer: {
    [rentPostApi.reducerPath]: rentPostApi.reducer,
    [findUserByUsernameApi.reducerPath]: findUserByUsernameApi.reducer,
    [userLoginApi.reducerPath]: userLoginApi.reducer,
    [userSignupApi.reducerPath]: userSignupApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      rentPostApi.middleware,
      findUserByUsernameApi.middleware,
      userLoginApi.middleware,
      userSignupApi.middleware,
    ),
});

setupListeners(store.dispatch);
