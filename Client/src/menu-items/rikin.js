// assets
import { IconDashboard, IconDeviceAnalytics } from '@tabler/icons';

// constant
const icons = {
    IconDashboard: IconDashboard,
    IconDeviceAnalytics
};

//-----------------------|| DASHBOARD MENU ITEMS ||-----------------------//

export const dashboard2 = {
    id: 'home',
    title: 'Rikin',
    type: 'group',
    children: [
        {
            id: 'def1',
            title: 'Rikin',
            type: 'item',
            url: '/dashboard/default',
            icon: icons['IconDashboard'],
            breadcrumbs: false
        },
        {
            id: 'def11',
            title: 'Jenil',
            type: 'item',
            url: '/dashboard/default',
            icon: icons['IconDeviceAnalytics'],
            breadcrumbs: false
        }
    ]
};
