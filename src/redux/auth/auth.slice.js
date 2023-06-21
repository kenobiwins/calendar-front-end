import { createSlice } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import { initUserState } from './auth.intit-state';
import {
    loginUser,
    refreshUser,
    signUpUser,
    currentUser,
    updateUser,
    logoutUser,
    sendMailForVerify,
} from 'redux/operations';
// import { createEntityAdapter } from '@reduxjs/toolkit';

const handlePending = state => {
    state.isLoading = true;
};

const handleRejected = state => {
    state.isLoading = false;
};

const authSlice = createSlice({
    name: 'auth',
    initialState: initUserState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(signUpUser.pending, handlePending)
            .addCase(signUpUser.rejected, handleRejected)
            .addCase(signUpUser.fulfilled, (state, actions) => {
                state.user = actions.payload.user;
                state.token = actions.payload.user.token;
                state.isLoggedIn = true;
                state.isLoading = false;

            })
            /////////////////////////////

            .addCase(sendMailForVerify.pending, handlePending)
            .addCase(sendMailForVerify.rejected, handleRejected)
            .addCase(sendMailForVerify.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.user.error = null;
            })

            ////////////////////////////////////
            .addCase(loginUser.pending, handlePending)
            .addCase(loginUser.rejected, handleRejected)
            .addCase(loginUser.fulfilled, (state, actions) => {
                state.user = actions.payload.user;
                state.token = actions.payload.user.token;
                state.isLoggedIn = true;
                state.isLoading = false;

            })
            .addCase(refreshUser.pending, handlePending)
            .addCase(refreshUser.rejected, handleRejected)
            .addCase(refreshUser.fulfilled, (state, action) => {
                state.user = action.payload.user;
                state.isLoggedIn = true;
                state.isRefreshing = false;
                state.isLoading = false;
            })
            .addCase(updateUser.pending, handlePending)
            .addCase(updateUser.rejected, handleRejected)
            .addCase(updateUser.fulfilled, (state, { payload }) => {
                state.user = { ...state.user, ...payload.user };
                state.isLoading = false;
            })
            .addCase(currentUser.pending, handlePending)
            .addCase(currentUser.rejected, handleRejected)
            .addCase(currentUser.fulfilled, (state, { payload }) => {
                state.user = { ...state.user, ...payload.user };
                state.isLoading = false;
            })
            .addCase(logoutUser.pending, handlePending)
            .addCase(logoutUser.rejected, handleRejected)
            .addCase(logoutUser.fulfilled, state => {
                state.isLoggedIn = false;
                state.user = {
                    name: null,
                    email: null,
                    token: null,
                    verify: null,
                    id: '',
                    avatarURL: '',
                    birthDay: '',
                    phone: '',
                    messenger: '',
                };
                state.token = null;
                state.isLoading = false;
            });
    },
});

export const authReducer = authSlice.reducer;

const persistConfig = {
    key: 'userToken',
    storage,
    whitelist: ['token'],
};

export const authPersistReducer = persistReducer(persistConfig, authReducer);

// const authAdapter = createEntityAdapter();

// const authSlice = createSlice({
//     name: 'auth',
//     initialState: initUserState,
//     reducers: {},
//     extraReducers: builder => {
//         builder
//             .addCase(signUpUser.fulfilled, (state, action) => {
//                 authAdapter.addOne(state, action.payload);
//             })
//             .addCase(loginUser.fulfilled, (state, action) => {
//                 authAdapter.addOne(state, action.payload);
//             })
//             .addCase(refreshUser.fulfilled, (state, action) => {
//                 authAdapter.addOne(state, action.payload);
//             });
//     },
// });
