export interface UserState {
  createPending: boolean;
  createSuccess: boolean;
  updatePending: boolean;
  updateSuccess: boolean;
  deletePending: boolean;
  deleteSuccess: boolean;
  error: string;
  items: any[],
  totalItems: number;
  loading: boolean;
}

const userState = { 
  createPending: false,
  createSuccess: false,
  updatePending: false,
  updateSuccess: false,
  deletePending: false,
  deleteSuccess: false,
  error: '',
  items: [],
  totalItems: 0,
  loading: false
} as UserState;

export default userState;
