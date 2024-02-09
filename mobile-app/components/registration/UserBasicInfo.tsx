import { UserType } from "@/types/user.types";
import { capitalize } from "@/utils/string.utils";
import { Ionicons } from "@expo/vector-icons";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

interface Props {
    onChangeStep: (step: number) => void,
    userType: UserType
}

export default function UserBasicInfo({onChangeStep, userType}:Props) {
    return (
        <View className="gap-y-5">
            <Text className="font-bold text-[#003885] text-2xl">
                {`${capitalize(userType)}'s`} Account Registration
            </Text>
            <View className="gap-y-4">
                <TextInput 
                    className="p-2 rounded-md border border-[#003885] text-sm" 
                    placeholder="First name"
                />
                <TextInput 
                    className="p-2 rounded-md border border-[#003885] text-sm" 
                    placeholder="Last name"
                />
                <TextInput 
                    keyboardType="numeric"
                    className="p-2 rounded-md border border-[#003885] text-sm" 
                    placeholder="Phone number"
                />
                <TextInput 
                    keyboardType="email-address"
                    className="p-2 rounded-md border border-[#003885] text-sm" 
                    placeholder="Email"
                />
                <TextInput 
                    secureTextEntry={true}
                    className="p-2 rounded-md border border-[#003885] text-sm" 
                    placeholder="Password"
                />
                <TextInput 
                    secureTextEntry={true}
                    className="p-2 rounded-md border border-[#003885] text-sm" 
                    placeholder="Confirm password"
                />
            </View>

            <TouchableOpacity 
                className="flex-row flex-1 justify-center items-center p-3 bg-[#FF6427] rounded-[50px]"
            >
                <Text className="mr-2 text-white font-bold text-sm">Register</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                className="flex-row flex-1 justify-center items-center p-3 border border-[#003885] rounded-[50px]"
                onPress={() => onChangeStep(1)}
            >
                <Ionicons name="arrow-back-outline" size={18} color="#003885" />
                <Text className="ml-2 text-[#003885] font-bold text-sm">Back</Text>
            </TouchableOpacity>

        </View>
    )
}


