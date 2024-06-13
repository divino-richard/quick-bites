type ItemsType = {
  data: any[],
  totalCount: number
}

export interface UserState {
  createPending: boolean;
  createSuccess: boolean;
  createError: string;
  items: ItemsType | null,
  getItemsLoading: boolean;
  getItemsError: string;
}

const userState = { 
  createPending: false,
  createSuccess: false,
  createError: '',
  items: null,
  getItemsLoading: false,
  getItemsError: ''
} as UserState;

export default userState;
