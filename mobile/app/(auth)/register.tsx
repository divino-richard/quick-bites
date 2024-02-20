import { useState } from "react";
import { ActivityIndicator, StyleSheet, TouchableOpacity, View } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from "expo-router";
import { UserType } from "@/types/user.types";
import { capitalize } from "@/utils/string.utils";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import apiClient from "@/utils/apiClient";
import AlertMessage from "@/components/pop-up/AlertMessage";
import {TextInput, Text, Checkbox } from "react-native-paper";
import Registration from "@/constants/Registration";
import RegistrationTypeCard from "@/components/registration/RegistrationTypeCard";
import Colors from "@/constants/Colors";

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
    const [showPasswords, setShowPasswords] = useState(false)

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
                    <Text 
                        variant="headlineMedium" 
                        style={styles.registrationHeaderText}
                    >
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
                </View>
            }
                    
            {registrationStep === 2 && (
                <View style={{rowGap: 15}}>
                    <Text 
                        variant="headlineMedium" 
                        style={styles.registrationHeaderText}
                    >
                        {`${capitalize(userType)}'s`} Account Registration
                    </Text>
                    
                    <View style={styles.inputContainer}>
                        {registerError && (
                            <Text 
                                variant='labelSmall' 
                                style={{color: 'red', textAlign: 'center'}}
                            >
                                {registerError}
                            </Text>
                        )}
                        <TextInput 
                            mode='flat'
                            label="First name"
                            activeUnderlineColor={Colors.orange}
                            theme={{
                                colors: {outline: Colors.darkBlue, surfaceVariant: '#f8f8f8'},
                            }}
                            style={styles.textInput}
                            onChangeText={(text) => setFirstName(text)}
                        />
                        <TextInput 
                            mode='flat'
                            label="Last name"
                            activeUnderlineColor={Colors.orange}
                            theme={{
                                colors: {outline: Colors.darkBlue, surfaceVariant: '#f8f8f8'},
                            }}
                            style={styles.textInput}
                            onChangeText={(text) => setLastName(text)}
                        />
                        <TextInput 
                            mode='flat'
                            label="Phone number"
                            activeUnderlineColor={Colors.orange}
                            theme={{
                                colors: {outline: Colors.darkBlue, surfaceVariant: '#f8f8f8'},
                            }}
                            style={styles.textInput}
                            keyboardType="numeric"
                            onChangeText={(text) => setPhoneNumber(text)}
                        />
                        <TextInput 
                            mode='flat'
                            label="Email"
                            activeUnderlineColor={Colors.orange}
                            theme={{
                                colors: {outline: Colors.darkBlue, surfaceVariant: '#f8f8f8'},
                            }}
                            style={styles.textInput}
                            keyboardType="email-address"
                            onChangeText={(text) => setEmail(text)}
                        />
                        <TextInput 
                            mode='flat'
                            label="Password"
                            activeUnderlineColor={Colors.orange}
                            theme={{
                                colors: {outline: Colors.darkBlue, surfaceVariant: '#f8f8f8'},
                            }}
                            style={styles.textInput}
                            secureTextEntry={showPasswords ? false : true}
                            onChangeText={(text) => setPassword(text)}
                        />
                        <TextInput 
                            mode='flat'
                            label="Confirm password"
                            activeUnderlineColor={Colors.orange}
                            theme={{
                                colors: {outline: Colors.darkBlue, surfaceVariant: '#f8f8f8'},
                            }}
                            style={styles.textInput}
                            secureTextEntry={showPasswords ? false : true}
                            onChangeText={(text) => setConfirmPassword(text)}
                        />
                        <View style={styles.showPasswordsContainer}>
                            <Checkbox 
                                status={showPasswords ? 'checked' : 'unchecked'} 
                                onPress={() => setShowPasswords(!showPasswords)}
                                color={Colors.orange}
                            />
                            <Text variant="labelMedium">Show passwords</Text>
                        </View>
                    </View>

                    <View>
                        <TouchableOpacity 
                            onPress={handleRegistration}
                            disabled={pendingRegistration}
                            style={styles.registerButton}
                        >
                            {pendingRegistration 
                                ? <ActivityIndicator size={'small'} color={'#FFF'}/> 
                                : <Text 
                                        style={styles.registerButtonText}
                                    variant="labelLarge"
                                >
                                    Register
                                </Text>
                            }
                            
                        </TouchableOpacity>
                        <TouchableOpacity 
                            onPress={() => setRegistrationStep(1)}
                            style={styles.backButton}
                        >
                            <Ionicons name="arrow-back-outline" size={18} color="#000" />
                            <Text variant="labelLarge">Back</Text>
                        </TouchableOpacity>
                    </View>
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
        flex: 1,
        paddingVertical: 25,
        paddingHorizontal: 15,
        backgroundColor: "#FFF",
    },
    cardWrapper: {
        rowGap: 15
    },
    registrationHeaderText: {
        paddingVertical: 15,
    },
    inputContainer: {
        rowGap: 15
    },
    textInput: {
        fontSize: 14, 
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },
    registerButton: {
        backgroundColor: Colors.orange,
        padding: 15,
        borderRadius: 10
    },
    registerButtonText: {
        color: "#FFF",
        textAlign: "center"
    },
    backButton: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        columnGap: 10,
        padding: 15
    },
    showPasswordsContainer: {
        flexDirection: "row",
        alignItems: "center"
    }
})
