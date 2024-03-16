import { FunctionalComponent } from 'vue';

export interface SidebarRoute {
    label: string;
    icon: FunctionalComponent;
    link: string;
    name: string;
}
