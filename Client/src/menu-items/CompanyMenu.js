// assets
import { IconDashboard, IconDeviceAnalytics, IconBuildingCottage, IconCirclePlus, IconBuildingArch } from '@tabler/icons';

// constant
const icons = {
    IconDashboard: IconDashboard,
    IconDeviceAnalytics,
    IconBuildingCottage,
    IconCirclePlus,
    IconBuildingArch
};

//-----------------------|| COMPANY DASHBOARD MENU ITEMS ||-----------------------//

export const CompanyMenu = {
    id: 'CompanyMenu',
    title: '',
    type: 'group',
    children: [
        {
            id: 'Company Menu',
            title: 'Company',
            type: 'collapse',
            icon: icons['IconBuildingArch'],
            children: [
                {
                    id: 'CompanyAdd',
                    title: 'Add Company',
                    type: 'item',
                    url: '/company/add_company',
                    icon: icons['IconCirclePlus'],
                    breadcrumbs: false
                },
                {
                    id: 'ViewCompany',
                    title: 'View Company',
                    type: 'item',
                    url: '/company/view_company',
                    icon: icons['IconBuildingCottage'],
                    breadcrumbs: false
                }
        ]
        
        }
    ]
};
