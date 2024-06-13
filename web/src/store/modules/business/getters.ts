import { GetterTree } from "vuex";
import { BusinessState } from "./state";
import { RootState } from "@/store";

const businessGetters: GetterTree<BusinessState, RootState> = {
  getCreatePending(state) {
    return state.createPending;
  }
} 

export default businessGetters;