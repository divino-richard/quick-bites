
export interface BusinessState {
  createPending: boolean;
  createError: string;
  createSuccess: boolean;
  item: any | null;
  loadingItem: boolean;
  getItemsError: string;
  items: any[];
  loadingItems: boolean;
  getItemError: string;
}

export const businessState = {
  createError: '',
  createPending: false,
  createSuccess: false,
  item: null,
  loadingItem: false,
  getItemsError: '',
  items: [],
  loadingItems: false,
  getItemError: '',
} as BusinessState;
