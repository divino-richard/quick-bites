import { useState } from "react";
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from "expo-router";
import { UserType } from "@/types/user.types";
import { capitalize } from "@/utils/string.utils";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import apiClient from "@/utils/apiClient";
import AlertMessage from "@/components/pop-up/AlertMessage";
import { Card } from "react-native-paper";
import Registration from "@/constants/Registration";
import RegistrationTypeCard from "@/components/registration/RegistrationTypeCard";

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
        <View style={styles.container}> 
            {registrationStep === 1 && 
                <View>
                    <Text>
                        Select your registration type below
                    </Text>

                    <View style={styles.cardWrapper}>
                        {Registration.cardData.map((data, index) => (
                            <RegistrationTypeCard
                                key={index}
                                userType={data.userType}
                                description={data.description}
                                imagePath={data.imagePath}
                                onClick={(value) => handleRegistrationType(value)}
                            />
                        ))}
                    </View>

                    <TouchableOpacity onPress={() => router.back()} >
                        <Ionicons name="arrow-back-outline" size={24} color="#FFF" />
                        <Text>Back</Text>
                    </TouchableOpacity>
                </View>
            }
                    
            {registrationStep === 2 && (
                <View>
                    <Text>
                        {`${capitalize(userType)}'s`} Account Registration
                    </Text>
                    
                    <View>
                        {registerError && (
                            <Text>{registerError}</Text>
                        )}
                        <TextInput 
                            placeholder="First name"
                            onChangeText={(text) => setFirstName(text)}
                        />
                        <TextInput 
                            placeholder="Last name"
                            onChangeText={(text) => setLastName(text)}
                        />
                        <TextInput 
                            keyboardType="numeric"
                            placeholder="Phone number"
                            onChangeText={(text) => setPhoneNumber(text)}
                        />
                        <TextInput 
                            keyboardType="email-address"
                            placeholder="Email"
                            onChangeText={(text) => setEmail(text)}
                        />
                        <TextInput 
                            secureTextEntry={true}
                            placeholder="Password"
                            onChangeText={(text) => setPassword(text)}
                        />
                        <TextInput 
                            secureTextEntry={true}
                            placeholder="Confirm password"
                            onChangeText={(text) => setConfirmPassword(text)}
                        />
                    </View>

                    <TouchableOpacity 
                        onPress={handleRegistration}
                        disabled={pendingRegistration}
                    >
                        {pendingRegistration && (<ActivityIndicator size={'small'} color={'#FFF'}/>)}
                        <Text>Register</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        onPress={() => setRegistrationStep(1)}
                    >
                        <Ionicons name="arrow-back-outline" size={18} color="#FFF" />
                        <Text>Back</Text>
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
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 25
    },
    cardWrapper: {
        padding: 15,
        rowGap: 15
    },
})
