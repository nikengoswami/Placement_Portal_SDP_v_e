// assets
import { IconDashboard, IconDeviceAnalytics, IconBuildingCottage, IconCirclePlus, IconBuildingArch, IconFileReport, IconFiles, IconFileInfo, IconFileDownload } from '@tabler/icons';

// constant
const icons = {
    IconDashboard: IconDashboard,
    IconDeviceAnalytics,
    IconBuildingCottage,
    IconCirclePlus,
    IconBuildingArch,
    IconFileReport,
    IconFiles,
    IconFileInfo,
    IconFileDownload
};

//-----------------------|| COMPANY DASHBOARD MENU ITEMS ||-----------------------//

export const ReportMenu = {
    id: 'ReportMenu',
    title: '',
    type: 'group',
    children: [
        {
            id: 'Report Menu',
            title: 'Reports',
            type: 'collapse',
            icon: icons['IconFiles'],
            children: [
                {
                    id: 'GetPlacement',
                    title: 'Get Placement Report',
                    type: 'item',
                    url: '/reports/get_placement_report',
                    icon: icons['IconFileDownload'],
                    breadcrumbs: false
                },
                {
                    id: 'MultiplePlacement',
                    title: 'Multiple Placement',
                    type: 'item',
                    url: '/reports/multiple_placement_report',
                    icon: icons['IconFileDownload'],
                    breadcrumbs: false
                },
                {
                    id: 'GetReportByCompany',
                    title: 'Placed Student by Company',
                    type: 'item',
                    url: '/reports/report_company',
                    icon: icons['IconFileDownload'],
                    breadcrumbs: false
                },
                {
                    id: 'UnplacedStudents',
                    title: 'Unplaced Students',
                    type: 'item',
                    url: '/reports/unplaced_students_report',
                    icon: icons['IconFileDownload'],
                    breadcrumbs: false
                },
                {
                    id: 'UnplacedInternship',
                    title: 'Unplaced Internship',
                    type: 'item',
                    url: '/reports/unplaced_internship_report',
                    icon: icons['IconFileDownload'],
                    breadcrumbs: false
                },
                {
                    id: 'InterestedInHigherStudies',
                    title: 'Interested In Higher Studies',
                    type: 'item',
                    url: '/reports/interested_in_higher_studies_report',
                    icon: icons['IconFileDownload'],
                    breadcrumbs: false
                }
                // {
                //     id: 'ViewCompany',
                //     title: 'View Company',
                //     type: 'item',
                //     url: '/company/view_company',
                //     icon: icons['IconBuildingCottage'],
                //     breadcrumbs: false
                // }
        ]
        
        }
    ]
};
