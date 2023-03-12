// assets
import { IconDashboard, IconDeviceAnalytics, IconSpeakerphone, IconLayoutGridAdd, IconCirclePlus, IconEye } from '@tabler/icons';

// constant
const icons = {
    IconDashboard: IconDashboard,
    IconDeviceAnalytics,
    IconEye,
    IconSpeakerphone,
    IconLayoutGridAdd,
    IconEye,
    IconCirclePlus,
};

//-----------------------|| ANNOUNCEMENT DASHBOARD MENU ITEMS ||-----------------------//

export const AnnouncementMenu = {
    id: 'AnnouncementMenu',
    title: '',
    type: 'group',
    children: [
        {
            id: 'icons',
            title: 'Announcement',
            type: 'collapse',
            icon: icons['IconSpeakerphone'],
            children: [{

                id: 'AddAnnouncement',
                title: 'Add Announcement',
                type: 'item',
                url: '/announcement/add_annoucement',
                icon: icons['IconCirclePlus'],
                breadcrumbs: false
            },
            {
                id: 'ViewAnnoucement',
                title: 'View Announcements',
                type: 'item',
                url: '/announcement/view_annoucement',
                icon: icons['IconEye'],
                breadcrumbs: false
            },
            // {
            //     id: 'AnnouncementDetails',
            //     title: 'All Announcements',
            //     type: 'item',
            //     url: '/announcement/index',
            //     icon: icons['IconSpeakerphone'],
            //     breadcrumbs: false
            // },
        ]
            
    }

    ]
};
