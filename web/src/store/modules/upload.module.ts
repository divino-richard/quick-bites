import { RootState } from "@/store";
import { Module } from "vuex";
import uploadState, { UploadState } from "../states/upload.state";
import uploadActions from "../actions/upload.actions";
import uploadMutations from "../mutations/upload.mutations";

const uploadModule: Module<UploadState, RootState> = {
  namespaced: true,
  state: uploadState,
  actions: uploadActions,
  mutations: uploadMutations
}

export default uploadModule;
