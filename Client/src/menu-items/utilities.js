// assets
import { IconBrandFramer, IconTypography, IconPalette, IconShadow, IconWindmill, IconLayoutGridAdd } from '@tabler/icons';

// constant
const icons = {
    IconTypography: IconTypography,
    IconPalette: IconPalette,
    IconShadow: IconShadow,
    IconWindmill: IconWindmill,
    IconBrandFramer: IconBrandFramer,
    IconLayoutGridAdd: IconLayoutGridAdd
};

//-----------------------|| UTILITIES MENU ITEMS ||-----------------------//

export const utilities = {
    id: 'utilities',
    title: 'Utilities',
    type: 'group',
    children: [
        {
            id: 'keval',
            title: 'Keval',
            type: 'item',
            url: '/own/keval',
            icon: icons['IconTypography'],
            breadcrumbs: false
        },
        {
            id: 'home',
            title: 'Home',
            type: 'item',
            url: '/icons/form_elements',
            icon: icons['IconTypography'],
            breadcrumbs: false
        },
        {
            id: 'util-typography',
            title: 'Typography',
            type: 'item',
            url: '/utils/util-typography',
            icon: icons['IconTypography'],
            breadcrumbs: false
        },
        {
            id: 'util-color',
            title: 'Color',
            type: 'item',
            url: '/utils/util-color',
            icon: icons['IconPalette'],
            breadcrumbs: false
        },
        {
            id: 'util-shadow',
            title: 'Shadow',
            type: 'item',
            url: '/utils/util-shadow',
            icon: icons['IconShadow'],
            breadcrumbs: false
        },
        {
            id: 'icons',
            title: 'Icons',
            type: 'collapse',
            icon: icons['IconWindmill'],
            children: [
                {
                    id: 'tabler-icons',
                    title: 'Tabler Icons',
                    type: 'collapse',
                    url: '/icons/tabler-icons',
                    breadcrumbs: false,
                    children: [
                        {
                            id: 'keval',
                            title: 'Keval',
                            type: 'item',
                            url: '/own/keval',
                            icon: icons['IconTypography'],
                            breadcrumbs: false
                        }
                    ]
                },
                {
                    id: 'material-icons',
                    title: 'Material Icons',
                    type: 'item',
                    url: '/icons/material-icons',
                    breadcrumbs: false
                },
                {
                    id: 'form_elements',
                    title: 'Form Elements',
                    type: 'item',
                    url: '/icons/form_elements',
                    breadcrumbs: false
                },
                {
                    id: 'cards',
                    title: 'Cards',
                    type: 'item',
                    url: '/icons/cards',
                    breadcrumbs: false
                },
            ]
        }
    ]
};
