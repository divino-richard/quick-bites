import SelectUserType from "@/components/registration/SelectUserType";
import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from "expo-router";
import { UserType } from "@/types/user.types";
import UserBasicInfo from "@/components/registration/UserBasicInfo";

export default function Register () {
    const router = useRouter();
    const [registrationStep, setRegistrationStep] = useState<number>(1);
    const [registrationType, setRegistraionType] = useState<UserType>('customer');

    const handleRegistrationType = (type: UserType) => {
        setRegistraionType(type);
        setRegistrationStep(2);
    }

    return (
        <ScrollView className="bg-blue-50 px-5 pt-14">
            {registrationStep === 1 && (
                <>
                    <SelectUserType onTypeSelected={handleRegistrationType} /> 

                    <TouchableOpacity 
                        className="flex-row justify-center items-center p-3 my-5 bg-[#003885] rounded-md"
                        onPress={() => router.back()}
                    >
                        <Ionicons name="arrow-back-outline" size={24} color="#FFF" />
                        <Text className="ml-2 text-white font-bold text-sm">Back</Text>
                    </TouchableOpacity>
                </>
            )}
            {registrationStep === 2 && (
                <UserBasicInfo               
                    onChangeStep={(step) => setRegistrationStep(step)}
                    userType={registrationType}
                />
            )}
        </ScrollView>
    )
}