import { View } from '@/components/Themed';
import { ActivityIndicator, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useState } from 'react';
import { Redirect, useRouter } from 'expo-router';
import { useMutation } from '@tanstack/react-query';
import apiClient from '@/utils/apiClient';
import { Credentials } from '@/types/user.types';
import { getMutationErrorMessage } from '@/utils/error.utils';
import { useSession } from '@/utils/useSession';
import Loading from '@/components/Loading';
import { Button, Text, TextInput } from 'react-native-paper';
import Colors from '@/constants/Colors';

export default function Login() {
  const router = useRouter();
  const [[isLoading, session], setSession] = useSession();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const {mutate: mutateLogin, isPending: pendingLogin} = useMutation({
    mutationKey: ['login'],
    mutationFn: async (data: Credentials) => {
      return await apiClient.post('/auth/login', data)
    },
    onSuccess: (response) => {
      setSession(JSON.stringify(response.data))
      router.replace('/(tabs)/');
    },
    onError: (error) => {
      const errorMessage = getMutationErrorMessage(error);
      setLoginError(errorMessage);
    }
  });

  const handleLogin = () => {
    mutateLogin({
      email,
      password,
    })
  }

  if(session) return <Redirect href={'/(tabs)'}/>

  if(isLoading) return <Loading />

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image 
        style={styles.logo}
        source={require("../../assets/images/quick-bites-logo.png")}
      />

      <View style={styles.formContainer}>
        <Text variant='titleMedium'>Login Account</Text>
        
        {loginError && 
          <Text 
            variant='labelSmall' 
            style={{color: 'red', textAlign: 'center'}}
          >
            {loginError}
          </Text>
        }
        
        <TextInput
          mode='flat'
          label="Email"
          activeUnderlineColor={Colors.orange}
          onChangeText={(text) => setEmail(text)}
          theme={{
            colors: {outline: Colors.darkBlue, surfaceVariant: '#f8f8f8'}
          }}
        />

        <TextInput
          mode='flat'
          label="Password"
          activeUnderlineColor={Colors.orange}
          theme={{colors: {placeholder: 'red', surfaceVariant: '#f8f8f8'}}}
          secureTextEntry={showPassword ? false : true} 
          right={
            <TextInput.Icon 
              icon={showPassword ? 'eye' : 'eye-off'} 
              onPress={() => setShowPassword(!showPassword)}
            />}
            onChangeText={(text) => setPassword(text)}
        />

        <Button
          mode='contained'
          onPress={handleLogin}
          style={{padding: 5, marginTop: 25}}
          theme={{colors: {primary: Colors.orange}, roundness: 2}}
        >
          {pendingLogin ? (
            <ActivityIndicator size={'small'} color={"#FFF"}/>
          ) : (
            <Text variant='titleSmall' style={{color: "#FFF"}}>Login</Text>
          )}
        </Button>

        <View style={{...styles.flexRowContainer, justifyContent: 'center'}}> 
          <Text variant='labelMedium'>Doesn't have an account?</Text>
          <Button 
            mode='text'
            onPress={() => router.push("/(auth)/register")}
          >
            <Text variant='labelMedium'>Register here</Text>
          </Button>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    alignItems: "center",
  },
  logo: {
    width: 150,
    height: 150,
    backgroundColor: "red",
    marginTop: 75,
  },
  formContainer: {
    flex: 1,
    width: '100%',
    marginTop: 25,
    padding: 25,
    rowGap: 15,
  },
  flexRowContainer: {
    flexDirection: 'row',
    columnGap: 15,
    alignItems: 'center',
  }
})
