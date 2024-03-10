import { useRouter } from "vue-router";
import { getSession } from "./session.utils";

export const checkRegistration = () => {
    const router = useRouter();
    const session = getSession();
    
    if(!session) return false;

    const { userType, registration } = session?.userData;

    if(registration !== 'completed') {
        switch (userType) {
            case 'merchant':
                router.push('/merchant/create-business')
                break;
        }
    }
}
