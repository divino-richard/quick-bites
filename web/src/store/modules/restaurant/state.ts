export interface RestaurantState {
  createPending: boolean;
  createSuccess: boolean;
  createError: string;
  items: any[];
  getItemsLoading: boolean;
  getItemsError: string;
  item: any;
  getItemLoading: boolean;
  getItemError: string;
}

const restaurantState = {
  createPending: false,
  createSuccess: false,
  createError: '',
  items: [],
  getItemsLoading: false,
  getItemsError: '',
  item: null,
  getItemLoading: false,
  getItemError: ''
} as RestaurantState;

export default restaurantState;
