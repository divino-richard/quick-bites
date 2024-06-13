export interface MenuState {
    items: any[];
    loadingItems: boolean;
    getItemsError: boolean;
}

export const menuState = {
    items: [],
    loadingItems: false,
    getItemsError: false
} as MenuState