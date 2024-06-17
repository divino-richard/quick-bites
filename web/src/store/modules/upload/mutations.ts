import { MutationTree } from "vuex";
import { UploadState } from "./state";

const uploadMutations: MutationTree<UploadState> = {
  uploadSuccess(state, success: boolean) {
    state.success = success;
    state.error = '';
  },
  uploadError(state, error: string) {
    state.error = error;
  },
  deleteError(state, error: string) {
    state.error =  error;
  },
  deleteSuccess(state, success: boolean) {
    state.deleteSuccess = success;
  }
}

export default uploadMutations;
