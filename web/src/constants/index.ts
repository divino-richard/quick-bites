import { SidebarRoute } from "@/types/routes.types";
import { Gauge, Briefcase, Settings } from 'lucide-vue-next';

export const MERCHANT_ROUTES: SidebarRoute[] = [
    {
        label: 'Dashboard',
        icon: Gauge,
        link: '/merchant',
        name: 'merchant-dashboard'
    },
    {
        label: 'Business',
        icon: Briefcase,
        link: '/merchant/business',
        name: 'merchant-business'
    },
    {
        label: 'Settings',
        icon: Settings,
        link: '/merchant/settings',
        name: 'merchant-settings'
    }
]


