import { Text, View } from '@/components/Themed';
import { ActivityIndicator, Image, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useState } from 'react';
import { Redirect, useRouter } from 'expo-router';
import { useMutation } from '@tanstack/react-query';
import apiClient from '@/utils/apiClient';
import { Credentials } from '@/types/user.types';
import { getMutationErrorMessage } from '@/utils/error.utils';
import { useSession } from '@/utils/useSession';
import Loading from '@/components/Loading';

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
    <ScrollView className="bg-white">
      <View className='my-10 p-2 items-center'>
        <Image 
          className="w-[200px] h-[200px]"
          source={require("../../assets/images/quick-bites-logo.png")}
        />
      </View>

      <View className='px-5 gap-y-5'>
        <Text className='font-bold text-sm text-sky-900'>Login Account</Text>
        
        {loginError && <Text className="text-center text-red-600">{loginError}</Text>}
        <View className='p-2 rounded-lg border border-slate-500'>
          <TextInput 
            className='text-sm' 
            placeholder="email"
            onChangeText={(text) => setEmail(text)}
          />
        </View>

        <View className='flex-row justify-between items-center p-2 rounded-lg border border-slate-500'>
          <TextInput 
            className="text-sm"
            secureTextEntry={showPassword ? false : true} 
            placeholder='password'
            onChangeText={(text) => setPassword(text)}
          />
          <TouchableOpacity 
            onPress={() => setShowPassword(!showPassword)}
          >
            <Text className='text-slate-500'>
              <Feather name={showPassword ? "eye" : "eye-off"} size={20} />
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          className='flex-row justify-center p-3 bg-[#003885] rounded-[50px]'
          onPress={handleLogin}
          disabled={pendingLogin}
        >
          {pendingLogin && <ActivityIndicator size={'small'} color={"#FFF"}/>}
          <Text className='ml-2 text-center text-white font-bold text-sm'>Login</Text>
        </TouchableOpacity>

        <View className="flex-row gap-x-2 justify-center">
          <Text className='text-sky-900'>Doesn't have an account?</Text>
          <TouchableOpacity>
          <Text className='text-[#FF6427]' onPress={() => router.push("/(auth)/register")}>Register here</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

