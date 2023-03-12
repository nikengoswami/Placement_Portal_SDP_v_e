// assets
import { IconDashboard, IconDeviceAnalytics, IconSpeakerphone, IconLayoutGridAdd, IconUser, IconCirclePlus, IconEye, IconMan, IconBrandGravatar, IconTool } from '@tabler/icons';

// constant
const icons = {
    IconDashboard: IconDashboard,
    IconDeviceAnalytics,
    IconTool,
    IconEye,
    IconSpeakerphone,
    IconLayoutGridAdd,
    IconCirclePlus, IconMan, IconBrandGravatar, IconUser

};

//-----------------------|| ANNOUNCEMENT DASHBOARD MENU ITEMS ||-----------------------//

export const AboutMenu = {
    id: 'Developers',
    title: '',
    type: 'group',
    children: [
        {
            id: 'Developers',
            title: 'About Us',
            type: 'item',
            url: '/_student/about/',
            icon: icons['IconTool'],
            breadcrumbs: false
        },

    ]
};
