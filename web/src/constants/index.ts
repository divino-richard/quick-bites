import { SidebarRoute } from "@/types/routes.types";
import { Gauge, Briefcase, Settings, Split, Users2 } from 'lucide-vue-next';

export const MERCHANT_ROUTES: SidebarRoute[] = [
    {
        label: 'Dashboard',
        icon: Gauge,
        link: '/merchant',
        name: ['merchant-dashboard']
    },
    {
        label: 'Business',
        icon: Briefcase,
        link: '/merchant/business',
        name: ['merchant-business', 'merchant-business-info']
    },
    {
        label: 'Settings',
        icon: Settings,
        link: '/merchant/settings',
        name: ['merchant-settings']
    },
    {
        label: 'Branches',
        link: '/merchant/branches',
        icon: Split,
        name: ['merchant-business-branches'],
    }
]

export const ADMIN_ROUTES: SidebarRoute[] = [
    {
        label: 'Dashboard',
        icon: Gauge,
        link: '/admin',
        name: ['admin-dashboard']
    },
    {
        label: 'Users',
        icon: Users2,
        link: '/admin/users',
        name: ['admin-users']
    },
]

