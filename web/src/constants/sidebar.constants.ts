import { SidebarRoute } from "@/types/routes.types";
import { Gauge, Utensils, Settings, Users2 } from 'lucide-vue-next';

export const MERCHANT_ROUTES: SidebarRoute[] = [
    {
        label: 'Dashboard',
        icon: Gauge,
        link: '/merchant',
        name: ['merchant-dashboard']
    },
    {
        label: 'Restaurants',
        icon: Utensils,
        link: '/merchant/restaurants',
        name: [
            'merchant-restaurants', 
            'merchant-create-restaurant', 
            'merchant-restaurant'
        ]
    },
    {
        label: 'Settings',
        icon: Settings,
        link: '/merchant/settings',
        name: ['merchant-settings']
    },
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

