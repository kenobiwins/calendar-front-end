import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from 'pages/MainLayout/MainLayout';
import LoginPage from 'pages/LoginPage/LoginPage';
import RegisterPage from 'pages/RegisterPage';
import CalendarPage from 'pages/CalendarPage/CalendarPage';
import CalendarDayPage from 'pages/CalendarDayPage/CalendarDayPage';
import CalendarMonthPage from 'pages/CalendarMonthPage/CalendarMonthPage';
import AccountPage from 'pages/AccountPage/AccountPage';

import PublicRoute from './authRoutes/PublicRoute';
import PrivateRoute from './authRoutes/PrivateRoute';
import { ROUTING } from 'core/utils/constantsRouting';
import { Suspense } from 'react';
import ChangePassPage from 'pages/ChangePassPage/ChangeUserPassPage';
import { StartPage } from 'pages/StartPage/StartPage';

import VerifyPage from 'pages/VerifyPage/VerifyPage';

import UserForgotPassPage from 'pages/UserForgetPassPage/UserForgetPassPage';

import ResetPassPage from 'pages/ResetPassPage/ResetPassPage';
import ResendVerifyEmailPage from 'pages/ResendVerifyEmailPage/ResendVerifyEmailPage';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const App = () => {
    return (
        <Suspense>
            <Routes>
                <Route path="" element={<PublicRoute />}>
                    <Route index element={<StartPage />} />
                    <Route path={ROUTING.LOGIN} element={<LoginPage />} />
                    <Route path={ROUTING.REGISTER} element={<RegisterPage />} />

                    <Route path={ROUTING.VERIFY} element={<VerifyPage />} />

                    <Route
                        path={ROUTING.RESEND_VERIFY}
                        element={<ResendVerifyEmailPage />}
                    />

                    <Route
                        path={ROUTING.RESTORE_PASS}
                        element={<UserForgotPassPage />}
                    />
                    <Route
                        path={ROUTING.RESET_PASS}
                        element={<ResetPassPage />}
                    />
                </Route>
                <Route path="" element={<PrivateRoute />}>
                    <Route path="/" element={<MainLayout />}>
                        <Route
                            index
                            element={<Navigate to={ROUTING.CALENDAR} />}
                        />
                        <Route
                            path={ROUTING.CALENDAR}
                            element={<CalendarPage />}
                        >
                            <Route
                                index
                                element={
                                    <Navigate to={ROUTING.CURRENT_MONTH} />
                                }
                            />
                            <Route
                                path={ROUTING.CURRENT_MONTH}
                                element={<CalendarMonthPage />}
                            />
                            <Route
                                path={ROUTING.CURRENT_DAY}
                                element={<CalendarDayPage />}
                            />
                        </Route>

                        <Route
                            path={ROUTING.ACCOUNT}
                            element={<AccountPage />}
                        />
                        <Route
                            path={ROUTING.CHANGE_PASS}
                            element={<ChangePassPage />}
                        />
                    </Route>
                </Route>
            </Routes>
            <ToastContainer />
        </Suspense>
    );
};
