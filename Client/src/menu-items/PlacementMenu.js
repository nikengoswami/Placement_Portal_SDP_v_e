// assets
import { IconDashboard, IconDeviceAnalytics, IconSpeakerphone, IconLayoutGridAdd, IconCirclePlus, IconEye, IconMan, IconUserPlus, IconBriefcase, IconFileUpload } from '@tabler/icons';

// constant
const icons = {
    IconDashboard: IconDashboard,
    IconDeviceAnalytics,
    IconEye,
    IconSpeakerphone,
    IconLayoutGridAdd,
    IconEye,
    IconCirclePlus,
    IconMan,
    IconUserPlus,
    IconBriefcase,
    IconFileUpload
};

export const PlacementMenu = {
    id: 'PlacementMenu',
    title: '',
    type: 'group',
    children: [
        {
            id: 'icons',
            title: 'Placement',
            type: 'collapse',
            icon: icons['IconBriefcase'],
            children: [{
                id: 'AddPlacement',
                title: 'View / Add Placement',
                type: 'item',
                url: '/placement/add_placement',
                icon: icons['IconCirclePlus'],
                breadcrumbs: false
            },
            {
                id:'AddPlacementViaCSV',
                title: 'Add Placement Via CSV',
                type: 'item',
                url: '/placement/add_placement_via_csv',
                icon: icons['IconFileUpload'],
                breadcrumbs: false
            }
            ]
        }
    ]
};