import { useRoutes } from 'react-router-dom';
import Loadable from 'ui-component/Loadable';

// routes
import MainRoutes from './MainRoutes';
import { lazy } from 'react';
const AuthLogin3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/Login3')));
const AuthRegister3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/Register3')));

const AuthResetPassword = Loadable(lazy(() => import('views/pages/authentication/authentication3/ResetPassword')));
const AuthNewPassword = Loadable(lazy(() => import('views/pages/authentication/authentication3/NewPassword')));
const AuthCode = Loadable(lazy(() => import('views/pages/authentication/AuthCode')));
// ==============================|| ROUTING RENDER ||============================== //
export default function ThemeRoutes() {
  return useRoutes([
    MainRoutes,
    {
      path: '/',
      element: <AuthLogin3 />
    },
    {
      path: '/register',
      element: <AuthRegister3 />
    },
    {
      path:'/reset-password',
      element: <AuthResetPassword/>
    },
    {
      path:'/new-password/:id',
      element: <AuthNewPassword />
      },
    {
      path: '/authCode',
      element: <AuthCode />
    },
  
]);
}
