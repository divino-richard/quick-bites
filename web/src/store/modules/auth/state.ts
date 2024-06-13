import { UserSession } from "@/types/user.types";
import { getSession } from "@/utils/session.utils";

export interface AuthState {
  registerPending: boolean;
  registerSuccess: boolean;
  registerError: string;
  loginPending: boolean;
  loginSuccess: boolean;
  loginError: string;
  session: UserSession | null;
}

const authState = {
  registerPending: false,
  registerSuccess: false,
  registerError: '',
  loginPending: false,
  loginSuccess: false,
  loginError: '',
  session: getSession()
} as AuthState;

export default authState;
