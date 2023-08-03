// assets
import { IconDashboard, IconHistory, IconShield, IconRecharging, IconTag, IconSend, IconApiApp ,IconGiftCard,IconReceipt, IconPigMoney} from '@tabler/icons';

// constant
const icons = { IconDashboard, IconHistory, IconShield, IconRecharging, IconTag, IconSend, IconApiApp ,IconGiftCard,IconReceipt,IconPigMoney};

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
      id: 'transfert',
      title: 'Transferer Credit',
      type: 'item',
      url: '/pages/transfert',
      icon: icons.IconSend,
      breadcrumbs: false
    },
    {
      id: 'offre',
      title: 'Transferer Offres',
      type: 'item',
      url: '/pages/Offres',
      icon: icons.IconGiftCard,
      breadcrumbs: false
    },
    // {
    //   id: 'facture',
    //   title: 'Payer Facture',
    //   type: 'item',
    //   url: '/pages/facture',
    //   icon: icons.IconReceipt,
    //   breadcrumbs: false
    // },{
    //   id: 'bouquets',
    //   title: 'Payer Bouquets',
    //   type: 'item',
    //   url: '/pages/bouquet',
    //   icon: icons.IconDeviceTv,
    //   breadcrumbs: false
    // },
    {
      id: 'facture',
      title: 'Facture & T.V',
      type: 'collapse',
      // url: '/pages/facture',
      icon: icons.IconReceipt,
      children: [
        {
          id: 'electricite',
          title: 'Eau & Electricité',
          type: 'item',
          url: '/pages/facture/electricite',
        },
        {
          id: 'bouquet',
          title: 'Bouquets',
          type: 'item',
          url: '/pages/facture/bouquet',
        }
      ]
    },{
      id: 'bouquets',
      title: 'Mobile Money',
      type: 'item',
      url: '/pages/bouquet',
      icon: icons.IconPigMoney,
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
    },
    {
      id: 'authentication',
      title: 'Developpeur',
      type: 'collapse',
      icon: IconApiApp,

      children: [
        {
          id: 'api',
          title: 'Paramettre API',
          type: 'item',
          url: '/pages/developer/api',
        },
        {
          id: 'doc',
          title: 'Documentation',
          type: 'item',
          url: '/pages/developer/doc',
        }
      ]
    }
  ]
};

export default dashboard;
