import { ActionTree } from "vuex";
import { UploadState } from "../states/upload.state";
import { RootState } from "@/store";
import { AxiosError } from "axios";
import api from "@/utils/api";

const uploadActions: ActionTree<UploadState, RootState> = {
  async image({state, commit}, formData) {
    try {
      state.uploadPending = true;
      const response = await api.post('/api/uploads/image', formData);
      state.image = response.data;
      commit('uploadSuccess', true);
    } catch(error) {
      let message = '';
      if(error instanceof AxiosError) {
        message = error.response?.data.message;
      }
      commit('uploadError', message || 'Something went wrong');
    } finally {
      state.uploadPending = false;
    }
  },
  async deleteImage({state, commit}, filename) {
    try {
      state.deletePending = true;
      await api.delete(`/api/uploads/image?filename=${filename}`);
      commit('deleteSuccess', true);
    } catch(error) {
      let message = '';
      if(error instanceof AxiosError) {
        message = error.response?.data.message;
      }
      commit('deleteError', message || 'Something went wrong')
    } finally {
      state.deletePending =  false;
    }
  }
}

export default uploadActions;
