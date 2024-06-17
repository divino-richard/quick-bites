import { RootState } from "@/store";
import { Module } from "vuex";
import uploadState, { UploadState } from "./state";
import uploadActions from "./actions";
import uploadMutations from "./mutations";

const uploadModule: Module<UploadState, RootState> = {
  namespaced: true,
  state: uploadState,
  actions: uploadActions,
  mutations: uploadMutations
}

export default uploadModule;
