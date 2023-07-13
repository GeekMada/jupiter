// assets
import { IconDashboard, IconHistory, IconShield, IconRecharging, IconTag, IconSend } from '@tabler/icons';

// constant
const icons = { IconDashboard, IconHistory, IconShield, IconRecharging, IconTag, IconSend };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
  id: 'dashboard',
  // title: 'Dashboard',
  type: 'group',
  children: [
    {
      id: 'default',
      title: 'Dashboard',
      type: 'item',
      url: '/pages/dashboard/default',
      icon: icons.IconDashboard,
      breadcrumbs: false
    },
    {
      id: 'recharge',
      title: 'Recharger Compte',
      type: 'item',
      url: '/pages/recharge',
      icon: icons.IconRecharging,
      breadcrumbs: false
    },
    {
      id: 'rechargercompte',
      title: 'Recharger Credit',
      type: 'item',
      url: '/pages/tarif',
      icon: icons.IconTag,
      breadcrumbs: false
    },
    {
      id: 'transfert',
      title: 'Transferer Credit',
      type: 'item',
      url: '/pages/transfert',
      icon: icons.IconSend,
      breadcrumbs: false
    },
    {
      id: 'histroque',
      title: 'Historique',
      type: 'item',
      url: '/pages/historique',
      icon: icons.IconHistory,
      breadcrumbs: false
    },
    {
      id: 'securité',
      title: 'Securité',
      type: 'item',
      url: '/pages/security',
      icon: icons.IconShield,
      breadcrumbs: false
    }
  ]
};

export default dashboard;
