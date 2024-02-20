import { AxiosError } from 'axios';

export const getMutationErrorMessage = (error: any): string => {
    let errorMessage = '';
    if(error instanceof AxiosError) {
        if(error.code === "ERR_NETWORK") {
            errorMessage = 'Network connection error!';
        } else {
            errorMessage = error.response?.data.message;
        }
    } else {
        errorMessage = 'Something went wrong. Please try again later.';
    }
    return errorMessage;
}