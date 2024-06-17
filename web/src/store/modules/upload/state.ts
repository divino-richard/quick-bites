export interface UploadState {
  uploadPending: boolean;
  uploadSuccess: boolean;
  error: string;
  image: any;
  deletePending: boolean;
  deleteSuccess: boolean;
  deleteError: string;
}

const uploadState = {
  uploadPending: false,
  uploadSuccess: false,
  error: '',
  image: null,
  deletePending: false,
  deleteSuccess: false,
  deleteError: ''
} as UploadState;

export default uploadState;
