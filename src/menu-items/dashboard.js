// assets
import { IconDashboard, IconHistory, IconShield, IconRecharging, IconTag } from '@tabler/icons';

// constant
const icons = { IconDashboard, IconHistory, IconShield, IconRecharging, IconTag };

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
      url: '/dashboard/default',
      icon: icons.IconDashboard,
      breadcrumbs: false
    },
    {
      id: 'recharge',
      title: 'Recharge',
      type: 'item',
      url: '/recharge',
      icon: icons.IconRecharging,
      breadcrumbs: false
    },
    {
      id: 'historique',
      title: 'Historique',
      type: 'item',
      url: '/historique',
      icon: icons.IconHistory,
      breadcrumbs: false
    },
    {
      id: 'tarif',
      title: 'Tarif',
      type: 'item',
      url: '/tarif',
      icon: icons.IconTag,
      breadcrumbs: false
    },
    {
      id: 'securité',
      title: 'Securité',
      type: 'item',
      url: '/security',
      icon: icons.IconShield,
      breadcrumbs: false
    }
  ]
};

export default dashboard;
