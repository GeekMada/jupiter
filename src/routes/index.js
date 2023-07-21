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
const Errors404 = Loadable(lazy(() => import('views/errors/404')));
const Errors500 = Loadable(lazy(() => import('views/errors/500')));
const Errors550 = Loadable(lazy(() => import('views/errors/550')));
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
      path: '/reset-password',
      element: <AuthResetPassword />
    },
    {
      path: '/new-password/:id',
      element: <AuthNewPassword />
    },
    {
      path: '/authCode',
      element: <AuthCode />
    },
    {
      path: '*',
      element: <Errors404 />
    },
    {
      path: '/error/500',
      element: <Errors500 />
    },
    {
      path: '/error/550',
      element: <Errors550 />
    }
]);
}
