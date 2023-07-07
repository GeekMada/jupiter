import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
// import Login from 'views/pages/authentication/authentication3/Login3';
import Recharge from 'views/Recharge/Recharge';
import Historique from 'views/Historique/Historique';
import Tarif from 'views/Tarif/Tarif';
import Securité from 'views/Securité/Securité';
import UserInfoScreen from 'views/Profil/Profil';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <DashboardDefault />
        }
      ]
    },
    {
      path: '/Recharge',
      element: <Recharge />
    },
    {
      path: '/Historique',
      element: <Historique />
    },
    {
      path: '/Tarif',
      element: <Tarif />
    },
    {
      path: '/Security',
      element: <Securité />
    },
    {
      path: '/Profil',
      element: <UserInfoScreen />
    }
  ]
};

export default MainRoutes;
