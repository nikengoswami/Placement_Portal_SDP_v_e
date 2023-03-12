// assets
import { IconDashboard, IconDeviceAnalytics, IconSpeakerphone, IconLayoutGridAdd, IconCirclePlus, IconEye, IconArtboard, IconFileUpload } from '@tabler/icons';

// constant
const icons = {
    IconDashboard: IconDashboard,
    IconDeviceAnalytics,
    IconEye,
    IconSpeakerphone,
    IconLayoutGridAdd,
    IconEye,
    IconCirclePlus,
    IconArtboard, 
    IconFileUpload
};

export const InternshipMenu = {
    id: 'InternshipMenu',
    title: '',
    type: 'group',
    children: [
        {
            id: 'icons',
            title: 'Internship',
            type: 'collapse',
            icon: icons['IconArtboard'],
            children: [{
                id: 'AddInternship',
                title: 'View / Add Internship',
                type: 'item',
                url: '/internship/add_internship',
                icon: icons['IconCirclePlus'],
                breadcrumbs: false
            },
            {
                id: 'AddInternshipViaCSV',
                title: 'Add Internship Via CSV',
                type: 'item',
                url: '/internship/add_internship_via_csv',
                icon: icons['IconFileUpload'],
                breadcrumbs: false
            }
        ]
        }
    ]
};