
export const validatePassword = (text: string): boolean => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+]).{8,}$/;
    return passwordRegex.test(text);
}