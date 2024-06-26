export interface MenuState {
    createPending: boolean;
    createSuccess: boolean;
    createError: string;
    items: any[];
    loadingItems: boolean;
    getItemsError: string;
    deletePending: boolean;
    deleteSuccess: boolean;
    deleteError: string;
    updatePending: boolean;
    updateSuccess: boolean;
    updateError: string;
}

export const menuState = {
    createPending: false,
    createSuccess: false,
    createError: '',
    items: [],
    loadingItems: false,
    getItemsError: '',
    deletePending: false,
    deleteSuccess: false,
    deleteError: '',
    updatePending: false,
    updateSuccess: false,
    updateError: '',
} as MenuState