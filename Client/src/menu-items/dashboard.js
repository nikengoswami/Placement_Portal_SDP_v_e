// assets
import { IconDashboard, IconDeviceAnalytics } from '@tabler/icons';


import DashboardOutlinedIcon from '@material-ui/icons/DashboardOutlined';


// constant
const icons = {
    IconDashboard: IconDashboard,
    IconDeviceAnalytics,
    // DashboardOutlinedIcon
};

//-----------------------|| DASHBOARD MENU ITEMS ||-----------------------//

export const dashboard = {
    id: 'dashboard',
    title: 'Dashboard',
    type: 'group',
    children: [
        {
            id: 'default',
            title: 'Dashboard',
            type: 'item',
            url: '/dashboard/default',
            // icon: icons['DashboardOutlinedIcon'],
            breadcrumbs: false
        }
    ]
};
