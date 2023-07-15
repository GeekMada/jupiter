import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
// import Login from 'views/pages/authentication/authentication3/Login3';
import Recharge from 'views/Recharge/Recharge';
import Historique from 'views/Historique/Historique';
import Tarification from 'views/Tarification/Tarification';
import Securité from 'views/Securité/Securité';
import UserInfoScreen from 'views/Profil/Profil';
import Transfert from 'views/Transfert/Transfert';
import Documenation from 'views/api/Documenation';
import ParamettreApi from 'views/api/ParamettreApi';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/pages',
  element: <MainLayout />,
  children: [
    {
      path: '/pages',
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
      path: '/pages/Recharge',
      element: <Recharge />
    },
    {
      path: '/pages/Transfert',
      element: <Transfert />
    },
    {
      path: '/pages/Historique',
      element: <Historique />
    },
    {
      path: '/pages/Tarif',
      element: <Tarification />
    },
    {
      path: '/pages/Security',
      element: <Securité />
    },
    {
      path: '/pages/Profil',
      element: <UserInfoScreen />
    },
    {
      path: '/pages/developer/api',
      element: <Documenation />
    },
    {
      path: '/pages/developer/doc',
      element: <ParamettreApi />
    }
  ]
};

export default MainRoutes;
