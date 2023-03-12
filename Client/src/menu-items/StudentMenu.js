// assets
import { IconDashboard, IconDeviceAnalytics, IconUsers, IconEye, IconCirclePlus, IconEdit, IconUserPlus, IconKey } from '@tabler/icons';

// constant
const icons = {
    IconDashboard: IconDashboard,
    IconDeviceAnalytics,
    IconEye,
    IconCirclePlus,
    IconEdit,
    IconUsers,
    IconUserPlus,
    IconKey
};

//-----------------------|| Student Dashboard Items ||-----------------------//

export const StudentMenu = {
    id: 'StudentMenu',
    title: '',
    type: 'group',
    children: [
        {
            id: 'icons',
            title: 'Students',
            type: 'collapse',
            icon: icons['IconUsers'],
            children: [{
                id: 'AddStudent',
                title: 'Add Student',
                type: 'item',
                url: '/student/add_student',
                icon: icons['IconUserPlus'],
                breadcrumbs: false
            },
            {
                id: 'ViewStudent',
                title: 'View / Update Student',
                type: 'item',
                url: '/student/view_student',
                icon: icons['IconEye'],
                breadcrumbs: false
            },
            {
                id: 'UpdateStudent',
                title: 'Batch Update',
                type: 'item',
                url: '/student/update_student',
                icon: icons['IconEdit'],
                breadcrumbs: false
            },
            {
                id: 'StudentPasswords',
                title: 'Student Passwords',
                type: 'item',
                url: "/student/student_passwords",
                icon: icons['IconKey'],
                breadcrumbs: false
            }
            ]
        }

        // {
        //     id: 'StudentDetails',
        //     title: 'Student Details',
        //     type: 'item',
        //     url: '/icons/form_elements',
        //     icon: icons['IconUsers'],
        //     breadcrumbs: false
        // },

    ]
};
