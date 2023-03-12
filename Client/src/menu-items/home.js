// assets
import { IconDashboard, IconDeviceAnalytics } from '@tabler/icons';

import DashboardOutlinedIcon from '@material-ui/icons/DashboardOutlined';

// constant
const icons = {
    IconDashboard: IconDashboard,
    IconDeviceAnalytics,
    DashboardOutlinedIcon
};

//-----------------------|| DASHBOARD MENU ITEMS ||-----------------------//

export const dashboard1 = {
    id: 'home',
    title: 'Home',
    type: 'group',
    children: [
        {
            id: 'def1',
            title: 'Home',
            type: 'item',
            url: '/dashboard/default',
            icon: icons['DashboardOutlinedIcon'],
            breadcrumbs: false
        }
    ]
};
