import { useState } from "react";
import { ActivityIndicator, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from "expo-router";
import { UserType } from "@/types/user.types";
import { capitalize } from "@/utils/string.utils";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import apiClient from "@/utils/apiClient";
import AlertMessage from "@/components/pop-up/AlertMessage";

export default function Register () {
    const router = useRouter();
    const [registrationStep, setRegistrationStep] = useState<number>(1);
    const [userType, setUserType] = useState<UserType>('customer');
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [registerError, setRegisterError] = useState("");
    const [showRegisterSuccess, setShowRegistrationSuccess] = useState(false);

    const {
        mutate: mutateRegistration, 
        isPending: pendingRegistration,
    } = useMutation({
        mutationFn: async(data: any) => {
            return await apiClient.post('/auth/register', data);            
        },
        onSuccess: () => {
            setShowRegistrationSuccess(true);
        },
        onError: (error) => {
            if(error instanceof AxiosError) {
                if(error.code === 'ERR_NETWORK') {
                    setRegisterError('Network connection error!')
                } else {
                    setRegisterError(error.response?.data?.message)
                }
            } else {
                setRegisterError('Someething went wrong. Please try again later')
            }
        }
    });

    const handleRegistrationType = (type: UserType) => {
        setUserType(type);
        setRegistrationStep(2);
    }

    const handleRegistration = () => {
        if (password.trim() !== confirmPassword.trim()) {
            return setRegisterError("Passwords not the same!")
        }

        mutateRegistration({
            firstName,
            lastName,
            phoneNumber,
            userType,
            email,
            password
        });
    }

    return (
        <ScrollView className="bg-blue-50 px-5 pt-14">
            {registrationStep === 1 && (
                <>
                    <Text 
                        className="mb-8 font-bold text-[#003885] text-2xl"
                    >
                        Select your registration type below
                    </Text>

                    <TouchableOpacity 
                        onPress={() => handleRegistrationType('customer')} 
                        className="flex-row p-5 mb-5 rounded-lg bg-white border border-blue-100"
                    >
                        <Image className="h-[50px] w-[50px] mr-5" source={require('../../assets/images/customer-cart.png')}/>
                        <View className="flex-1">
                            <Text className="font-bold mb-2 text-[#003885] text-lg">Customer</Text>
                            <Text>Lorem ipsum dolor, consectetur adipiscing elit, sed do eiusmod tempor</Text>
                        </View>
                    </TouchableOpacity> 

                    <TouchableOpacity 
                        onPress={() => handleRegistrationType('rider')} 
                        className="flex-row p-5 mb-5 rounded-lg bg-white border border-blue-100"
                    >
                        <Image className="h-[50px] w-[50px] mr-5" source={require('../../assets/images/delivery-rider.png')}/>
                        <View className="flex-1">
                            <Text className="font-bold mb-2 text-[#003885] text-lg">Delivery Rider</Text>
                            <Text>Lorem ipsum dolor sit amet, consectetur, sed do eiusmod tempor</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        onPress={() => handleRegistrationType('merchant')} 
                        className="flex-row mb-5 p-5 rounded-lg bg-white border border-blue-100"
                    >
                        <Image className="h-[50px] w-[50px] mr-5" source={require("../../assets/images/merchant.png")}/>
                        <View className="flex-1">
                            <Text className="font-bold mb-2 text-[#003885] text-lg">Merchant</Text>
                            <Text>Lorem ipsum dolor sit amet, consectetur, sed do eiusmod tempor</Text>
                        </View>
                    </TouchableOpacity> 

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
                <View className="gap-y-5">
                    <Text className="font-bold text-[#003885] text-2xl">
                        {`${capitalize(userType)}'s`} Account Registration
                    </Text>
                    
                    <View className="gap-y-5">
                        {registerError && (
                            <Text className="text-center text-red-500">{registerError}</Text>
                        )}
                        <TextInput 
                            className="p-2 rounded-md border border-[#003885] text-sm" 
                            placeholder="First name"
                            onChangeText={(text) => setFirstName(text)}
                        />
                        <TextInput 
                            className="p-2 rounded-md border border-[#003885] text-sm" 
                            placeholder="Last name"
                            onChangeText={(text) => setLastName(text)}
                        />
                        <TextInput 
                            keyboardType="numeric"
                            className="p-2 rounded-md border border-[#003885] text-sm" 
                            placeholder="Phone number"
                            onChangeText={(text) => setPhoneNumber(text)}
                        />
                        <TextInput 
                            keyboardType="email-address"
                            className="p-2 rounded-md border border-[#003885] text-sm" 
                            placeholder="Email"
                            onChangeText={(text) => setEmail(text)}
                        />
                        <TextInput 
                            secureTextEntry={true}
                            className="p-2 rounded-md border border-[#003885] text-sm" 
                            placeholder="Password"
                            onChangeText={(text) => setPassword(text)}
                        />
                        <TextInput 
                            secureTextEntry={true}
                            className="p-2 rounded-md border border-[#003885] text-sm" 
                            placeholder="Confirm password"
                            onChangeText={(text) => setConfirmPassword(text)}
                        />
                    </View>

                    <TouchableOpacity 
                        className="flex-row flex-1 justify-center items-center p-3 bg-[#FF6427] rounded-[50px]"
                        onPress={handleRegistration}
                        disabled={pendingRegistration}
                    >
                        {pendingRegistration && (<ActivityIndicator size={'small'} color={'#FFF'}/>)}
                        <Text className="mr-2 text-white font-bold text-sm">Register</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        className="flex-row flex-1 justify-center items-center p-3 bg-[#003885] rounded-[50px]"
                        onPress={() => setRegistrationStep(1)}
                    >
                        <Ionicons name="arrow-back-outline" size={18} color="#FFF" />
                        <Text className="ml-2 text-white font-bold text-sm">Back</Text>
                    </TouchableOpacity>
                </View>
            )}

            <AlertMessage
                message="Your now registered successfully"
                type="success"
                show={showRegisterSuccess}
                okText="Continue"
                onOkay={() => {
                    setShowRegistrationSuccess(false)
                    router.push('/(auth)/login');
                }}
            />
        </ScrollView>
    )
}
